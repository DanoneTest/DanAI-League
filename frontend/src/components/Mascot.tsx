import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { assets, colors } from "../theme";

export type MascotPose = "happy" | "trophy" | "sad";

type Props = {
  pose?: MascotPose;
  size?: number;
  glow?: boolean;
  style?: ViewStyle;
  testID?: string;
};

const sourceFor = (pose: MascotPose) => {
  switch (pose) {
    case "trophy":
      return assets.mascotTrophy;
    case "sad":
      return assets.mascotSad;
    case "happy":
    default:
      return assets.mascotHappy;
  }
};

export default function Mascot({
  pose = "happy",
  size = 96,
  glow = true,
  style,
  testID = "mascot",
}: Props) {
  return (
    <View testID={testID} style={[styles.wrap, { width: size, height: size }, style]}>
      {glow && (
        <View
          pointerEvents="none"
          style={[
            styles.glow,
            {
              width: size * 1.15,
              height: size * 1.15,
              borderRadius: size,
              shadowRadius: size / 2,
            },
          ]}
        />
      )}
      <Image
        source={sourceFor(pose)}
        style={{ width: size, height: size }}
        contentFit="contain"
        transition={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    backgroundColor: "transparent",
    shadowColor: colors.neonPink,
    shadowOpacity: 0.55,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
});
