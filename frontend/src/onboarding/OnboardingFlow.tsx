import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../components/Logo";
import Mascot from "../components/Mascot";
import { colors, gradients, radii, spacing, typography } from "../theme";

/* ------------------- storage keys ------------------- */
const KEY_DONE = "danai_onboarding_done";
const KEY_PERSONA = "danai_persona";

/* ------------------- assessment data ------------------- */
type Persona = "Explorer" | "Practitioner" | "Champion";

const personaMeta: Record<
  Persona,
  {
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    gradient: readonly [string, string];
    description: string;
    focus: string[];
    benchmark: string;
  }
> = {
  Explorer: {
    icon: "compass",
    color: "#3EDCFF",
    gradient: ["#1F88FF", "#3EDCFF"] as const,
    description:
      "You are beginning your AI adoption journey and building foundational capabilities.",
    focus: ["AI Foundations", "Prompt Basics", "Everyday Productivity"],
    benchmark: "You are ahead of 35% of Finance users in AI adoption maturity.",
  },
  Practitioner: {
    icon: "construct",
    color: "#9C6BFF",
    gradient: ["#9C6BFF", "#1F88FF"] as const,
    description:
      "You already use AI and are ready to increase its impact in your daily work.",
    focus: ["Advanced Prompting", "Workflow Optimization", "Functional Use Cases"],
    benchmark: "You are ahead of 62% of Finance users in AI adoption maturity.",
  },
  Champion: {
    icon: "trophy",
    color: "#FF3B9D",
    gradient: ["#FF3B9D", "#9C6BFF"] as const,
    description:
      "You are an advanced AI user who can help accelerate adoption across Finance.",
    focus: ["AI Leadership", "Scaling Use Cases", "Community Sharing"],
    benchmark: "You are ahead of 81% of Finance users in AI adoption maturity.",
  },
};

const Q1 = {
  title: "How often do you currently use AI tools?",
  options: [
    { label: "Daily", score: 4 },
    { label: "Several times per week", score: 3 },
    { label: "Occasionally", score: 2 },
    { label: "Rarely", score: 1 },
    { label: "Never", score: 0 },
  ],
};
const Q2 = {
  title: "How confident do you feel using AI?",
  options: [
    { label: "Very confident", score: 4 },
    { label: "Confident", score: 3 },
    { label: "Somewhat confident", score: 2 },
    { label: "Beginner", score: 1 },
    { label: "Completely new to AI", score: 0 },
  ],
};
const Q3 = {
  title: "Which Finance function best describes your role?",
  options: [
    { label: "FP&A" },
    { label: "Topline Finance" },
    { label: "Operations Finance" },
    { label: "Tax" },
    { label: "Accounting" },
    { label: "Consolidation & Reporting" },
    { label: "Treasury" },
    { label: "P2P" },
  ],
};

const scoreToPersona = (s: number): Persona => {
  if (s >= 6) return "Champion";
  if (s >= 3) return "Practitioner";
  return "Explorer";
};

/* ------------------- tour slides ------------------- */
type TourSlide = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: readonly [string, string];
  mascot?: "happy" | "trophy";
  cta: string;
};

const tourSlides: TourSlide[] = [
  {
    eyebrow: "WELCOME",
    title: "Welcome to Dan'AI League",
    subtitle: "Your personalized journey to AI adoption in Finance.",
    body:
      "Dan'AI League helps Finance teams discover, learn, and apply AI through practical learning experiences, challenges, and real business use cases.",
    icon: "sparkles",
    accent: ["#FF3B9D", "#9C6BFF"] as const,
    mascot: "happy",
    cta: "Get Started",
  },
  {
    eyebrow: "STEP 1 OF 4",
    title: "Learn",
    body:
      "Explore curated AI content designed specifically for Finance teams. Build skills through short modules, practical examples, and guided learning paths.",
    icon: "book",
    accent: ["#1F88FF", "#3EDCFF"] as const,
    cta: "Next",
  },
  {
    eyebrow: "STEP 2 OF 4",
    title: "Compete",
    body:
      "Earn points, unlock badges, and climb the leaderboard as you complete learning activities and challenges.",
    icon: "trophy",
    accent: ["#9C6BFF", "#FF3B9D"] as const,
    mascot: "trophy",
    cta: "Next",
  },
  {
    eyebrow: "STEP 3 OF 4",
    title: "Apply",
    body:
      "Turn knowledge into impact by discovering AI use cases that can improve the way you work.",
    icon: "bulb",
    accent: ["#FF3B9D", "#1F88FF"] as const,
    cta: "Next",
  },
  {
    eyebrow: "STEP 4 OF 4",
    title: "Track Your Growth",
    body:
      "Follow your learning journey, monitor achievements, and continue advancing your AI adoption maturity.",
    icon: "trending-up",
    accent: ["#3EDCFF", "#9C6BFF"] as const,
    cta: "Start Assessment",
  },
];

