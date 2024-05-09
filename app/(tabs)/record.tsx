import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [sound, setSound] = useState<Audio.Sound>();
  const [recordURI, setRecordURI] = useState<string>();

  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) throw new Error("No recording object found");
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    uri && setRecordURI(uri);
  }

  async function playSound(uri) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri: uri },
      { shouldPlay: true }
    );
    setSound(sound);

    console.log("Playback started");
    await sound.playAsync();
    uploadAudioForRecognition(uri);
  }

  async function uploadAudioForRecognition(audioUri: string) {
    try {
      const fileInfo = await FileSystem.getInfoAsync(audioUri);
      const fileBlob = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const blob = new Blob([fileBlob], { type: "audio/mpeg" });

      const formData = new FormData();
      formData.append("file", blob, "recording.mp3");

      const response = await fetch(
        "https://api.speech-to-text-service.com/v1/recognize",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + process.env.EXPO_PUBLIC_OPEN_API_TOKEN, // 使用你的 API 密钥
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = await response.json();
      console.log("Recognition result:", result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
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
