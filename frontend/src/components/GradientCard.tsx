import React from "react";
import { StyleSheet, ViewStyle, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { radii } from "../theme";

type Props = {
  colors: readonly [string, string, ...string[]];
  style?: ViewStyle;
  children?: React.ReactNode;
  radius?: number;
  glowColor?: string;
  testID?: string;
};

export default function GradientCard({
  colors,
  style,
  children,
  radius = radii.lg,
  glowColor,
  testID,
}: Props) {
  return (
    <View
      testID={testID}
      style={[
        glowColor
          ? {
              shadowColor: glowColor,
              shadowOpacity: 0.55,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 6 },
              elevation: 8,
            }
          : null,
        style,
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { borderRadius: radius }]}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
});
