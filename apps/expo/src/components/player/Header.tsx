import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Text, View } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import { usePlayerStore } from "~/stores/player/store";
import { BrandPill } from "../BrandPill";
import { BackButton } from "./BackButton";
import { Controls } from "./Controls";
import { mapSeasonAndEpisodeNumberToText } from "./utils";

export const Header = () => {
  const isIdle = usePlayerStore((state) => state.interface.isIdle);
  const meta = usePlayerStore((state) => state.meta);

  const translateY = useSharedValue(-64);

  translateY.value = withTiming(isIdle ? -64 : 0, {
    duration: 300,
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <LinearGradient colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}>
        <View
          zIndex={50}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          height={64}
          paddingHorizontal="$8"
        >
          <View width={150}>
            <Controls>
              <BackButton />
            </Controls>
          </View>
          {meta && (
            <Text fontWeight="bold">
              {meta.title} ({meta.releaseYear}){" "}
              {meta.season !== undefined && meta.episode !== undefined
                ? mapSeasonAndEpisodeNumberToText(
                    meta.season.number,
                    meta.episode.number,
                  )
                : ""}
            </Text>
          )}
          <View alignItems="center" justifyContent="center" width={150}>
            <BrandPill />
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
