import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function FormField({ label, error, style, ...props }: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#8d99ae"
        style={[styles.input, error ? styles.inputError : undefined, style]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
      marginBottom: 18, 
  },
  error: {
    color: "#b35248",
    fontSize: 11,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f4efe4",
    borderColor: "#d8cfc0",
    borderRadius: 13,
    borderWidth: 1,
    color: "#24302e",
    fontSize: 12,
    minHeight: 42,
    paddingHorizontal: 13,
  },
  inputError: {
    borderColor: "#c97a72",
  },
  label: {
    color: "#7b7268",
    fontSize: 10,
    fontWeight: "500",
  },
});
