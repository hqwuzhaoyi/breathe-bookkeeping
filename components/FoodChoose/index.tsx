import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { foodEmojis } from "./foods";
import { Card, CardTitle } from "../ui/card";
import clsx from "clsx";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Button } from "~/components/ui/button";
import { FlatList } from "react-native-gesture-handler";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";

const screenWidth = Dimensions.get("window").width;
const numColumns = 4; // 每行四个
const cardWidth = screenWidth / numColumns - 20; // 每个卡片的宽度计算，包括间隔

interface FoodEmoji {
  name: string;
  emoji: string;
}

export const EmojiSelector = () => {
  const [countDown, setCountDown] = useState(7);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderItem = ({ item }: { item: FoodEmoji }) => (
    <View className={clsx("px-2 py-1 m-1")}>
      <Card>
        <View
          className={clsx(
            "text-3xl w-16 h-16 rounded-lg justify-center items-center"
          )}
        >
          <Text> {item.emoji}</Text>
        </View>
      </Card>
      <CardTitle className="text-xs text-center  pt-2">{item.name}</CardTitle>
    </View>
  );

  return (
    <BottomSheetModalProvider>
      <View style={styles.centerContainer}>
        <FlatList
          data={foodEmojis}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          style={styles.list}
        />
      </View>

      <View style={styles.sheetModalContainer}>
        <Button onPress={handlePresentModalPress} variant="secondary">
          <Text>设置日期111</Text>
        </Button>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.sheetModalContentContainer}>
            <DatePicker
              value={new Date()}
              onChange={(event, selectedDate) => {
                console.log("selectedDate", selectedDate);
              }}
            />
            <Text>或者</Text>
            <Input
              placeholder="Write some stuff..."
              value={countDown.toString()}
              onChangeText={(text) => {
                setCountDown(parseInt(text));
              }}
              aria-labelledbyledBy="inputLabel"
              aria-errormessage="inputError"
              keyboardType="number-pad"
              className="bg-gray-100 border-none rounded-lg p-2 w-1/2 p"
              style={styles.inputNumber}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
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
  sheetModalContainer: {
    padding: 10,
    justifyContent: "center",
  },
  sheetModalContentContainer: {
    flex: 1,
    alignItems: "center",
  },
  inputNumber: {
    width: 100,
    borderWidth: 0,
  },
});

export default EmojiSelector;
