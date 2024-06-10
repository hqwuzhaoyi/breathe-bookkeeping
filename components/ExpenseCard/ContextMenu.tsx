import * as React from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { Text } from "~/components/ui/text";

export default function Menu(props: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [subCheckboxValue, setSubCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("pedro");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="" onPress={props.onPress}>
        <View>{props.children}</View>
      </ContextMenuTrigger>

      <ContextMenuContent
        align="start"
        insets={contentInsets}
        className="w-64 native:w-72"
      >
        <ContextMenuItem inset>
          <Text>Back</Text>
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          <Text>Forward</Text>
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          <Text>Reload</Text>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>
            <Text>More Tools</Text>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="web:w-48 native:mt-1">
            <Animated.View entering={FadeIn.duration(200)}>
              <ContextMenuItem>
                <Text>Save Page As...</Text>
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <Text>Create Shortcut...</Text>
              </ContextMenuItem>

              <ContextMenuSeparator />
              <ContextMenuItem>
                <Text>Developer Tools</Text>
              </ContextMenuItem>
            </Animated.View>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={checkboxValue}
          onCheckedChange={setCheckboxValue}
          closeOnPress={false}
        >
          <Text>Show Bookmarks Bar</Text>
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={subCheckboxValue}
          onCheckedChange={setSubCheckboxValue}
          closeOnPress={false}
        >
          <Text>Show Full URLs</Text>
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={radioValue} onValueChange={setRadioValue}>
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro" closeOnPress={false}>
            <Text>Elmer Fudd</Text>
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm" closeOnPress={false}>
            <Text>Foghorn Leghorn</Text>
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
