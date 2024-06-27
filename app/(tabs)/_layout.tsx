import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";
import Colors from "~/constants/Colors";
import { useColorScheme } from "~/lib/useColorScheme";
import { SquarePen } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme.colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "明细",
          tabBarIcon: ({ color }) => <SquarePen size={28} color={color} />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      {/* <Tabs.Screen
        name="settings"
        options={{
          title: "我的",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="record"
        options={{
          title: "记录",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
