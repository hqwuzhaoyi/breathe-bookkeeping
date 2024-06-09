import { CherryIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";

function AppleIcon(props) {
  return <CherryIcon {...props}/>;
}

const ExpenseCard = () => {
  return (
    <Card className="w-full max-w-sm p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
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
  );
};

export default ExpenseCard;
