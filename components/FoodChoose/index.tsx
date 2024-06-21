import React from "react";
import { View, FlatList, Text, Dimensions, StyleSheet } from "react-native";
import { foodEmojis } from "./foods";
import { Card, CardTitle } from "../ui/card";
import clsx from "clsx";

const screenWidth = Dimensions.get("window").width;
const numColumns = 4; // 每行四个
const cardWidth = screenWidth / numColumns - 20; // 每个卡片的宽度计算，包括间隔

interface FoodEmoji {
  name: string;
  emoji: string;
}

export const EmojiSelector = () => {
  const renderItem = ({ item }: { item: FoodEmoji }) => (
    <View className={clsx("px-2 py-1 m-1")}>
      <Card>
        <View className="text-3xl w-16 h-16 rounded-lg justify-center items-center">
          {item.emoji}
        </View>
      </Card>
      <CardTitle className="text-xs text-center  pt-2">{item.name}</CardTitle>
    </View>
  );

  return (
    <View style={styles.centerContainer}>
      <FlatList
        data={foodEmojis}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center", // 确保 FlatList 在容器中水平居中
  },
  list: {
    flexGrow: 0, // 防止 FlatList 填满整个容器
  },
  card: {
    margin: 10,
    flex: 1,
    justifyContent: "center", // 内容垂直居中
    alignItems: "center", // 内容水平居中
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
  },
  emojiContainer: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  emoji: {
    fontSize: 30,
  },
  cardTitle: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default EmojiSelector;
