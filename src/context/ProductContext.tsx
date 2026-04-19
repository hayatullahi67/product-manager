import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { Product, ProductInput } from "@/src/types/product";
import { MAX_PRODUCTS, STORAGE_KEY } from "@/src/utils/constants";

interface ProductState {
  isHydrated: boolean;
  products: Product[];
}

type ProductAction =
  | { type: "HYDRATE"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "REMOVE_PRODUCT"; payload: string };

interface ProductContextValue {
  addProduct: (product: ProductInput) => Promise<void>;
  isAtLimit: boolean;
  isHydrated: boolean;
  products: Product[];
  removeProduct: (id: string) => void;
}

const initialState: ProductState = {
  isHydrated: false,
  products: [],
};

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

function productReducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case "HYDRATE":
      return {
        isHydrated: true,
        products: action.payload.slice(0, MAX_PRODUCTS),
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.products].slice(0, MAX_PRODUCTS),
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
}

export function ProductProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (!storedValue) {
          dispatch({ type: "HYDRATE", payload: [] });
          return;
        }

        const parsedProducts = JSON.parse(storedValue) as Product[];
        dispatch({ type: "HYDRATE", payload: parsedProducts });
      } catch {
        dispatch({ type: "HYDRATE", payload: [] });
      }
    };

    void loadProducts();
  }, []);

  useEffect(() => {
    if (!state.isHydrated) {
      return;
    }

    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
  }, [state.isHydrated, state.products]);

  const addProduct = useCallback(async (product: ProductInput) => {
    if (state.products.length >= MAX_PRODUCTS) {
      throw new Error("Maximum of 5 products reached.");
    }

    const nextProduct: Product = {
      ...product,
      createdAt: new Date().toISOString(),
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    };

    dispatch({ type: "ADD_PRODUCT", payload: nextProduct });
  }, [state.products.length]);

  const removeProduct = useCallback((id: string) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id });
  }, []);

  const value = useMemo<ProductContextValue>(
    () => ({
      addProduct,
      isAtLimit: state.products.length >= MAX_PRODUCTS,
      isHydrated: state.isHydrated,
      products: state.products,
      removeProduct,
    }),
    [addProduct, removeProduct, state.isHydrated, state.products],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider.");
  }

  return context;
}
