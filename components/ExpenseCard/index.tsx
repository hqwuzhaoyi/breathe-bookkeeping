import { CherryIcon, LucideProps } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import Menu from "./ContextMenu";
import * as emoji from "node-emoji";
import { Text } from "../ui/text";
import clsx from "clsx";

function AppleIcon(props: React.JSX.IntrinsicAttributes & LucideProps) {
  const icon = emoji.find("apple");
  return (
    <View
      className={clsx(
        props.className,
        "text-2xl flex justify-center items-center"
      )}
    >
      <Text className="text-4xl">{icon?.emoji}</Text>
    </View>
  );
}

const ExpenseCard: React.FC<{
  onLongPress?: () => void;
  onPress?: () => void;
}> = ({ onLongPress, onPress }) => {
  const [result, setResult] = useState("🔮");

  return (
    // <TouchableOpacity
    //   onLongPress={() => {
    //     onLongPress && onLongPress();
    //   }}
    //   onPress={() => {
    //     onPress && onPress();
    //   }}
    // >
    <Menu onPress={onPress}>
      <Card className="w-full p-4 rounded-lg shadow-md">
        <View className="flex items-center gap-4 flex-row">
          <AppleIcon className="w-12 h-12 text-primary" />
          <View className="flex-1">
            <CardTitle className="text-lg font-semibold">餐饮</CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              Expires in 3 days
            </CardDescription>
          </View>
        </View>
      </Card>
    </Menu>
    // </TouchableOpacity>
  );
};

export default ExpenseCard;
