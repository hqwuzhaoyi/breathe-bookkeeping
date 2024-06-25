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
// import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
// import DateTimePicker from "@react-native-community/datetimepicker";

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

      <View style={styles.sheetModalView}>
        <Button onPress={handlePresentModalPress}>
          <Text>打开 BottomSheetModal</Text>
        </Button>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.sheetModalContentContainer}>
            <View className="grid sm:grid-cols-2 gap-0">
              <View className="bg-background p-6">
                {/* <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={"date"}
                  is24Hour={true}
                  // onChange={onChange}
                /> */}
              </View>
              <View className="bg-muted p-6 flex flex-col items-center justify-center gap-4">
                <View className="grid gap-2 w-full">
                  <Text>Countdown (seconds)</Text>
                  <Input
                    placeholder="Write some stuff..."
                    value={countDown.toString()}
                    onChangeText={(text) => setCountDown(parseInt(text, 10))}
                    keyboardType="number-pad"
                    // style={styles.inputNumber}
                    className="w-1/2 bg-secondary rounded-md px-4 py-2 mt-2"
                  />
                </View>
                <Button size="lg" variant="default">
                  Start Countdown
                </Button>
              </View>
            </View>
            <View className="flex flex-row items-center gap-2">
              <View className="flex-1">
                <DatePicker
                  value={new Date()}
                  onChange={(event, selectedDate) => {
                    console.log("selectedDate", selectedDate);
                  }}
                  className="bg-secondary  border-none rounded-md px-4 py-2 mt-2"
                />
              </View>
              <Text>或者</Text>
              <View>
                <Input
                  placeholder="Write some stuff..."
                  value={countDown.toString()}
                  onChangeText={(text) => setCountDown(parseInt(text, 10))}
                  keyboardType="number-pad"
                  // style={styles.inputNumber}
                  className="w-1/2 bg-secondary  border-none rounded-md px-4 py-2 mt-2 focus-visible:!shadow-none"
                />
              </View>
            </View>
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
  sheetModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sheetModalContentContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  inputNumber: {
    backgroundColor: "hsl(var(--secondary))", // 灰色背景
    borderWidth: 0, // 无边框
    borderRadius: 100, // 轻微圆角
    padding: 10, // 内边距
    width: "50%", // 宽度为父容器的一半
    marginTop: 10, // 上边距
  },
});

export default EmojiSelector;
