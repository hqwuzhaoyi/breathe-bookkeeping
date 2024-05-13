import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const openAIEndpoint = "https://api.openai.com/v1/audio/transcriptions";
const apiKey = process.env.EXPO_PUBLIC_OPEN_API_TOKEN;

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

  async function playSound(uri: string) {
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

  function base64ToBlob(base64: string, type: string) {
    return fetch(`data:${type};base64,${base64}`).then((res) => res.blob());
  }

  async function uploadAudioForRecognition(audioUri: string) {
    try {
      const response = await FileSystem.uploadAsync(openAIEndpoint, audioUri, {
        // Optional: Additional HTTP headers to send with the request.
        headers: {
          Authorization: `Bearer ${apiKey}`,
          // any other headers your endpoint requires
        },

        // Options specifying how to upload the file.
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file", // Name of the field for the uploaded file
        mimeType: "audio/mpeg", // MIME type of the uploading file
        parameters: {
          // Optional: Any additional parameters you want to send with the file upload
          model: "whisper-1", // For example, if you're using OpenAI's model parameter
        },
      });
      console.log("Response", JSON.parse(response.body).text);
    } catch (error) {
      console.error("Failed to upload audio", error);
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
