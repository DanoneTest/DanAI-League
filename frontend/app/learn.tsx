import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, gradients, radii, spacing, typography } from "../src/theme";
import { lessonContent, user } from "../src/mockData";
import ScreenHeader from "../src/components/ScreenHeader";
import Mascot from "../src/components/Mascot";

export default function LearnScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const card = lessonContent.cards[index];
  const progress = (index + 1) / lessonContent.cards.length;
  const isLast = index === lessonContent.cards.length - 1;

  const next = () => {
    if (isLast) {
      router.push("/quiz");
    } else {
      setIndex((v) => v + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader streak={user.streak} rightLabel="Module 3/5" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        testID="learn-screen"
      >
        {/* Lesson title + progress */}
        <Text style={typography.micro}>Microlearning · {lessonContent.module}</Text>
        <Text style={styles.lessonTitle}>{lessonContent.title}</Text>

        <View style={styles.progressHeader}>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={gradients.xp}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {index + 1}/{lessonContent.cards.length}
          </Text>
        </View>

        {/* Mascot tip speech bubble */}
        <View style={styles.tipContainer} testID="mascot-tip">
          <Mascot pose="happy" size={78} glow={false} testID="mascot-learn" />
          <View style={styles.bubble}>
            <View style={styles.bubbleArrow} />
            <Text style={styles.bubbleLabel}>MAIA TIP</Text>
            <Text style={styles.bubbleText}>{lessonContent.tip}</Text>
          </View>
        </View>

        {/* Microlearning card */}
        <LinearGradient
          colors={gradients.premium}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardLabelRow}>
            <View style={styles.cardLabel}>
              <Text style={styles.cardLabelText}>{card.label}</Text>
            </View>
            <View style={styles.xpReward} testID="xp-reward-indicator">
              <Ionicons name="flash" size={12} color={colors.lightBlue} />
              <Text style={styles.xpRewardText}>+{lessonContent.xpReward} XP on complete</Text>
            </View>
          </View>
          <Text style={styles.cardTitle} testID={`card-title-${card.id}`}>{card.title}</Text>
          <Text style={styles.cardBody}>{card.body}</Text>

          {/* Dots */}
          <View style={styles.dots}>
            {lessonContent.cards.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === index
                    ? { backgroundColor: colors.neonPink, width: 18 }
                    : { backgroundColor: "rgba(255,255,255,0.18)" },
                ]}
              />
            ))}
          </View>
        </LinearGradient>

        {/* Secondary microlearning previews */}
        <Text style={styles.sectionTitle}>Up next in this module</Text>
        {lessonContent.cards
          .slice(index + 1, index + 3)
          .map((c) => (
            <View key={c.id} style={styles.previewCard} testID={`preview-${c.id}`}>
              <View style={styles.previewDot}>
                <Text style={styles.previewDotText}>{c.id}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.previewLabel}>{c.label}</Text>
                <Text style={styles.previewTitle}>{c.title}</Text>
              </View>
              <Ionicons name="lock-closed" size={16} color={colors.textSecondary} />
            </View>
          ))}

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Next button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => setIndex((v) => Math.max(0, v - 1))}
          disabled={index === 0}
          testID="learn-prev-btn"
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color={index === 0 ? "rgba(255,255,255,0.25)" : colors.textPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} onPress={next} style={{ flex: 1 }} testID="learn-next-btn">
          <LinearGradient
            colors={gradients.xp}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextBtn}
          >
            <Text style={styles.nextBtnText}>
              {isLast ? "Take the quiz" : "Next"}
            </Text>
            <Ionicons
              name={isLast ? "game-controller" : "arrow-forward"}
              size={18}
              color="#0B152A"
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  lessonTitle: { ...typography.h1, fontSize: 26, marginTop: 4 },
  progressHeader: {
    flexDirection: "row", alignItems: "center",
    marginTop: spacing.md, gap: 12,
  },
  progressTrack: {
    flex: 1, height: 8, borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 100 },
  progressText: { color: colors.textPrimary, fontSize: 13, fontWeight: "800" },
  tipContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  bubble: {
    flex: 1, backgroundColor: colors.bgSurface,
    borderRadius: 18, borderTopLeftRadius: 4,
    padding: 14, borderWidth: 1, borderColor: colors.borderSubtle,
    marginTop: 10,
  },
  bubbleArrow: {
    position: "absolute", left: -6, top: 18,
    width: 12, height: 12, backgroundColor: colors.bgSurface,
    transform: [{ rotate: "45deg" }],
    borderLeftWidth: 1, borderBottomWidth: 1,
    borderColor: colors.borderSubtle,
  },
  bubbleLabel: {
    color: colors.neonPink, fontSize: 10, fontWeight: "800",
    letterSpacing: 1.2, marginBottom: 4,
  },
  bubbleText: { color: colors.textPrimary, fontSize: 14, lineHeight: 20 },
  card: {
    borderRadius: radii.xl, padding: 20,
    borderWidth: 1, borderColor: colors.borderSubtle,
    marginTop: 4,
  },
  cardLabelRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", marginBottom: 14,
  },
  cardLabel: {
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 100,
    backgroundColor: "rgba(156,107,255,0.18)",
    borderWidth: 1, borderColor: "rgba(156,107,255,0.4)",
  },
  cardLabelText: {
    color: colors.violet, fontSize: 10, fontWeight: "800",
    letterSpacing: 1.2, textTransform: "uppercase",
  },
  xpReward: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 9, paddingVertical: 5, borderRadius: 100,
    backgroundColor: "rgba(62,220,255,0.14)",
    borderWidth: 1, borderColor: "rgba(62,220,255,0.3)",
  },
  xpRewardText: { color: colors.lightBlue, fontSize: 11, fontWeight: "800" },
  cardTitle: { ...typography.h1, fontSize: 24, marginBottom: 10 },
  cardBody: { color: colors.textPrimary, fontSize: 15, lineHeight: 22 },
  dots: { flexDirection: "row", gap: 6, marginTop: 20 },
  dot: { width: 6, height: 6, borderRadius: 10 },
  sectionTitle: { ...typography.h3, marginTop: spacing.lg, marginBottom: spacing.sm },
  previewCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: colors.bgSurface, borderRadius: radii.md,
    padding: 12, borderWidth: 1, borderColor: colors.borderSubtle,
    marginBottom: 8, gap: 12,
  },
  previewDot: {
    width: 30, height: 30, borderRadius: 10,
    backgroundColor: "rgba(62,220,255,0.12)",
    alignItems: "center", justifyContent: "center",
  },
  previewDotText: { color: colors.lightBlue, fontWeight: "800", fontSize: 13 },
  previewLabel: {
    color: colors.violet, fontSize: 10, fontWeight: "800",
    letterSpacing: 1, textTransform: "uppercase",
  },
  previewTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: "700", marginTop: 2 },
  footer: {
    position: "absolute", left: 0, right: 0, bottom: 0,
    flexDirection: "row", gap: 12,
    padding: spacing.md,
    backgroundColor: colors.bgBase,
    borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.06)",
  },
  prevBtn: {
    width: 52, height: 52, borderRadius: 100,
    backgroundColor: colors.bgSurface,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: colors.borderSubtle,
  },
  nextBtn: {
    height: 52, borderRadius: 100,
    flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 8,
  },
  nextBtnText: { color: "#0B152A", fontWeight: "800", fontSize: 15 },
});
