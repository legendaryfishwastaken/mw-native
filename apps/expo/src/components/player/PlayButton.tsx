import { FontAwesome } from "@expo/vector-icons";
import { Spinner } from "tamagui";

import { usePlayerStore } from "~/stores/player/store";

export const PlayButton = () => {
  const player = usePlayerStore((state) => state.player);
  const playAudio = usePlayerStore((state) => state.playAudio);
  const pauseAudio = usePlayerStore((state) => state.pauseAudio);

  if (!player) return null;

  if (player.status === "loading") {
    return <Spinner size="large" color="white" />;
  }

  return (
    <FontAwesome
      name={player.playing ? "pause" : "play"}
      size={36}
      color="white"
      onPress={() => {
        if (player.playing) {
          void pauseAudio();
        } else {
          void playAudio();
        }

        if (!player.playing) {
          player.play();
          void playAudio();
        }
      }}
    />
  );
};
