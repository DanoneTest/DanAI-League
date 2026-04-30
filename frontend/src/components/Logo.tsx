import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { assets } from "../theme";

type Props = { size?: number; testID?: string };

export default function Logo({ size = 40, testID = "app-logo" }: Props) {
  return (
    <View testID={testID} style={[styles.wrap, { height: size }]}>
      <Image
        source={assets.logo}
        style={{ width: size * 3.2, height: size }}
        contentFit="contain"
        transition={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
