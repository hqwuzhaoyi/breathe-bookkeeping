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
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  );
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
