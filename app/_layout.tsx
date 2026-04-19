import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ProductProvider } from "@/src/context/ProductContext";

export default function RootLayout() {
  return (
    <ProductProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#f4f7fb",
          },
        }}
      />
    </ProductProvider>
  );
}
