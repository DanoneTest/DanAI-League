import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";

type Props = { compact?: boolean; testID?: string };

/**
 * Branded "D" logo rendered natively so it sits on a dark background
 * without the white box from the original PNG asset.
 * Uses the brand gradient (blue → violet → pink) on the "D" letter.
 */
export default function Logo({ compact = false, testID = "app-logo" }: Props) {
  return (
    <View style={styles.row} testID={testID}>
      <View style={styles.dWrap}>
        <LinearGradient
          colors={["#1F88FF", "#9C6BFF", "#FF3B9D"] as const}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dBg}
        >
          <Text style={styles.dLetter}>D</Text>
          {/* connection dots, evocative of the original logo */}
          <View style={[styles.dot, { top: 6, right: 6, backgroundColor: "#3EDCFF" }]} />
          <View style={[styles.dot, { bottom: 10, left: 8, backgroundColor: "#FFFFFF" }]} />
          <View style={[styles.dotSmall, { top: 18, left: 6 }]} />
          <View style={[styles.dotSmall, { bottom: 4, right: 12 }]} />
        </LinearGradient>
      </View>
      {!compact && (
        <View style={styles.text}>
          <Text style={styles.titleTop}>Dan'AI</Text>
          <Text style={styles.titleBottom}>League</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dWrap: {
    shadowColor: colors.neonPink,
    shadowOpacity: 0.55,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  dBg: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  dLetter: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -1,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dot: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  dotSmall: {
    position: "absolute",
    width: 2,
    height: 2,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  text: { justifyContent: "center" },
  titleTop: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.3,
  },
  titleBottom: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.3,
  },
});
