import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { usePlayerStore } from "~/stores/player/store";
import { Controls } from "./Controls";
import { PlayButton } from "./PlayButton";
import { SeekButton } from "./SeekButton";

export const MiddleControls = () => {
  const idle = usePlayerStore((state) => state.interface.isIdle);
  const setIsIdle = usePlayerStore((state) => state.setIsIdle);

  const handleTouch = () => {
    setIsIdle(!idle);
  };

  const opacity = useSharedValue(1);

  opacity.value = withTiming(idle ? 0 : 1, {
    duration: 300,
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <Animated.View style={[animatedStyle, styles.container]}>
        <Controls>
          <SeekButton type="backward" />
        </Controls>
        <Controls>
          <PlayButton />
        </Controls>
        <Controls>
          <SeekButton type="forward" />
        </Controls>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 82,
  },
});
