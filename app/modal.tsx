import { View, Text } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { EmojiSelector } from "~/components/FoodChoose";
export default function Modal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  return (
    <View style={{ flex: 1 }}>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}

      <View>
        <EmojiSelector />
      </View>

      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
    </View>
  );
}
