import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { useProducts } from "@/src/context/ProductContext";
import { MAX_PRODUCTS } from "@/src/utils/constants";

import { AppButton } from "./AppButton";
import { FormField } from "./FormField";

interface FormErrors {
  imageUri?: string;
  name?: string;
  price?: string;
}

interface ProductFormProps {
  onProductAdded?: (name: string) => void;
}

export function ProductForm({ onProductAdded }: ProductFormProps) {
  const { addProduct, isAtLimit, products } = useProducts();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setName("");
    setPrice("");
    setImageUri("");
    setErrors({});
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    const trimmedName = name.trim();
    const parsedPrice = Number(price);

    if (!trimmedName) {
      nextErrors.name = "Enter a product name.";
    }

    if (!price.trim()) {
      nextErrors.price = "Enter a price.";
    } else if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      nextErrors.price = "Use a valid number above 0.";
    }

    if (!imageUri) {
      nextErrors.imageUri = "Select a product image.";
    }

    setErrors(nextErrors);
    setSuccessMessage("");

    return {
      isValid: Object.keys(nextErrors).length === 0,
      parsedPrice,
      trimmedName,
    };
  };

  const handlePickImage = async () => {
    const permissionResponse =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResponse.granted) {
      Alert.alert(
        "Permission required",
        "Please allow photo library access to select a product image.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImageUri(result.assets[0].uri);
      setErrors((currentErrors) => ({ ...currentErrors, imageUri: undefined }));
      setSuccessMessage("Image selected and ready to add.");
    }
  };

  const handleSubmit = async () => {
    if (isAtLimit) {
      setSuccessMessage("");
      Alert.alert("Product limit reached", "Maximum of 5 products reached.");
      return;
    }

    const { isValid, parsedPrice, trimmedName } = validate();
    if (!isValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      await addProduct({
        imageUri,
        name: trimmedName,
        price: parsedPrice,
      });
      setSuccessMessage("Product added to your catalog.");
      onProductAdded?.(trimmedName);
      resetForm();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to add the product right now.";
      Alert.alert("Add product failed", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>ADD PRODUCT</Text>
          <Text style={styles.title}>Build your catalog</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {products.length}/{MAX_PRODUCTS}
          </Text>
        </View>
      </View>

      {successMessage ? (
        <View style={styles.successBanner}>
          <View style={styles.successIcon}>
            <Feather color="#ffffff" name="check" size={10} />
          </View>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}

      <FormField
        autoCapitalize="words"
        error={errors.name}
        label="Product name"
        onChangeText={(value) => {
          setName(value);
          setSuccessMessage("");
        }}
        placeholder="Premium leather wallet"
        returnKeyType="next"
        value={name}
      />

      <FormField
        error={errors.price}
        keyboardType="decimal-pad"
        label="Price"
        onChangeText={(value) => {
          setPrice(value);
          setSuccessMessage("");
        }}
        placeholder="79.00"
        value={price}
      />

      <View style={styles.imageSection}>
        <Pressable
          onPress={handlePickImage}
          style={[
            styles.previewFrame,
            imageUri ? styles.previewFrameActive : undefined,
            errors.imageUri ? styles.previewFrameError : undefined,
          ]}
        >
          {imageUri ? (
            <Image
              contentFit="cover"
              source={{ uri: imageUri }}
              style={styles.previewImage}
            />
          ) : null}

          <View style={styles.previewOverlay}>
            <View style={styles.previewBadge}>
              <Ionicons color="#fffdf8" name="image-outline" size={14} />
            </View>
            <Text style={styles.previewTitle}>Select product image</Text>
            <Text style={styles.previewText}>
              Preview appears here before adding
            </Text>
          </View>
        </Pressable>

        {errors.imageUri ? <Text style={styles.error}>{errors.imageUri}</Text> : null}
      </View>

      {isAtLimit ? (
        <Text style={styles.limitMessage}>Maximum of 5 products reached</Text>
      ) : null}

      <AppButton
        disabled={isAtLimit}
        label={isAtLimit ? "Limit Reached" : "Add Product"}
        loading={isSubmitting}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    backgroundColor: "#efe9de",
    borderRadius: 999,
    height: 24,
    justifyContent: "center",
    minWidth: 36,
    paddingHorizontal: 9,
  },
  badgeText: {
    color: "#9c9388",
    fontSize: 10,
    fontWeight: "700",
  },
  container: {
    backgroundColor: "#fffef9",
    borderColor: "#d9d0c1",
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 18,
    padding: 20,
    shadowColor: "#7a6d5d",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  error: {
    color: "#b35248",
    fontSize: 11,
    marginTop: 6,
  },
  eyebrow: {
    color: "#8ca8aa",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  imageSection: {
    marginTop: 10,
  },
  limitMessage: {
    color: "#a27437",
    fontSize: 10,
    marginTop: 12,
    textAlign: "center",
  },
  previewBadge: {
    alignItems: "center",
    backgroundColor: "#0b7f79",
    borderRadius: 999,
    height: 26,
    justifyContent: "center",
    marginBottom: 10,
    width: 26,
  },
  previewFrame: {
    backgroundColor: "#fbf7ef",
    borderColor: "#7aa5a1",
    borderRadius: 14,
    borderStyle: "dashed",
    borderWidth: 1,
    height: 104,
    overflow: "hidden",
    position: "relative",
    marginBottom: 25,
  },
  previewFrameActive: {
    borderColor: "#0b7f79",
  },
  previewFrameError: {
    borderColor: "#b35248",
  },
  previewImage: {
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  previewOverlay: {
    alignItems: "center",
    backgroundColor: "rgba(251, 247, 239, 0.86)",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  previewText: {
    color: "#8d857b",
    fontSize: 8,
    marginTop: 4,
    textAlign: "center",
  },
  previewTitle: {
    color: "#2c312f",
    fontSize: 11,
    fontWeight: "500",
  },
  successBanner: {
    alignItems: "center",
    borderColor: "#0b7f79",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  successIcon: {
    alignItems: "center",
    backgroundColor: "#0b7f79",
    borderRadius: 999,
    height: 18,
    justifyContent: "center",
    marginRight: 8,
    width: 18,
  },
  successText: {
    color: "#3f6a66",
    flex: 1,
    fontSize: 10,
  },
  title: {
    color: "#24302e",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 2,
  },
});
