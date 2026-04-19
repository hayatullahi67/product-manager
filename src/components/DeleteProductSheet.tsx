import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { Product } from "@/src/types/product";

import { AppButton } from "./AppButton";

interface DeleteProductSheetProps {
  onClose: () => void;
  onConfirm: () => void;
  product: Product | null;
  visible: boolean;
}

export function DeleteProductSheet({
  onClose,
  onConfirm,
  product,
  visible,
}: DeleteProductSheetProps) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={styles.backdrop} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.iconCircle}>
            <Feather color="#cf4d44" name="trash-2" size={16} />
          </View>
          <Text style={styles.title}>
            Remove {product?.name ? `${product.name}?` : "product?"}
          </Text>
          <Text style={styles.description}>
            {product?.name ?? "This product"} will be removed from this device
            catalog. You can add it again later.
          </Text>
          <View style={styles.actions}>
            <AppButton
              compact
              label="Keep it"
              onPress={onClose}
              style={styles.actionButton}
              variant="secondary"
            />
            <AppButton
              compact
              label="Remove"
              onPress={onConfirm}
              style={styles.actionButton}
              variant="danger"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },
  backdrop: {
    flex: 1,
    width: "100%",
  },
  description: {
    color: "#766c62",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  handle: {
    alignSelf: "center",
    backgroundColor: "#d5c8b6",
    borderRadius: 999,
    height: 4,
    marginBottom: 18,
    width: 42,
  },
  iconCircle: {
    alignItems: "center",
    backgroundColor: "#f4ece2",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  overlay: {
    backgroundColor: "rgba(28, 23, 15, 0.24)",
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fffdf8",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    color: "#1b2624",
    fontSize: 24,
    fontWeight: "500",
    marginTop: 18,
  },
});
