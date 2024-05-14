import { useState, useCallback } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

interface UseAudioRecorderOptions {
  openAIEndpoint: string;
  apiKey?: string;
}

interface UseAudioRecorderResult {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  playSound: (uri: string) => Promise<void>;
  recordURI?: string;
}

const useAudioRecorder = ({
  openAIEndpoint,
  apiKey,
}: UseAudioRecorderOptions): UseAudioRecorderResult => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [recordURI, setRecordURI] = useState<string | undefined>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  if (!apiKey) throw new Error("API key is required");

  const startRecording = useCallback(async (): Promise<void> => {
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
  }, [permissionResponse, requestPermission]);

  const stopRecording = useCallback(async (): Promise<void> => {
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
  }, [recording]);

  const playSound = useCallback(async (uri: string): Promise<void> => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true }
    );
    setSound(sound);

    console.log("Playback started");
    await sound.playAsync();
    uploadAudioForRecognition(uri);
  }, []);

  const uploadAudioForRecognition = useCallback(
    async (audioUri: string): Promise<void> => {
      try {
        const response = await FileSystem.uploadAsync(
          openAIEndpoint,
          audioUri,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "file",
            mimeType: "audio/mpeg",
            parameters: {
              model: "whisper-1",
            },
          }
        );
        console.log("Response", JSON.parse(response.body).text);
      } catch (error) {
        console.error("Failed to upload audio", error);
      }
    },
    [openAIEndpoint, apiKey]
  );

  return {
    startRecording,
    stopRecording,
    playSound,
    recordURI,
  };
};

export default useAudioRecorder;
