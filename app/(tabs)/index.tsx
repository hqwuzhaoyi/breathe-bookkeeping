import { View, StyleSheet } from "react-native";
import useAudioRecorder from "~/hook/useAudioRecorder";
import ExpenseCard from "~/components/ExpenseCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Mic, Pause } from "~/lib/icons";
import { useState } from "react";
import clsx from "clsx";
import MyBottomSheet from "~/components/ui/bottom-sheet";
import { Link } from "expo-router";
import { router } from "expo-router";

const openAIEndpoint = "https://api.openai.com/v1/audio/transcriptions";
const apiKey = process.env.EXPO_PUBLIC_OPEN_API_TOKEN;

export default function Record() {
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, playSound, recordURI } =
    useAudioRecorder({ openAIEndpoint, apiKey });
  const [isVisible, setIsVisible] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-4">
        <Button
          onPress={stopRecording}
          variant="outline"
          className="shadow shadow-foreground/5"
        >
          <Text>Stop Recording</Text>
        </Button>
        {recordURI && (
          <Button onPress={() => playSound(recordURI)}>
            <Text>Play Sound</Text>
          </Button>
        )}
        <View className="flex flex-col gap-4 py-4">
          {[1, 2, 3].map((_, index) => (
            <ExpenseCard
              key={index}
              onPress={() => {
                router.push("/modal");
              }}
            />
          ))}
        </View>
        <Button
          onPress={() => {
            // setIsVisible(true);
            router.push("/modal");
          }}
          variant="default"
        >
          <Text>Present modal</Text>
        </Button>
      </View>

      <MyBottomSheet
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
      <View className="absolute bottom-[8vh] right-6">
        <Button
          className={clsx(
            "rounded-full p-3 shadow size-20 ",
            isRecording && "bg-red-500"
          )}
          variant="outline"
          onPress={() => {
            if (isRecording) {
              stopRecording();
              setIsRecording(false);
              return;
            }
            startRecording();
            setIsRecording(true);
          }}
        >
           <Text className="color-black">
            {isRecording ? (
              <Pause className="color-black" />
            ) : (
              <Mic className="color-black" />
            )}
          </Text>
        </Button>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "white",
  },
  fromText: {
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  messageText: {
    color: "#999",
    backgroundColor: "transparent",
  },
  dateText: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 20,
    top: 10,
    color: "#999",
    fontWeight: "bold",
  },
});
