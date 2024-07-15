import emojis from "./emoji.json";

const foodEmojis = emojis.emojis.map((emoji) => {
  return {
    name: emoji.name,
    emoji: emoji.emoji,
  };
});
export { foodEmojis };
