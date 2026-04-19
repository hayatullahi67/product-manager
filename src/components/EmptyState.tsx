import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export function EmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Feather color="#6bc0ba" name="archive" size={14} />
      </View>
      <Text style={styles.title}>No products yet</Text>
      <Text style={styles.description}>
        Create your first product above. It will stay saved on this device.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#e9e3d9",
    borderRadius: 18,
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  description: {
    color: "#7d756c",
    fontSize: 10,
    lineHeight: 15,
    maxWidth: 180,
    textAlign: "center",
  },
  iconWrap: {
    alignItems: "center",
    backgroundColor: "#fffaf3",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    marginBottom: 12,
    width: 36,
  },
  title: {
    color: "#3e4341",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
});
