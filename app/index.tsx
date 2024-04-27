import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function Page() {
  const [isReady, setReady] = React.useState(false);

  React.useEffect(() => {
    // Perform some sort of async data or asset fetching.
    setTimeout(() => {
      // When all loading is setup, unmount the splash screen component.
      SplashScreen.hideAsync();
      setReady(true);
    }, 1000);
  }, []);

  return (
    <View>
      <Link href="/other" asChild>
        <Pressable>
          <Text>Home</Text>
        </Pressable>
      </Link>
      <Link href="/about">About</Link>
      <Link
        href={{
          pathname: "/user/[id]",
          params: { id: "bacon" },
        }}
      >
        View user
      </Link>
      <Link push href="/feed">
        Login
      </Link>
      <Link replace href="/feed">
        Login
      </Link>
    </View>
  );
}
