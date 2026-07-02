import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { assets, colors } from "../theme";

type Props = { compact?: boolean; testID?: string };

/**
 * Dan'AI League logo: uses the official "D" mark image on the left
 * with the "Dan'AI League" wordmark on the right.
 */
export default function Logo({ compact = false, testID = "app-logo" }: Props) {
  return (
    <View style={styles.row} testID={testID}>
      <View style={styles.dWrap}>
        <Image
          source={assets.logo}
          style={styles.dImage}
          contentFit="contain"
          transition={200}
          cachePolicy="none"
        />
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
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  dImage: {
    width: 42,
    height: 42,
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
