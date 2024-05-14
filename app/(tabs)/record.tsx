import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import useAudioRecorder from "~/hook/useAudioRecorder";

const openAIEndpoint = "https://api.openai.com/v1/audio/transcriptions";
const apiKey = process.env.EXPO_PUBLIC_OPEN_API_TOKEN;

export default function App() {
  const { startRecording, stopRecording, playSound, recordURI } =
    useAudioRecorder({ openAIEndpoint, apiKey });

  return (
    <View>
      <Button title="Start Recording" onPress={startRecording} />
      <Button title="Stop Recording" onPress={stopRecording} />
      {recordURI && (
        <Button title="Play Sound" onPress={() => playSound(recordURI)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});
