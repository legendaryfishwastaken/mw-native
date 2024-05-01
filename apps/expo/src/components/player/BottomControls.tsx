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
import { mapMillisecondsToTime } from "./utils";

export const BottomControls = () => {
  const status = usePlayerStore((state) => state.status);
  const isIdle = usePlayerStore((state) => state.interface.isIdle);
  const setIsIdle = usePlayerStore((state) => state.setIsIdle);
  const isLocalFile = usePlayerStore((state) => state.isLocalFile);
  const [showRemaining, setShowRemaining] = useState(false);

  const toggleTimeDisplay = useCallback(() => {
    setIsIdle(false);
    setShowRemaining(!showRemaining);
  }, [showRemaining, setIsIdle]);

  const { currentTime, remainingTime } = useMemo(() => {
    if (status?.isLoaded) {
      const current = mapMillisecondsToTime(status.positionMillis ?? 0);
      const remaining = `-${mapMillisecondsToTime(
        (status.durationMillis ?? 0) - (status.positionMillis ?? 0),
      )}`;
      return { currentTime: current, remainingTime: remaining };
    } else {
      return {
        currentTime: mapMillisecondsToTime(0),
        remainingTime: mapMillisecondsToTime(0),
      };
    }
  }, [status]);

  const durationTime = useMemo(() => {
    return mapMillisecondsToTime(
      status?.isLoaded ? status.durationMillis ?? 0 : 0,
    );
  }, [status]);

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
