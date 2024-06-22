import React, { useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

const MyBottomSheet = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  // 创建一个 ref 来管理 bottom sheet 的状态
  const bottomSheetRef = useRef(null);

  // 设置 bottom sheet 的初始快照点
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // 渲染 Bottom Sheet 内容
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 1 : -1} // 控制显示和隐藏
      snapPoints={snapPoints} // 设置可展开的高度点
      onClose={onClose} // 关闭时的回调
      enablePanDownToClose={false} // 允许向下拖动关闭
    >
      <View className={`p-4`}>
        <Text className={`text-center text-lg font-bold`}>
          Hello from Bottom Sheet!
        </Text>
        {/* 可以在这里添加更多内容和组件 */}
      </View>
    </BottomSheet>
  );
};

export default MyBottomSheet;
