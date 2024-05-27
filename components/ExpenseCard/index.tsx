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
import SwipeableCard from "./SwipeableCard";
const ExpenseCard = () => {
  return (
    <SwipeableCard
      onEdit={() => console.log("Edit tapped")}
      onDelete={() => console.log("Delete tapped")}
    >
      <Card className="w-full max-w-sm">
        <View className="flex flex-row justify-between">
          <CardHeader>
            <CardTitle>餐饮</CardTitle>
            <CardDescription>23:11 </CardDescription>
          </CardHeader>
          <View className="flex flex-col justify-center items-center space-y-1.5 p-6">
            <Text>$1,234.56</Text>
          </View>
        </View>
      </Card>
    </SwipeableCard>
  );
};

export default ExpenseCard;
