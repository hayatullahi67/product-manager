import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Product } from "@/src/types/product";
import { formatPrice } from "@/src/utils/formatters";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image
        contentFit="cover"
        source={{ uri: product.imageUri }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {product.name}
        </Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>

      <Pressable
        accessibilityLabel={`Remove ${product.name}`}
        onPress={() => onDelete(product.id)}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed ? styles.deletePressed : undefined,
        ]}
      >
        <Feather color="#c59588" name="trash-2" size={13} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#fffef9",
    borderColor: "#d8cfbf",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#6c5d4d",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#f5ece4",
    borderRadius: 14,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  deletePressed: {
    opacity: 0.75,
  },
  image: {
    backgroundColor: "#ece4d8",
    borderRadius: 12,
    height: 46,
    width: 46,
  },
  name: {
    color: "#26302d",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
  },
  price: {
    color: "#0f706d",
    fontSize: 13,
    fontWeight: "700",
  },
});
