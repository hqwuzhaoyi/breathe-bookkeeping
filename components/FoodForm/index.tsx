import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FoodPreservationCard, FoodPreservationCardType } from "./schema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormItem } from "./FormItem";
import { Button } from "~/components/ui/button";

const FoodPreservationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodPreservationCardType>({
    resolver: zodResolver(FoodPreservationCard),
  });

  const onSubmit = (data: FoodPreservationCardType) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <FormItem label="Food">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="w-full"
            />
          )}
        />
      </FormItem>

      <FormItem label="expirationDate">
        <Controller
          control={control}
          name="expirationDate"
          render={({ field: { onChange, onBlur, value } }) => (
            <DateTimePicker
              testID="dateTimePicker"
              value={value || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) => onChange(date)}
            />
          )}
        />
      </FormItem>

      {/* <FormItem label="quantity">
        <Controller
          control={control}
          name="quantity"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value ? value.toString() : ""}
              keyboardType="numeric"
              className="w-full"
            />
          )}
        />
      </FormItem> */}

      {/* <Controller
        control={control}
        name="unit"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Unit (kg, g, pcs)"
          />
        )}
      /> */}

      {/* <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Notes"
          />
        )}
      /> */}
      <Button
        onPress={() => {
          console.log("Icon");
        }}
        variant="default"
      >
        <Text>Icon</Text>
      </Button>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "90%",
    borderRadius: 5,
  },
});

export default FoodPreservationForm;
