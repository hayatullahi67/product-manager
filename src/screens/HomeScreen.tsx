import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { DeleteProductSheet } from "@/src/components/DeleteProductSheet";
import { ProductForm } from "@/src/components/ProductForm";
import { ProductList } from "@/src/components/ProductList";
import { useProducts } from "@/src/context/ProductContext";
import { Product } from "@/src/types/product";
import { MAX_PRODUCTS } from "@/src/utils/constants";

export function HomeScreen() {
  const { isHydrated, products, removeProduct } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const header = useMemo(
    () => (
      <View style={styles.headerWrapper}>
        <View style={styles.topRow}>
          <View style={styles.avatar}>
            <Feather color="#f7f0e4" name="package" size={15} />
          </View>
          <View style={styles.topTextWrap}>
            <Text style={styles.brand}>PRODUCT SHELF</Text>
            <Text style={styles.title}>Manage up to five standby products.</Text>
            <Text style={styles.description}>
              Add polished product details, keep images attached, and remove
              items whenever your catalog changes.
            </Text>
          </View>
        </View>

        <ProductForm />

        <View style={styles.catalogHeader}>
          <View style={styles.catalogTitleRow}>
            <Feather color="#6f776e" name="grid" size={15} />
            <Text style={styles.catalogTitle}>Catalog</Text>
          </View>
          <Text style={styles.catalogCount}>
            {products.length} of {MAX_PRODUCTS}
          </Text>
        </View>
      </View>
    ),
    [products.length],
  );

  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator color="#0b7f79" size="large" />
        <Text style={styles.loadingText}>Loading your saved products...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <ProductList
        ListHeaderComponent={header}
        onDeleteProduct={(id) => {
          const product = products.find((item) => item.id === id) ?? null;
          setSelectedProduct(product);
        }}
        products={products}
      />

      <DeleteProductSheet
        onClose={() => setSelectedProduct(null)}
        onConfirm={() => {
          if (selectedProduct) {
            removeProduct(selectedProduct.id);
          }
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        visible={Boolean(selectedProduct)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    backgroundColor: "#0b7f79",
    borderRadius: 14,
    height: 24,
    justifyContent: "center",
    marginRight: 10,
    marginTop: 3,
    width: 24,
  },
  brand: {
    color: "#7e7a6f",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  catalogCount: {
    color: "#9a9289",
    fontSize: 10,
    fontWeight: "600",
  },
  catalogHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    marginTop: 6,
    paddingHorizontal: 2,
  },
  catalogTitle: {
    color: "#333736",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 6,
  },
  catalogTitleRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  description: {
    color: "#7f7a72",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
    maxWidth: 220,
  },
  headerWrapper: {
    paddingBottom: 8,
    paddingTop:48,
    // marginTop: 42,
  },
  loadingScreen: {
    alignItems: "center",
    backgroundColor: "#f2ede3",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  loadingText: {
    color: "#6f6c65",
    fontSize: 14,
    marginTop: 12,
  },
  screen: {
    backgroundColor: "#f2ede3",
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  title: {
    color: "#1e2827",
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 27,
    marginTop: 20,
  },
  topRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 14,
    paddingHorizontal: 2,
    paddingTop: 4,
  },
  topTextWrap: {
    flex: 1,
  },
});
