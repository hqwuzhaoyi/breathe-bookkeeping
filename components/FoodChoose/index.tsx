import React from "react";
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import { foodEmojis } from "./foods";
import { Card, CardTitle } from "../ui/card";

const numColumns = Math.floor(Dimensions.get("window").width / 82);

export const EmojiSelector = () => {
  const renderItem = ({ item }: { item: (typeof foodEmojis)[number] }) => (
    <Card className="p-2 m-1">
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
    />
  );
};
