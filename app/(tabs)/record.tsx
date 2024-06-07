import { useState } from "react";
import { View, StyleSheet } from "react-native";
import useAudioRecorder from "~/hook/useAudioRecorder";
import ExpenseCard from "~/components/ExpenseCard";
import {
  FlatList,
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import AppleStyleSwipeableRow from "~/components/swipeable/AppleStyleSwipeableRow";
import GmailStyleSwipeableRow from "~/components/swipeable/GmailStyleSwipeableRow";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

const openAIEndpoint = "https://api.openai.com/v1/audio/transcriptions";
const apiKey = process.env.EXPO_PUBLIC_OPEN_API_TOKEN;

const Row = ({ item }: { item: DataRow }) => (
  // eslint-disable-next-line no-alert
  <RectButton style={styles.rectButton} onPress={() => window.alert(item.from)}>
    <Text style={styles.fromText}>{item.from}</Text>
    <Text numberOfLines={2} style={styles.messageText}>
      {item.message}
    </Text>
    <Text style={styles.dateText}>{item.when} ❭</Text>
  </RectButton>
);

const SwipeableRow = ({ item, index }: { item: DataRow; index: number }) => {
  if (index % 2 === 0) {
    return (
      <AppleStyleSwipeableRow>
        <Row item={item} />
      </AppleStyleSwipeableRow>
    );
  } else {
    return (
      <GmailStyleSwipeableRow>
        <Row item={item} />
      </GmailStyleSwipeableRow>
    );
  }
};

export default function App() {
  const { startRecording, stopRecording, playSound, recordURI } =
    useAudioRecorder({ openAIEndpoint, apiKey });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        <Button onPress={startRecording}>
          <Text>Start Recording</Text>
        </Button>
        <Button onPress={stopRecording}>
          <Text>Stop Recording</Text>
        </Button>
        {recordURI && (
          <Button onPress={() => playSound(recordURI)}>
            <Text>Play Sound</Text>
          </Button>
        )}
        <View className="flex flex-col gap-4 p-4">
          {[1, 2, 3].map((_, index) => (
            <ExpenseCard key={index} />
          ))}
        </View>
      </View>
      <View className="fixed bottom-10 left-0 right-0 p-4 bg-white shadow-md">
        <Button onPress={startRecording} variant="secondary">
          <Text>Start Recording</Text>
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

type DataRow = {
  from: string;
  when: string;
  message: string;
};

const DATA: DataRow[] = [
  {
    from: "D'Artagnan",
    when: "3:11 PM",
    message:
      "Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque",
  },
  {
    from: "Aramis",
    when: "11:46 AM",
    message:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.",
  },
  {
    from: "Athos",
    when: "6:06 AM",
    message:
      "Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.",
  },
  {
    from: "Porthos",
    when: "Yesterday",
    message:
      "Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.",
  },
  {
    from: "Domestos",
    when: "2 days ago",
    message:
      "Aliquam imperdiet dolor eget aliquet feugiat. Fusce tincidunt mi diam. Pellentesque cursus semper sem. Aliquam ut ullamcorper massa, sed tincidunt eros.",
  },
  {
    from: "Cardinal Richelieu",
    when: "2 days ago",
    message:
      "Pellentesque id quam ac tortor pellentesque tempor tristique ut nunc. Pellentesque posuere ut massa eget imperdiet. Ut at nisi magna. Ut volutpat tellus ut est viverra, eu egestas ex tincidunt. Cras tellus tellus, fringilla eget massa in, ultricies maximus eros.",
  },
  {
    from: "D'Artagnan",
    when: "Week ago",
    message:
      "Aliquam non aliquet mi. Proin feugiat nisl maximus arcu imperdiet euismod nec at purus. Vestibulum sed dui eget mauris consequat dignissim.",
  },
  {
    from: "Cardinal Richelieu",
    when: "2 weeks ago",
    message:
      "Vestibulum ac nisi non augue viverra ullamcorper quis vitae mi. Donec vitae risus aliquam, posuere urna fermentum, fermentum risus. ",
  },
];
