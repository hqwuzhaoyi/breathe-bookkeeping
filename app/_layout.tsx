import { Stack, Tabs } from "expo-router";
import {
  SplashScreen,
  // This example uses a basic Layout component, but you can use any Layout.
  Slot,
} from "expo-router";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          {/* Optionally configure static options outside the route.*/}
          <Stack.Screen name="home" options={{}} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
