import { View, Text } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EmojiSelector } from "~/components/EmojiSelector";
import FoodPreservationForm from "~/components/FoodForm";

export default function Modal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <EmojiSelector
          onConfirm={(emoji) => {
            console.log(emoji);
          }}
        />
        <StatusBar style="light" />
      </View>
    </GestureHandlerRootView>
  );
}
