import { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  Platform,
  Pressable,
  View,
  Text,
} from "react-native";
import Emoji1 from "../assets/images/grin.png";
import Emoji2 from "../assets/images/grinning.png";
import Emoji3 from "../assets/images/heart_eyes.png";
import Emoji4 from "../assets/images/sunglasses.png";
import Emoji5 from "../assets/images/star-struck.png";

export default function EmojiList({ onSelect, onCloseModal }) {
  const [emoji] = useState([Emoji1, Emoji2, Emoji3, Emoji4, Emoji5]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
        >
          <View style={styles.image}>
            <Image source={item} key={index} style={styles.image} />
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
