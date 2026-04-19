import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface AppButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
  textStyle?: ViewStyle;
  compact?: boolean;
}

export function AppButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  style,
  compact = false,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        compact ? styles.compactButton : undefined,
        variant === "secondary" ? styles.secondaryButton : undefined,
        variant === "danger" ? styles.dangerButton : undefined,
        isDisabled ? styles.buttonDisabled : undefined,
        pressed && !isDisabled ? styles.buttonPressed : undefined,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "secondary" ? "#8e7f6a" : "#ffffff"}
        />
      ) : (
        <Text
          style={[
            styles.label,
            variant === "secondary" ? styles.secondaryLabel : undefined,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#0b7f79",
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 20,
    shadowColor: "#0a5d58",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  buttonDisabled: {
    backgroundColor: "#9cbab5",
    shadowOpacity: 0,
  },
  buttonPressed: {
    opacity: 0.88,
  },
  compactButton: {
    minHeight: 38,
  },
  dangerButton: {
    backgroundColor: "#cf4d44",
    shadowColor: "#9f342d",
  },
  label: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#ece5d9",
    shadowOpacity: 0,
  },
  secondaryLabel: {
    color: "#8e7f6a",
  },
});
