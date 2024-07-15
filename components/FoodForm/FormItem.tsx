import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Label } from "../ui/label";

export const FormItem = ({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.formItem}>
      {label && (
        <Label style={styles.label} nativeID={label}>
          {label}
        </Label>
      )}
      <View style={styles.input}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  formItem: {
    paddingVertical: 10, // 提供上下间距
    width: "100%", // 确保占满容器宽度
  },
  label: {
    fontSize: 16, // 标签字体大小
    color: "#000", // 标签字体颜色
    marginBottom: 5, // 标签与输入框的间距
  },
  input: {},
});
