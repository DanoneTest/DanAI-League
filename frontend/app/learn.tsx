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
import { lessonContent, lesson2, user } from "../src/mockData";
import ScreenHeader from "../src/components/ScreenHeader";
import Mascot from "../src/components/Mascot";

type LessonKey = 1 | 2;

export default function LearnScreen() {
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState<LessonKey>(1);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader streak={user.streak} rightLabel="Module 3/5" />

      {/* Lesson selector */}
      <View style={styles.selectorRow} testID="lesson-selector">
        <LessonChip
          active={activeLesson === 1}
          label="L1 · Prompt Engineering"
          icon="bulb"
          onPress={() => setActiveLesson(1)}
          testID="lesson-chip-1"
        />
        <LessonChip
          active={activeLesson === 2}
          label="L2 · Variance Analysis"
          icon="trending-up"
          onPress={() => setActiveLesson(2)}
          testID="lesson-chip-2"
        />
      </View>

      {activeLesson === 1 ? (
        <Lesson1 onFinish={() => router.push("/quiz")} />
      ) : (
        <Lesson2View onFinish={() => router.push("/quiz")} />
      )}
    </SafeAreaView>
  );
}

/* ------------- Lesson selector chip ------------- */

function LessonChip({
  active,
  label,
  icon,
  onPress,
  testID,
}: {
  active: boolean;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  testID: string;
}) {
  if (active) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} testID={testID} style={{ flex: 1 }}>
        <LinearGradient
          colors={gradients.impact}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.chipActive}
        >
          <Ionicons name={icon} size={14} color="#fff" />
          <Text style={styles.chipActiveText}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} testID={testID} style={[styles.chipInactive, { flex: 1 }]}>
      <Ionicons name={icon} size={14} color={colors.textSecondary} />
      <Text style={styles.chipInactiveText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ------------- LESSON 1 (existing carousel) ------------- */

function Lesson1({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const card = lessonContent.cards[index];
  const progress = (index + 1) / lessonContent.cards.length;
  const isLast = index === lessonContent.cards.length - 1;

  const next = () => {
    if (isLast) onFinish();
    else setIndex((v) => v + 1);
  };

  return (
    <>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        testID="learn-screen"
      >
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

        <View style={styles.tipContainer} testID="mascot-tip">
          <Mascot pose="happy" size={78} glow={false} testID="mascot-learn" />
          <View style={styles.bubble}>
            <View style={styles.bubbleArrow} />
            <Text style={styles.bubbleLabel}>MAIA TIP</Text>
            <Text style={styles.bubbleText}>{lessonContent.tip}</Text>
          </View>
        </View>

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
          <Text style={styles.cardTitle} testID={`card-title-${card.id}`}>
            {card.title}
          </Text>
          <Text style={styles.cardBody}>{card.body}</Text>

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

        <Text style={styles.sectionTitle}>Up next in this module</Text>
        {lessonContent.cards.slice(index + 1, index + 3).map((c) => (
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

        {/* Time saved (value framing on Lesson 1 too) */}
        <LinearGradient
          colors={gradients.impact}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.timeSavedCardL1}
          testID="lesson-1-timesaved"
        >
          <View style={styles.timeSavedIconL1}>
            <Ionicons name="time" size={18} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.timeSavedLabelL1}>TIME SAVED</Text>
            <Text style={styles.timeSavedBodyL1}>{lessonContent.timeSaved}</Text>
          </View>
        </LinearGradient>

        <View style={{ height: 90 }} />
      </ScrollView>

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
            <Text style={styles.nextBtnText}>{isLast ? "Take the quiz" : "Next"}</Text>
            <Ionicons name={isLast ? "game-controller" : "arrow-forward"} size={18} color="#0B152A" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
}

/* ------------- LESSON 2 (rich long-form) ------------- */

function Lesson2View({ onFinish }: { onFinish: () => void }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    // In a prototype we just animate the state — no clipboard required
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        testID="learn-screen-2"
      >
        {/* Lesson hero / header */}
        <View style={styles.l2Hero} testID="lesson-2-hero">
          <View style={styles.l2HeroIcon}>
            <LinearGradient
              colors={["#9C6BFF", "#1F88FF"] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.l2HeroIconInner}
            >
              <Ionicons name={lesson2.icon} size={26} color="#fff" />
            </LinearGradient>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.l2Series}>{lesson2.series.toUpperCase()}</Text>
            <Text style={styles.l2Title}>{lesson2.title}</Text>
            <View style={styles.l2MetaRow}>
              <View style={styles.l2MetaChip}>
                <Ionicons name="time-outline" size={11} color={colors.textSecondary} />
                <Text style={styles.l2MetaText}>{lesson2.duration}</Text>
              </View>
              <View style={styles.xpReward}>
                <Ionicons name="flash" size={12} color={colors.lightBlue} />
                <Text style={styles.xpRewardText}>+{lesson2.xpReward} XP</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Mascot tip */}
        <View style={styles.tipContainer} testID="mascot-tip-2">
          <Mascot pose="happy" size={70} glow={false} />
          <View style={styles.bubble}>
            <View style={styles.bubbleArrow} />
            <Text style={styles.bubbleLabel}>MAIA TIP</Text>
            <Text style={styles.bubbleText}>
              This is one of our most loved playbooks — replicate it on your next month-end.
            </Text>
          </View>
        </View>

        {/* Hook quote */}
        <View style={styles.hookCard} testID="lesson-2-hook">
          <View style={styles.hookBar} />
          <Text style={styles.hookText}>{lesson2.hook}</Text>
        </View>

        {/* Challenge & Solution sections */}
        {lesson2.sections.map((s) => (
          <View key={s.id} style={styles.l2Section} testID={`lesson-2-section-${s.id}`}>
            <Text style={styles.l2SectionLabel}>{s.label.toUpperCase()}</Text>
            <Text style={styles.l2SectionBody}>{s.body}</Text>
          </View>
        ))}

        {/* Step-by-step */}
        <View style={styles.l2Section} testID="lesson-2-steps">
          <Text style={styles.l2SectionLabel}>STEP-BY-STEP APPROACH</Text>
          {lesson2.steps.map((step, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Example prompt */}
        <Text style={styles.l2SectionLabel}>EXAMPLE PROMPT</Text>
        <LinearGradient
          colors={["rgba(156,107,255,0.18)", "rgba(31,136,255,0.12)"] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.promptCard}
          testID="lesson-2-prompt"
        >
          <TouchableOpacity onPress={onCopy} style={styles.copyRow} testID="copy-prompt-btn" activeOpacity={0.85}>
            <Ionicons
              name={copied ? "checkmark-circle" : "copy-outline"}
              size={14}
              color={copied ? colors.lightBlue : colors.violet}
            />
            <Text style={[styles.copyText, copied && { color: colors.lightBlue }]}>
              {copied ? "COPIED!" : "COPY & ADAPT THIS PROMPT"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.promptText}>{lesson2.examplePrompt}</Text>
        </LinearGradient>

        {/* Pro tips */}
        <View style={styles.l2Section} testID="lesson-2-protips">
          <Text style={styles.l2SectionLabel}>PRO TIPS</Text>
          {lesson2.proTips.map((tip, i) => (
            <View key={i} style={styles.bulletRow}>
              <Ionicons
                name="sparkles"
                size={12}
                color={colors.neonPink}
                style={{ marginTop: 4, marginRight: 4 }}
              />
              <Text style={styles.bulletText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Time saved highlight */}
        <LinearGradient
          colors={gradients.impact}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.timeSavedCard}
          testID="lesson-2-timesaved"
        >
          <View style={styles.timeSavedIcon}>
            <Ionicons name="time" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.timeSavedLabel}>TIME SAVED</Text>
            <Text style={styles.timeSavedBody}>{lesson2.timeSaved}</Text>
          </View>
        </LinearGradient>

        {/* Footer attribution row */}
        <View style={styles.attributionRow}>
          <Text style={styles.attributionLeft}>{lesson2.collection}</Text>
          <View style={styles.attributionBadge}>
            <Text style={styles.attributionBadgeText}>{lesson2.series}</Text>
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.9} onPress={onFinish} style={{ flex: 1 }} testID="learn-2-next-btn">
          <LinearGradient
            colors={gradients.impact}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextBtn}
          >
            <Text style={[styles.nextBtnText, { color: "#fff" }]}>Apply it — take the quiz</Text>
            <Ionicons name="game-controller" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
}

/* ------------- styles ------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },

  // selector
  selectorRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: spacing.md,
    marginBottom: 6,
  },
  chipActive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 100,
    shadowColor: colors.neonPink,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  chipActiveText: { color: "#fff", fontWeight: "800", fontSize: 12 },
  chipInactive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  chipInactiveText: { color: colors.textSecondary, fontWeight: "700", fontSize: 12 },

  // shared
  lessonTitle: { ...typography.h1, fontSize: 26, marginTop: 4 },
  progressHeader: { flexDirection: "row", alignItems: "center", marginTop: spacing.md, gap: 12 },
  progressTrack: { flex: 1, height: 8, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 100 },
  progressText: { color: colors.textPrimary, fontSize: 13, fontWeight: "800" },
  tipContainer: { flexDirection: "row", alignItems: "flex-start", gap: 4, marginTop: spacing.lg, marginBottom: spacing.md },
  bubble: {
    flex: 1, backgroundColor: colors.bgSurface, borderRadius: 18, borderTopLeftRadius: 4,
    padding: 14, borderWidth: 1, borderColor: colors.borderSubtle, marginTop: 10,
  },
  bubbleArrow: {
    position: "absolute", left: -6, top: 18, width: 12, height: 12,
    backgroundColor: colors.bgSurface, transform: [{ rotate: "45deg" }],
    borderLeftWidth: 1, borderBottomWidth: 1, borderColor: colors.borderSubtle,
  },
  bubbleLabel: { color: colors.neonPink, fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 4 },
  bubbleText: { color: colors.textPrimary, fontSize: 14, lineHeight: 20 },

  // lesson 1 card
  card: { borderRadius: radii.xl, padding: 20, borderWidth: 1, borderColor: colors.borderSubtle, marginTop: 4 },
  cardLabelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  cardLabel: {
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 100,
    backgroundColor: "rgba(156,107,255,0.18)", borderWidth: 1, borderColor: "rgba(156,107,255,0.4)",
  },
  cardLabelText: { color: colors.violet, fontSize: 10, fontWeight: "800", letterSpacing: 1.2, textTransform: "uppercase" },
  xpReward: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 9, paddingVertical: 5, borderRadius: 100,
    backgroundColor: "rgba(62,220,255,0.14)", borderWidth: 1, borderColor: "rgba(62,220,255,0.3)",
  },
  xpRewardText: { color: colors.lightBlue, fontSize: 11, fontWeight: "800" },
  cardTitle: { ...typography.h1, fontSize: 24, marginBottom: 10 },
  cardBody: { color: colors.textPrimary, fontSize: 15, lineHeight: 22 },
  dots: { flexDirection: "row", gap: 6, marginTop: 20 },
  dot: { width: 6, height: 6, borderRadius: 10 },
  sectionTitle: { ...typography.h3, marginTop: spacing.lg, marginBottom: spacing.sm },
  previewCard: {
    flexDirection: "row", alignItems: "center", backgroundColor: colors.bgSurface,
    borderRadius: radii.md, padding: 12, borderWidth: 1, borderColor: colors.borderSubtle,
    marginBottom: 8, gap: 12,
  },
  previewDot: { width: 30, height: 30, borderRadius: 10, backgroundColor: "rgba(62,220,255,0.12)", alignItems: "center", justifyContent: "center" },
  previewDotText: { color: colors.lightBlue, fontWeight: "800", fontSize: 13 },
  previewLabel: { color: colors.violet, fontSize: 10, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase" },
  previewTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: "700", marginTop: 2 },

  // lesson 2 hero
  l2Hero: {
    flexDirection: "row", gap: 12, padding: 16,
    backgroundColor: "rgba(156,107,255,0.10)",
    borderRadius: radii.xl, borderWidth: 1,
    borderColor: "rgba(156,107,255,0.35)",
    alignItems: "flex-start",
  },
  l2HeroIcon: { width: 52, height: 52 },
  l2HeroIconInner: { flex: 1, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  l2Series: { color: colors.violet, fontSize: 10, fontWeight: "800", letterSpacing: 1.4 },
  l2Title: { ...typography.h2, fontSize: 19, lineHeight: 25, marginTop: 4 },
  l2MetaRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  l2MetaChip: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 9, paddingVertical: 5, borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1, borderColor: colors.borderSubtle,
  },
  l2MetaText: { color: colors.textSecondary, fontSize: 11, fontWeight: "700" },

  // hook quote
  hookCard: {
    flexDirection: "row", gap: 12,
    padding: 14, marginTop: spacing.md,
    borderRadius: radii.md,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  hookBar: { width: 3, borderRadius: 2, backgroundColor: colors.violet },
  hookText: {
    flex: 1, color: colors.textPrimary, fontSize: 14, lineHeight: 22,
    fontStyle: "italic",
  },

  // lesson 2 sections
  l2Section: { marginTop: spacing.lg },
  l2SectionLabel: {
    color: colors.violet, fontSize: 11, fontWeight: "800",
    letterSpacing: 1.4, marginBottom: 8,
  },
  l2SectionBody: { color: colors.textPrimary, fontSize: 14, lineHeight: 22 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginTop: 8 },
  bulletDot: {
    width: 6, height: 6, borderRadius: 10,
    backgroundColor: colors.violet, marginTop: 8,
  },
  bulletText: { flex: 1, color: colors.textPrimary, fontSize: 14, lineHeight: 22 },

  // prompt card
  promptCard: {
    borderRadius: radii.md, padding: 14, marginTop: 6,
    borderWidth: 1, borderColor: "rgba(156,107,255,0.35)",
  },
  copyRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  copyText: {
    color: colors.violet, fontSize: 10, fontWeight: "800",
    letterSpacing: 1.4,
  },
  promptText: { color: colors.textPrimary, fontSize: 13, lineHeight: 21 },

  // time saved
  timeSavedCard: {
    flexDirection: "row", gap: 12, padding: 16,
    borderRadius: radii.xl, marginTop: spacing.lg,
    shadowColor: colors.neonPink, shadowOpacity: 0.4,
    shadowRadius: 14, shadowOffset: { width: 0, height: 6 },
    alignItems: "center",
  },
  timeSavedIcon: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center", justifyContent: "center",
  },
  timeSavedLabel: {
    color: "#fff", fontSize: 10, fontWeight: "800",
    letterSpacing: 1.4, opacity: 0.85,
  },
  timeSavedBody: { color: "#fff", fontSize: 13, lineHeight: 19, marginTop: 4, fontWeight: "600" },

  // attribution footer row
  attributionRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16, marginTop: spacing.md,
    borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.06)",
  },
  attributionLeft: { color: colors.textSecondary, fontSize: 11, fontWeight: "600" },
  attributionBadge: {
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 100,
    backgroundColor: "rgba(156,107,255,0.18)",
    borderWidth: 1, borderColor: "rgba(156,107,255,0.4)",
  },
  attributionBadgeText: { color: colors.violet, fontSize: 11, fontWeight: "800" },

  // footer next
  footer: {
    position: "absolute", left: 0, right: 0, bottom: 0,
    flexDirection: "row", gap: 12, padding: spacing.md,
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

  // Time saved (compact, lesson 1)
  timeSavedCardL1: {
    flexDirection: "row", gap: 12, padding: 14,
    borderRadius: 18, marginTop: spacing.lg,
    shadowColor: colors.neonPink, shadowOpacity: 0.4,
    shadowRadius: 12, shadowOffset: { width: 0, height: 5 },
    alignItems: "center",
  },
  timeSavedIconL1: {
    width: 36, height: 36, borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center", justifyContent: "center",
  },
  timeSavedLabelL1: {
    color: "#fff", fontSize: 9, fontWeight: "800",
    letterSpacing: 1.4, opacity: 0.85,
  },
  timeSavedBodyL1: { color: "#fff", fontSize: 12, lineHeight: 17, marginTop: 3, fontWeight: "600" },
});
