import { useCallback, useMemo, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { isDevelopmentProvisioningProfile } from "modules/check-ios-certificate";
import { Text, View } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import { usePlayerStore } from "~/stores/player/store";
import { AudioTrackSelector } from "./AudioTrackSelector";
import { CaptionsSelector } from "./CaptionsSelector";
import { Controls } from "./Controls";
import { DownloadButton } from "./DownloadButton";
import { ProgressBar } from "./ProgressBar";
import { SeasonSelector } from "./SeasonEpisodeSelector";
import { SettingsSelector } from "./SettingsSelector";
import { SourceSelector } from "./SourceSelector";
import { mapSecondsToTime } from "./utils";

export const BottomControls = () => {
  const player = usePlayerStore((state) => state.player);
  const isIdle = usePlayerStore((state) => state.interface.isIdle);
  const setIsIdle = usePlayerStore((state) => state.setIsIdle);
  const isLocalFile = usePlayerStore((state) => state.isLocalFile);
  const [showRemaining, setShowRemaining] = useState(false);

  const toggleTimeDisplay = useCallback(() => {
    setIsIdle(false);
    setShowRemaining(!showRemaining);
  }, [showRemaining, setIsIdle]);

  const { currentTime, remainingTime } = useMemo(() => {
    if (player) {
      const current = mapSecondsToTime(player.currentTime);
      const remaining = `-${mapSecondsToTime(
        (player.duration ?? 0) - (player.currentTime ?? 0),
      )}`;
      return { currentTime: current, remainingTime: remaining };
    } else {
      return {
        currentTime: mapSecondsToTime(0),
        remainingTime: mapSecondsToTime(0),
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.currentTime]);

  const durationTime = useMemo(() => {
    return mapSecondsToTime(player?.duration ?? 0);
  }, [player?.duration]);

  const translateY = useSharedValue(128);

  translateY.value = withTiming(isIdle ? 128 : 0, {
    duration: 300,
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle, { height: 148 }]}>
      <View
        width="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
          padding="$11"
          width="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Controls>
            <View flexDirection="row" gap="$3" width="$11">
              <Text fontWeight="bold">{currentTime}</Text>
              <Text marginHorizontal={1} fontWeight="bold">
                /
              </Text>
              <TouchableOpacity onPress={toggleTimeDisplay}>
                <Text fontWeight="bold">
                  {showRemaining ? remainingTime : durationTime}
                </Text>
              </TouchableOpacity>
            </View>

            <ProgressBar />
          </Controls>
          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={4}
            paddingBottom={40}
          >
            {!isLocalFile && (
              <>
                <SeasonSelector />
                <CaptionsSelector />
                <SourceSelector />
                <AudioTrackSelector />
                <SettingsSelector />
                {Platform.OS === "android" ||
                (Platform.OS === "ios" &&
                  isDevelopmentProvisioningProfile()) ? (
                  <DownloadButton />
                ) : null}
              </>
            )}
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};
