import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable, View, Text } from 'react-native';

export default function EmojiList({ onSelect, onCloseModal }) {
  const [emoji] = useState([
    '😅',
    '😆',
    '🍋',
    '💎',
    '🇨🇳',
    '🧎',
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
            <View style={styles.image}>
                <Text>{item}</Text>
            </View>
          {/* <Image source={item} key={index} style={styles.image} /> */}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
