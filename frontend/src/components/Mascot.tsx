import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { assets, colors } from "../theme";

export type MascotPose = "happy" | "trophy" | "sad";

type Props = {
  pose?: MascotPose;
  size?: number;
  glow?: boolean;
  style?: ViewStyle;
  testID?: string;
  /**
   * Wrap mascot in a dark circular halo container so the (white-bg) PNG
   * blends with the dark UI. Use false for inline tips where the bubble
   * already provides context.
   */
  framed?: boolean;
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
  framed = true,
}: Props) {
  const inner = size * 1.42; // scale up so the white PNG corners crop out
  return (
    <View testID={testID} style={[styles.wrap, { width: size, height: size }, style]}>
      {glow && (
        <View
          pointerEvents="none"
          style={[
            styles.glow,
            {
              width: size * 1.2,
              height: size * 1.2,
              borderRadius: size,
              shadowRadius: size / 2,
            },
          ]}
        />
      )}
      {framed ? (
        <View style={[styles.frame, { width: size, height: size, borderRadius: size / 2 }]}>
          <LinearGradient
            colors={["#1A2752", "#0B152A"] as const}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View
            style={{
              width: inner,
              height: inner,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={sourceFor(pose)}
              style={{ width: inner, height: inner }}
              contentFit="contain"
              transition={150}
            />
          </View>
          <View
            pointerEvents="none"
            style={[
              styles.ring,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
          />
        </View>
      ) : (
        <Image
          source={sourceFor(pose)}
          style={{ width: size, height: size }}
          contentFit="contain"
          transition={150}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center" },
  glow: {
    position: "absolute",
    backgroundColor: "transparent",
    shadowColor: colors.neonPink,
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  frame: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,59,157,0.45)",
    backgroundColor: colors.bgBase,
  },
  ring: {
    position: "absolute",
    borderWidth: 1.5,
    borderColor: "rgba(62,220,255,0.18)",
  },
});
