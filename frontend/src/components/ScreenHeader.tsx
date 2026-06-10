import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "./Logo";
import { colors, spacing } from "../theme";

type Props = {
  streak?: number;
  rightLabel?: string;
  rank?: number;
  showBell?: boolean;
  showHelp?: boolean;
  hasUnread?: boolean;
  onBellPress?: () => void;
  onHelpPress?: () => void;
};

export default function ScreenHeader({
  streak,
  rightLabel,
  rank,
  showBell = false,
  showHelp = false,
  hasUnread = false,
  onBellPress,
  onHelpPress,
}: Props) {
  return (
    <View style={styles.container} testID="screen-header">
      <Logo />
      <View style={styles.right}>
        {streak !== undefined && (
          <View style={styles.streak} testID="header-streak">
            <Ionicons name="flame" size={14} color={colors.neonPink} />
            <Text style={styles.streakText}>{streak}</Text>
            <Text style={styles.streakLabel}>day streak</Text>
          </View>
        )}
        {rank !== undefined && (
          <LinearGradient
            colors={["#9C6BFF", "#1F88FF"] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.rankPill}
          >
            <Ionicons name="podium" size={11} color="#fff" />
            <Text style={styles.rankText}>#{rank}</Text>
          </LinearGradient>
        )}
        {rightLabel && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{rightLabel}</Text>
          </View>
        )}
        {showBell && (
          <TouchableOpacity style={styles.iconBtn} onPress={onBellPress} testID="header-bell">
            <Ionicons name="notifications-outline" size={18} color={colors.textPrimary} />
            {hasUnread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
        {showHelp && (
          <TouchableOpacity style={styles.iconBtn} onPress={onHelpPress} testID="header-help">
            <Ionicons name="help-circle-outline" size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
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
  right: { flexDirection: "row", alignItems: "center", gap: 8 },
  streak: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: "rgba(255,59,157,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,59,157,0.35)",
  },
  streakText: { color: colors.textPrimary, fontWeight: "800", fontSize: 13 },
  streakLabel: { color: colors.neonPink, fontWeight: "700", fontSize: 9, letterSpacing: 0.5, textTransform: "uppercase", marginLeft: 2 },
  rankPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 100,
  },
  rankText: { color: "#fff", fontWeight: "800", fontSize: 11 },
  tag: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: "rgba(62,220,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(62,220,255,0.35)",
  },
  tagText: { color: colors.lightBlue, fontWeight: "800", fontSize: 10, letterSpacing: 0.6 },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadDot: {
    position: "absolute",
    top: 7,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neonPink,
    borderWidth: 1.5,
    borderColor: colors.bgBase,
  },
});
