import type { ComponentType, ReactElement } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";

import { Product } from "@/src/types/product";

import { EmptyState } from "./EmptyState";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  ListHeaderComponent?: ComponentType<unknown> | ReactElement | null;
  onDeleteProduct: (id: string) => void;
  products: Product[];
}

export function ProductList({
  ListHeaderComponent,
  onDeleteProduct,
  products,
}: ProductListProps) {
  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard onDelete={onDeleteProduct} product={item} />
  );

  return (
    <FlatList
      ListEmptyComponent={<EmptyState />}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={styles.contentContainer}
      data={products}
      keyboardShouldPersistTaps="handled"
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 2,
  },
});
