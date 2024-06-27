import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Dimensions, StyleSheet, SafeAreaView } from "react-native";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "~/components/ui/text";
import { Save } from "lucide-react-native";

const screenWidth = Dimensions.get("window").width;
const numColumns = 4; // 每行四个
const cardWidth = screenWidth / numColumns - 20; // 每个卡片的宽度计算，包括间隔

interface FoodEmoji {
  name: string;
  emoji: string;
}

export const EmojiSelector = ({
  onConfirm,
}: {
  onConfirm: (countDown: number) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [countDown, setCountDown] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["65%", "80%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleDateChange = (event: any, date?: Date) => {
    date = date || selectedDate; // If user cancels the picker, fallback to the current stored date
    setSelectedDate(date); // Update the selected date state

    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    setCountDown(days > 0 ? days : 0);
  };

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
      <CardTitle className="text-xs text-center  pt-2 flex-wrap w-16">
        {item.name}
      </CardTitle>
    </View>
  );

  const filteredFoods = useMemo(() => {
    return foodEmojis.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Input
            onChangeText={setSearchTerm}
            value={searchTerm}
            placeholder="搜索食物..."
            clearButtonMode="while-editing"
            className="w-full bg-secondary rounded-md px-4 py-2 mt-2"
          />
          <View className="flex-1">
            <FlatList
              data={filteredFoods}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={numColumns}
              style={styles.list}
            />
          </View>
          <Button
            onPress={handlePresentModalPress}
            variant="default"
            size="lg"
            className="w-full"
          >
            <Text>打开</Text>
          </Button>
        </View>
      </SafeAreaView>

      <View style={styles.sheetModalView}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.sheetModalContentContainer}>
            <Button
              variant="default"
              size="lg"
              className="w-3/4"
              onPress={() => {
                console.log("Start Countdown");
                onConfirm(countDown);
              }}
            >
              <Text>Start Countdown</Text>
            </Button>
            <View className="grid sm:grid-cols-2 gap-0">
              <View className="p-6">
                <DateTimePicker
                  testID="dateTimePicker"
                  value={selectedDate}
                  // mode={"countdown"}
                  display="inline"
                  // is24Hour={true}
                  onChange={handleDateChange}
                />
              </View>
              <View className="p-6 flex flex-col items-center justify-center gap-4">
                <View className="grid gap-2 w-full">
                  <Text className="text-base text-primary font-medium">
                    设置倒计时
                  </Text>
                  <View className="flex flex-row gap-2 justify-between items-center">
                    <Input
                      placeholder="请填写天数"
                      value={countDown.toString()}
                      onChangeText={(text) => setCountDown(parseInt(text, 10))}
                      keyboardType="number-pad"
                      // style={styles.inputNumber}
                      className="w-1/2 bg-secondary rounded-md px-4 py-2 mt-2"
                    />
                  </View>
                </View>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // 使用 flex 1 来确保 SafeAreaView 填充整个屏幕
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center", // 确保 FlatList 在容器中垂直居中
    alignItems: "center", // 确保 FlatList 在容器中水平居中'
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    // flex: 1,
    // height: 100,
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
