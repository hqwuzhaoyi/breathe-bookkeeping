import React from "react";
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import { foodEmojis } from "./foods";
import { Card, CardTitle } from "../ui/card";
import clsx from "clsx";

const screenWidth = Dimensions.get("window").width;
const cardWidth = 70; // 假设每个卡片的宽度为70
const spaceBetween = 10; // 每个卡片之间的间隔为10
const numColumns = Math.floor(screenWidth / (cardWidth + spaceBetween)); // 计算每行可以放置的卡片数
const totalPadding =
  screenWidth -
  numColumns * (cardWidth + spaceBetween - spaceBetween / numColumns); // 计算总剩余空间

export const EmojiSelector = () => {
  const renderItem = ({ item }: { item: (typeof foodEmojis)[number] }) => (
    <Card className={clsx("p-2 m-1", `w-[80px]`)}>
      <View className="text-3xl w-16 h-16 rounded-lg justify-center items-center">
        {item.emoji}
      </View>
      <CardTitle className="text-xs text-center">{item.name}</CardTitle>
    </Card>
  );

  return (
    <FlatList
      data={foodEmojis}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
      contentContainerStyle={{
        paddingHorizontal: totalPadding / 2,
        justifyContent: "center",
      }}
    />
  );
};