/* ------------------- props ------------------- */
type Props = {
  /** if true, force-open in "view persona" mode (no first-run gating) */
  forceShow?: boolean;
  /** called when the flow is dismissed */
  onClose?: () => void;
};

/* ------------------- main component ------------------- */
export default function OnboardingFlow({ forceShow = false, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0); // 0..4 tour ; 5..7 questions ; 8 result
  const [q1, setQ1] = useState<number | null>(null);
  const [q2, setQ2] = useState<number | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [savedPersona, setSavedPersona] = useState<Persona | null>(null);
  const fade = useRef(new Animated.Value(1)).current;

  // First-launch check
  useEffect(() => {
    (async () => {
      if (forceShow) {
        const stored = (await AsyncStorage.getItem(KEY_PERSONA)) as Persona | null;
        if (stored) {
          setSavedPersona(stored);
          setStep(8);
        } else {
          setStep(0);
        }
        setVisible(true);
        return;
      }
      try {
        const done = await AsyncStorage.getItem(KEY_DONE);
        if (!done) setVisible(true);
      } catch {
        setVisible(true);
      }
    })();
  }, [forceShow]);

  const animateTo = (nextStep: number) => {
    Animated.timing(fade, { toValue: 0, duration: 140, useNativeDriver: true, easing: Easing.out(Easing.ease) }).start(() => {
      setStep(nextStep);
      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true, easing: Easing.out(Easing.ease) }).start();
    });
  };

  const finishAndEnter = async (persona?: Persona) => {
    try {
      await AsyncStorage.setItem(KEY_DONE, "1");
      if (persona) await AsyncStorage.setItem(KEY_PERSONA, persona);
    } catch {
      // ignore in mock
    }
    setVisible(false);
    onClose?.();
  };

  const skipAll = () => finishAndEnter(savedPersona ?? undefined);

  const persona = useMemo<Persona>(() => {
    if (savedPersona) return savedPersona;
    const score = (q1 ?? 0) + (q2 ?? 0);
    return scoreToPersona(score);
  }, [q1, q2, savedPersona]);

  /* ------------------- render helpers ------------------- */
  const renderTour = () => {
    const slide = tourSlides[step];
    return (
      <Animated.View style={[styles.flex1, { opacity: fade }]}>
        <ScrollView contentContainerStyle={styles.tourScroll} showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={[slide.accent[0] + "33", "transparent"] as [string, string]}
            style={styles.tourGlow}
          />
          <View style={styles.iconHaloWrap}>
            <LinearGradient colors={slide.accent} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconHalo}>
              <Ionicons name={slide.icon} size={42} color="#fff" />
            </LinearGradient>
          </View>

          {slide.mascot && (
            <View style={{ alignItems: "center", marginTop: 14 }}>
              <Mascot pose={slide.mascot} size={120} />
            </View>
          )}

          <Text style={styles.eyebrow}>{slide.eyebrow}</Text>
          <Text style={styles.heroTitle}>{slide.title}</Text>
          {slide.subtitle && <Text style={styles.heroSubtitle}>{slide.subtitle}</Text>}
          <Text style={styles.body}>{slide.body}</Text>

          {/* Highlight chips by step */}
          {step === 1 && (
            <HighlightChips
              chips={[
                { icon: "bulb", label: "Daily tips" },
                { icon: "book", label: "Microlearning" },
                { icon: "library", label: "FP&A playbooks" },
              ]}
            />
          )}
          {step === 2 && (
            <HighlightChips
              chips={[
                { icon: "flash", label: "XP & Impact" },
                { icon: "ribbon", label: "Badges" },
                { icon: "trophy", label: "Leaderboard" },
              ]}
            />
          )}
          {step === 3 && (
            <HighlightChips
              chips={[
                { icon: "rocket", label: "AI use cases" },
                { icon: "sparkles", label: "Prompt library" },
                { icon: "diamond", label: "Impact points" },
              ]}
            />
          )}
          {step === 4 && (
            <HighlightChips
              chips={[
                { icon: "trending-up", label: "Maturity track" },
                { icon: "stats-chart", label: "Achievements" },
                { icon: "person", label: "AI persona" },
              ]}
            />
          )}
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton label={slide.cta} onPress={() => animateTo(step + 1)} testID={`onb-tour-cta-${step}`} accent={slide.accent} />
        </View>
      </Animated.View>
    );
  };

  const renderQuestion = (qIndex: 0 | 1 | 2) => {
    const q = [Q1, Q2, Q3][qIndex];
    const current = [q1, q2, q3][qIndex];
    const select = (val: any) => {
      if (qIndex === 0) setQ1(val);
      if (qIndex === 1) setQ2(val);
      if (qIndex === 2) setQ3(val);
    };
    const onNext = () => {
      if (qIndex < 2) animateTo(step + 1);
      else animateTo(8);
    };
    const canProceed = qIndex === 2 ? !!current : current !== null;

    return (
      <Animated.View style={[styles.flex1, { opacity: fade }]}>
        <ScrollView contentContainerStyle={styles.qScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.eyebrowSmall}>ASSESSMENT · {qIndex + 1} OF 3</Text>
          <Text style={styles.qTitle} testID={`onb-q${qIndex + 1}-title`}>{q.title}</Text>

          <View style={{ marginTop: 12, gap: 10 }}>
            {q.options.map((opt: any, i: number) => {
              const isString = qIndex === 2;
              const value = isString ? opt.label : opt.score;
              const active = current === value;
              return (
                <TouchableOpacity
                  key={opt.label}
                  activeOpacity={0.9}
                  onPress={() => select(value)}
                  style={[styles.optionRow, active && styles.optionRowActive]}
                  testID={`onb-q${qIndex + 1}-opt-${i}`}
                >
                  <View style={[styles.radio, active && styles.radioActive]}>
                    {active && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.optionText, active && { color: colors.textPrimary }]}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            label={qIndex < 2 ? "Next" : "See my AI persona"}
            onPress={onNext}
            disabled={!canProceed}
            testID={`onb-q${qIndex + 1}-next`}
            accent={["#FF3B9D", "#9C6BFF"] as const}
          />
        </View>
      </Animated.View>
    );
  };

  const renderResult = () => {
    const meta = personaMeta[persona];
    return (
      <Animated.View style={[styles.flex1, { opacity: fade }]}>
        <ScrollView contentContainerStyle={styles.resultScroll} showsVerticalScrollIndicator={false}>
          <LinearGradient colors={[meta.color + "33", "transparent"] as [string, string]} style={styles.tourGlow} />

          <Text style={styles.eyebrowSmall}>YOUR AI PERSONA</Text>

          {/* Persona badge */}
          <View style={styles.personaBadgeWrap}>
            <LinearGradient colors={meta.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.personaBadge}>
              <Ionicons name={meta.icon} size={46} color="#fff" />
            </LinearGradient>
            <View style={[styles.personaRibbon, { backgroundColor: meta.color }]}>
              <Ionicons name="ribbon" size={12} color={colors.bgBase} />
              <Text style={[styles.personaRibbonText, { color: colors.bgBase }]}>CERTIFIED</Text>
            </View>
          </View>

          <Text style={styles.personaTitle}>{persona}</Text>
          <Text style={styles.personaDesc}>{meta.description}</Text>

          <Text style={styles.sectionLabel}>RECOMMENDED FOCUS</Text>
          <View style={styles.focusList}>
            {meta.focus.map((f, i) => (
              <View key={f} style={styles.focusRow}>
                <View style={[styles.focusIcon, { backgroundColor: meta.color + "22" }]}>
                  <Text style={[styles.focusNum, { color: meta.color }]}>{i + 1}</Text>
                </View>
                <Text style={styles.focusText}>{f}</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.textSecondary} />
              </View>
            ))}
          </View>

          {/* Benchmark card */}
          <LinearGradient colors={gradients.impact} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.benchmarkCard}>
            <View style={styles.benchmarkIcon}>
              <Ionicons name="stats-chart" size={18} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.benchmarkLabel}>AI ADOPTION BENCHMARK</Text>
              <Text style={styles.benchmarkBody}>{meta.benchmark}</Text>
            </View>
          </LinearGradient>

          <Text style={styles.disclaimer}>
            This assessment helps personalize your Dan'AI League experience.
          </Text>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            label={savedPersona ? "Close" : "Enter Dan'AI League"}
            onPress={() => finishAndEnter(persona)}
            testID="onb-enter-app"
            accent={meta.gradient}
          />
        </View>
      </Animated.View>
    );
  };

  /* ------------------- progress bar ------------------- */
  const totalSteps = 9; // 5 tour + 3 questions + 1 result
  const progress = Math.min((step + 1) / totalSteps, 1);
  const inAssessment = step >= 5 && step <= 7;
  const isResult = step === 8;

  return (
    <Modal visible={visible} animationType="fade" statusBarTranslucent transparent={false}>
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        {/* Top bar with logo + skip */}
        <View style={styles.topBar}>
          <Logo />
          {!isResult && !savedPersona && (
            <TouchableOpacity onPress={skipAll} style={styles.skipBtn} testID="onb-skip">
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Progress + sectional label */}
        {!isResult && (
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <LinearGradient
                colors={inAssessment ? (["#FF3B9D", "#9C6BFF"] as const) : (["#1F88FF", "#3EDCFF"] as const)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${progress * 100}%` }]}
              />
            </View>
          </View>
        )}

        {/* Body */}
        {step <= 4 && renderTour()}
        {step === 5 && renderQuestion(0)}
        {step === 6 && renderQuestion(1)}
        {step === 7 && renderQuestion(2)}
        {step === 8 && renderResult()}
      </SafeAreaView>
    </Modal>
  );
}

/* ------------------- small components ------------------- */
function HighlightChips({ chips }: { chips: { icon: keyof typeof Ionicons.glyphMap; label: string }[] }) {
  return (
    <View style={styles.chipsRow}>
      {chips.map((c) => (
        <View key={c.label} style={styles.chip}>
          <Ionicons name={c.icon} size={12} color={colors.lightBlue} />
          <Text style={styles.chipText}>{c.label}</Text>
        </View>
      ))}
    </View>
  );
}

function PrimaryButton({
  label,
  onPress,
  disabled = false,
  testID,
  accent,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
  accent: readonly [string, string];
}) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} disabled={disabled} testID={testID} style={{ opacity: disabled ? 0.45 : 1 }}>
      <LinearGradient colors={accent} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btn}>
        <Text style={styles.btnText}>{label}</Text>
        <Ionicons name="arrow-forward" size={16} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  safe: { flex: 1, backgroundColor: colors.bgBase },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  skipBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  skipText: { color: colors.textSecondary, fontSize: 13, fontWeight: "700" },

  progressWrap: { paddingHorizontal: spacing.md, paddingBottom: 6 },
  progressTrack: { height: 4, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 100 },

  tourScroll: { padding: spacing.md, paddingTop: 4, paddingBottom: 120, alignItems: "center" },
  tourGlow: {
    position: "absolute",
    top: -40, left: -40, right: -40,
    height: 240,
    borderRadius: 200,
  },
  iconHaloWrap: { marginTop: 12, marginBottom: 6 },
  iconHalo: {
    width: 96, height: 96, borderRadius: 28,
    alignItems: "center", justifyContent: "center",
    shadowColor: colors.neonPink,
    shadowOpacity: 0.55, shadowRadius: 22, shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  eyebrow: {
    color: colors.neonPink, fontSize: 10, fontWeight: "800", letterSpacing: 1.6,
    marginTop: spacing.md, textAlign: "center",
  },
  eyebrowSmall: { color: colors.neonPink, fontSize: 10, fontWeight: "800", letterSpacing: 1.4 },
  heroTitle: {
    ...typography.h1,
    fontSize: 32, letterSpacing: -0.6,
    textAlign: "center", marginTop: 6,
  },
  heroSubtitle: {
    color: colors.lightBlue, fontSize: 14, fontWeight: "700",
    textAlign: "center", marginTop: 8,
  },
  body: {
    color: colors.textSecondary, fontSize: 14, lineHeight: 22,
    textAlign: "center", marginTop: 14, paddingHorizontal: 4,
  },

  chipsRow: {
    flexDirection: "row", flexWrap: "wrap", gap: 8,
    marginTop: spacing.lg, justifyContent: "center",
  },
  chip: {
    flexDirection: "row", alignItems: "center", gap: 6,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 100,
    backgroundColor: "rgba(62,220,255,0.10)",
    borderWidth: 1, borderColor: "rgba(62,220,255,0.30)",
  },
  chipText: { color: colors.textPrimary, fontSize: 12, fontWeight: "700" },

  qScroll: { padding: spacing.md, paddingBottom: 120 },
  qTitle: { ...typography.h1, fontSize: 24, lineHeight: 32, marginTop: 10 },
  optionRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: colors.bgSurface,
    borderRadius: radii.md, padding: 14,
    borderWidth: 1, borderColor: colors.borderSubtle,
  },
  optionRowActive: {
    borderColor: colors.neonPink,
    backgroundColor: "rgba(255,59,157,0.08)",
  },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 1.5, borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center", justifyContent: "center",
  },
  radioActive: { borderColor: colors.neonPink },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.neonPink },
  optionText: { color: colors.textSecondary, flex: 1, fontSize: 14, fontWeight: "600" },

  // Result
  resultScroll: { padding: spacing.md, paddingBottom: 120, alignItems: "center" },
  personaBadgeWrap: { marginTop: 18, alignItems: "center" },
  personaBadge: {
    width: 116, height: 116, borderRadius: 36,
    alignItems: "center", justifyContent: "center",
    shadowColor: colors.neonPink, shadowOpacity: 0.6,
    shadowRadius: 26, shadowOffset: { width: 0, height: 10 }, elevation: 12,
  },
  personaRibbon: {
    flexDirection: "row", gap: 4,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 100, marginTop: -10,
    alignItems: "center",
  },
  personaRibbonText: { fontSize: 9, fontWeight: "900", letterSpacing: 1.2 },
  personaTitle: { ...typography.h1, fontSize: 34, marginTop: 14, letterSpacing: -0.6 },
  personaDesc: {
    color: colors.textSecondary, fontSize: 14, lineHeight: 22,
    textAlign: "center", marginTop: 8, paddingHorizontal: 6,
  },
  sectionLabel: {
    alignSelf: "stretch",
    color: colors.lightBlue, fontSize: 10, fontWeight: "800",
    letterSpacing: 1.4, marginTop: 22, marginBottom: 10,
  },
  focusList: { alignSelf: "stretch", gap: 8 },
  focusRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: colors.bgSurface, borderRadius: radii.md,
    padding: 14, borderWidth: 1, borderColor: colors.borderSubtle,
  },
  focusIcon: { width: 30, height: 30, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  focusNum: { fontSize: 13, fontWeight: "800" },
  focusText: { flex: 1, color: colors.textPrimary, fontSize: 14, fontWeight: "700" },

  benchmarkCard: {
    alignSelf: "stretch",
    flexDirection: "row", gap: 12,
    padding: 14, borderRadius: radii.lg, marginTop: 20,
    shadowColor: colors.neonPink, shadowOpacity: 0.4, shadowRadius: 14, shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  benchmarkIcon: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center", justifyContent: "center",
  },
  benchmarkLabel: { color: "#fff", fontSize: 10, fontWeight: "800", letterSpacing: 1.4, opacity: 0.85 },
  benchmarkBody: { color: "#fff", fontSize: 13, lineHeight: 18, marginTop: 3, fontWeight: "600" },

  disclaimer: {
    color: colors.textSecondary, fontSize: 12, lineHeight: 18,
    textAlign: "center", marginTop: 16, paddingHorizontal: 12,
  },

  footer: {
    position: "absolute", left: 0, right: 0, bottom: 0,
    padding: spacing.md,
    backgroundColor: colors.bgBase,
    borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)",
  },
  btn: {
    height: 52, borderRadius: 100,
    flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 8,
    shadowColor: colors.neonPink, shadowOpacity: 0.5, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
  },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});
