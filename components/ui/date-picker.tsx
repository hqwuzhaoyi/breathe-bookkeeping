import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./button";
import { Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const DatePicker = (props: {
  onChange: (event: any, selectedDate: Date) => void;
  value: Date;
  className?: string;
}) => {
  const [date, setDate] = useState(props.value);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    props.onChange(event, currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView>
      <Button
        onPress={showDatepicker}
        variant="secondary"
        className={props.className}
      >
        <Text>
          {date.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </Text>
      </Button>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};
