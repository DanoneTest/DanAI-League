import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "./Logo";
import { colors, spacing } from "../theme";

type Props = {
  streak?: number;
  rightLabel?: string;
};

export default function ScreenHeader({ streak, rightLabel }: Props) {
  return (
    <View style={styles.container} testID="screen-header">
      <Logo size={34} />
      <View style={styles.right}>
        {streak !== undefined && (
          <View style={styles.streak} testID="header-streak">
            <Ionicons name="flame" size={16} color={colors.neonPink} />
            <Text style={styles.streakText}>{streak}</Text>
          </View>
        )}
        {rightLabel && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{rightLabel}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.avatar} testID="header-avatar">
          <Text style={styles.avatarText}>PR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  streak: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: "rgba(255,59,157,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,59,157,0.35)",
  },
  streakText: {
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 13,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: "rgba(62,220,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(62,220,255,0.35)",
  },
  tagText: {
    color: colors.lightBlue,
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
  },
});
