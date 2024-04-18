import { View, Image, Text } from 'react-native';

export default function EmojiSticker({ imageSize, stickerSource }) {
  return (
    <View style={{ top: -350 }}>
      {/* <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      /> */}
      <Text style={{ fontSize: 20, textAlign: 'center' }}>{stickerSource}</Text>
    </View>
  );
}
