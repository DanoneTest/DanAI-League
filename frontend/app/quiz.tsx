import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, gradients, radii, spacing, typography } from "../src/theme";
import { quizQuestion, user } from "../src/mockData";
import ScreenHeader from "../src/components/ScreenHeader";
import Mascot, { MascotPose } from "../src/components/Mascot";

type State = "idle" | "correct" | "wrong";

export default function QuizScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [state, setState] = useState<State>("idle");
  const [retries, setRetries] = useState(user.powerUps.retry);
  const [skips, setSkips] = useState(user.powerUps.skip);
  const [showPowerInfo, setShowPowerInfo] = useState(false);
  const xpAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state === "correct") {
      xpAnim.setValue(0);
      confettiAnim.setValue(0);
      Animated.parallel([
        Animated.timing(xpAnim, { toValue: 1, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(confettiAnim, { toValue: 1, duration: 1200, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]).start();
    }
  }, [state, xpAnim, confettiAnim]);

  const handleSelect = (id: string) => {
    if (state !== "idle") return;
    setSelected(id);
    if (id === quizQuestion.correctId) {
      setState("correct");
    } else {
      setState("wrong");
    }
  };

  const handleRetry = () => {
    if (retries <= 0 || state !== "wrong") return;
    setRetries((r) => r - 1);
    setSelected(null);
    setState("idle");
  };

  const handleSkip = () => {
    if (skips <= 0) return;
    setSkips((s) => s - 1);
    router.push("/learn");
  };

  const handleNext = () => {
    setSelected(null);
    setState("idle");
    router.push("/leaderboard");
  };

  const mascotPose: MascotPose =
    state === "correct" ? "trophy" : state === "wrong" ? "sad" : "happy";

  const mascotMessage =
    state === "correct"
      ? "Boom! You nailed it 🎯"
      : state === "wrong"
      ? "Almost! Every miss is data — try again."
      : "Take your time. Read carefully.";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader streak={user.streak} rightLabel={`Q${quizQuestion.index}/${quizQuestion.total}`} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        testID="quiz-screen"
      >
        {/* Progress */}
        <View style={styles.progressRow}>
          {Array.from({ length: quizQuestion.total }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressBar,
                i < quizQuestion.index - 1
                  ? { backgroundColor: colors.lightBlue }
                  : i === quizQuestion.index - 1
                  ? { backgroundColor: colors.neonPink }
                  : { backgroundColor: "rgba(255,255,255,0.12)" },
              ]}
            />
          ))}
        </View>

        {/* Mascot + bubble */}
        <View style={styles.mascotRow}>
          <Mascot pose={mascotPose} size={96} testID="mascot-quiz" />
          <View
            style={[
              styles.mascotBubble,
              state === "correct" && { borderColor: colors.lightBlue },
              state === "wrong" && { borderColor: colors.neonPink },
            ]}
          >
            <Text
              style={[
                styles.mascotBubbleLabel,
                state === "correct" && { color: colors.lightBlue },
                state === "wrong" && { color: colors.neonPink },
              ]}
            >
              MAIA
            </Text>
            <Text style={styles.mascotBubbleText}>{mascotMessage}</Text>
          </View>
        </View>

        {/* XP indicator */}
        <View style={styles.xpBanner}>
          <View style={styles.xpChip}>
            <Ionicons name="flash" size={13} color={colors.lightBlue} />
            <Text style={styles.xpChipText}>+{quizQuestion.xpOnCorrect} XP if correct</Text>
          </View>
          <Text style={typography.micro}>Question {quizQuestion.index} of {quizQuestion.total}</Text>
        </View>

        {/* Question */}
        <Text style={styles.question} testID="quiz-question">
          {quizQuestion.question}
        </Text>

        {/* Answers */}
        <View style={styles.answers}>
          {quizQuestion.answers.map((a, idx) => {
            const isSelected = selected === a.id;
            const isCorrect = a.id === quizQuestion.correctId;
            const showAsCorrect = state !== "idle" && isCorrect;
            const showAsWrong = state === "wrong" && isSelected;

            return (
              <TouchableOpacity
                key={a.id}
                activeOpacity={0.85}
                onPress={() => handleSelect(a.id)}
                testID={`quiz-answer-${a.id}`}
                style={[
                  styles.answer,
                  isSelected && state === "idle" && { borderColor: colors.primary },
                  showAsCorrect && styles.answerCorrect,
                  showAsWrong && styles.answerWrong,
                ]}
              >
                <View
                  style={[
                    styles.letterBox,
                    showAsCorrect && { backgroundColor: colors.lightBlue },
                    showAsWrong && { backgroundColor: colors.neonPink },
                  ]}
                >
                  <Text
                    style={[
                      styles.letterText,
                      (showAsCorrect || showAsWrong) && { color: colors.bgBase },
                    ]}
                  >
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text style={styles.answerText}>{a.text}</Text>
                {showAsCorrect && (
                  <Ionicons name="checkmark-circle" size={22} color={colors.lightBlue} />
                )}
                {showAsWrong && (
                  <Ionicons name="close-circle" size={22} color={colors.neonPink} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback banner */}
        {state !== "idle" && (
          <LinearGradient
            colors={
              state === "correct"
                ? (["#1F88FF", "#3EDCFF"] as const)
                : (["#9C6BFF", "#FF3B9D"] as const)
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.feedback}
          >
            <View style={styles.feedbackHeader}>
              <Ionicons
                name={state === "correct" ? "sparkles" : "bulb"}
                size={18}
                color="#fff"
              />
              <Text style={styles.feedbackTitle}>
                {state === "correct"
                  ? `Correct · +${quizQuestion.xpOnCorrect} XP earned!`
                  : "Not quite — here's why"}
              </Text>
            </View>
            <Text style={styles.feedbackText}>{quizQuestion.explanation}</Text>
            {state === "correct" && (
              <>
                {/* Confetti particles */}
                <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
                  {[..."🎉✨🏆⭐💎🎯"].map((emoji, i) => (
                    <Animated.Text
                      key={i}
                      style={{
                        position: "absolute",
                        top: -10,
                        left: `${(i + 1) * 14}%`,
                        fontSize: 16,
                        opacity: confettiAnim,
                        transform: [
                          {
                            translateY: confettiAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 60 + i * 4],
                            }),
                          },
                          {
                            rotate: confettiAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["0deg", `${(i % 2 ? 1 : -1) * 360}deg`],
                            }),
                          },
                        ],
                      }}
                    >
                      {emoji}
                    </Animated.Text>
                  ))}
                </View>
                {/* Floating +XP */}
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.floatXp,
                    {
                      opacity: xpAnim.interpolate({ inputRange: [0, 0.8, 1], outputRange: [0, 1, 0.6] }),
                      transform: [
                        { translateY: xpAnim.interpolate({ inputRange: [0, 1], outputRange: [10, -20] }) },
                        { scale: xpAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.1] }) },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.floatXpText}>+{quizQuestion.xpOnCorrect} XP</Text>
                </Animated.View>
              </>
            )}
          </LinearGradient>
        )}

        {/* Power-ups */}
        <View style={styles.powerHeader}>
          <Text style={styles.sectionTitle}>Power-ups</Text>
          <TouchableOpacity onPress={() => setShowPowerInfo(true)} testID="powerup-info-btn" style={styles.infoBtn}>
            <Ionicons name="information-circle-outline" size={16} color={colors.lightBlue} />
            <Text style={styles.infoBtnText}>How do these work?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.powerupsRow}>
          <TouchableOpacity
            style={[styles.powerup, skips === 0 && styles.powerupDisabled]}
            onPress={handleSkip}
            disabled={skips === 0}
            testID="powerup-skip"
          >
            <View style={[styles.powerupIcon, { backgroundColor: "rgba(62,220,255,0.16)" }]}>
              <Ionicons name="play-skip-forward" size={18} color={colors.lightBlue} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.powerupTitle}>Skip question</Text>
              <Text style={styles.powerupSub}>{skips} left · no XP penalty</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.powerup,
              (retries === 0 || state !== "wrong") && styles.powerupDisabled,
            ]}
            onPress={handleRetry}
            disabled={retries === 0 || state !== "wrong"}
            testID="powerup-retry"
          >
            <View style={[styles.powerupIcon, { backgroundColor: "rgba(255,59,157,0.16)" }]}>
              <Ionicons name="refresh" size={18} color={colors.neonPink} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.powerupTitle}>Retry answer</Text>
              <Text style={styles.powerupSub}>{retries} left · no penalty</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer next */}
      {state !== "idle" && (
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.9} onPress={handleNext} style={{ flex: 1 }} testID="quiz-next-btn">
            <LinearGradient
              colors={gradients.impact}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.nextBtn}
            >
              <Text style={styles.nextBtnText}>See the leaderboard</Text>
              <Ionicons name="trophy" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Power-ups info modal */}
      <Modal visible={showPowerInfo} transparent animationType="fade" onRequestClose={() => setShowPowerInfo(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setShowPowerInfo(false)}>
          <Pressable style={styles.modalSheet} testID="powerup-modal">
            <TouchableOpacity onPress={() => setShowPowerInfo(false)} style={styles.modalClose}>
              <Ionicons name="close" size={18} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalEyebrow}>POWER-UPS · HOW THEY WORK</Text>
            <Text style={styles.modalTitle}>Use them wisely</Text>
            <View style={styles.powerInfoRow}>
              <View style={[styles.powerInfoIcon, { backgroundColor: "rgba(62,220,255,0.16)" }]}>
                <Ionicons name="play-skip-forward" size={18} color={colors.lightBlue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.powerInfoTitle}>Skip question</Text>
                <Text style={styles.powerInfoBody}>Skip a tricky question with no XP penalty. <Text style={styles.bold}>Earn 1</Text> for every 5-day streak.</Text>
              </View>
            </View>
            <View style={styles.powerInfoRow}>
              <View style={[styles.powerInfoIcon, { backgroundColor: "rgba(255,59,157,0.16)" }]}>
                <Ionicons name="refresh" size={18} color={colors.neonPink} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.powerInfoTitle}>Retry answer</Text>
                <Text style={styles.powerInfoBody}>Try again after a wrong answer with no XP penalty. <Text style={styles.bold}>Earn 1</Text> by completing a Learn module.</Text>
              </View>
            </View>
            <View style={styles.powerInfoRow}>
              <View style={[styles.powerInfoIcon, { backgroundColor: "rgba(156,107,255,0.16)" }]}>
                <Ionicons name="bulb" size={18} color={colors.violet} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.powerInfoTitle}>Hint (coming soon)</Text>
                <Text style={styles.powerInfoBody}>Reveal one wrong answer. <Text style={styles.bold}>Earn 1</Text> by sharing an AI use case (Impact mission).</Text>
              </View>
            </View>
            <Text style={styles.powerInfoFootnote}>Your balance: <Text style={styles.bold}>{skips}× Skip · {retries}× Retry · {user.powerUps.hint}× Hint</Text></Text>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  progressRow: { flexDirection: "row", gap: 6, marginTop: 6 },
  progressBar: { flex: 1, height: 4, borderRadius: 100 },
  mascotRow: {
    flexDirection: "row", alignItems: "center",
    gap: 6, marginTop: spacing.md,
  },
  mascotBubble: {
    flex: 1, padding: 12,
    backgroundColor: colors.bgSurface,
    borderRadius: 18, borderTopLeftRadius: 4,
    borderWidth: 1, borderColor: colors.borderSubtle,
  },
  mascotBubbleLabel: {
    color: colors.lightBlue, fontWeight: "800",
    fontSize: 10, letterSpacing: 1.2, marginBottom: 3,
  },
  mascotBubbleText: { color: colors.textPrimary, fontSize: 13, lineHeight: 18 },
  xpBanner: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", marginTop: spacing.md,
  },
  xpChip: {
    flexDirection: "row", alignItems: "center", gap: 5,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100,
    backgroundColor: "rgba(62,220,255,0.12)",
    borderWidth: 1, borderColor: "rgba(62,220,255,0.3)",
  },
  xpChipText: { color: colors.lightBlue, fontSize: 12, fontWeight: "800" },
  question: {
    ...typography.h1, fontSize: 22, lineHeight: 30,
    marginTop: spacing.md, marginBottom: spacing.md,
  },
  answers: { gap: 10 },
  answer: {
    flexDirection: "row", alignItems: "center",
    gap: 12, padding: 14,
    backgroundColor: colors.bgSurface, borderRadius: radii.md,
    borderWidth: 1, borderColor: colors.borderSubtle,
  },
  answerCorrect: {
    borderColor: colors.lightBlue,
    backgroundColor: "rgba(62,220,255,0.1)",
  },
  answerWrong: {
    borderColor: colors.neonPink,
    backgroundColor: "rgba(255,59,157,0.08)",
  },
  letterBox: {
    width: 30, height: 30, borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center", justifyContent: "center",
  },
  letterText: { color: colors.textPrimary, fontWeight: "800", fontSize: 13 },
  answerText: { color: colors.textPrimary, flex: 1, fontSize: 14, fontWeight: "600", lineHeight: 20 },
  feedback: {
    borderRadius: radii.lg, padding: 14, marginTop: spacing.md,
    shadowColor: colors.neonPink, shadowOpacity: 0.35, shadowRadius: 12,
  },
  feedbackHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  feedbackTitle: { color: "#fff", fontWeight: "800", fontSize: 14 },
  feedbackText: { color: "#fff", fontSize: 13, lineHeight: 19, opacity: 0.95 },
  sectionTitle: { ...typography.h3, marginTop: spacing.lg, marginBottom: spacing.sm },
  powerupsRow: { flexDirection: "row", gap: 10 },
  powerup: {
    flex: 1, flexDirection: "row", alignItems: "center", gap: 10,
    padding: 12, borderRadius: radii.md,
    backgroundColor: colors.bgSurface,
    borderWidth: 1, borderColor: colors.borderSubtle,
  },
  powerupDisabled: { opacity: 0.4 },
  powerupIcon: {
    width: 38, height: 38, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  powerupTitle: { color: colors.textPrimary, fontWeight: "700", fontSize: 13 },
  powerupSub: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  footer: {
    position: "absolute", left: 0, right: 0, bottom: 0,
    padding: spacing.md,
    backgroundColor: colors.bgBase,
    borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.06)",
  },
  nextBtn: {
    height: 52, borderRadius: 100,
    flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 8,
  },
  nextBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },

  // Power-ups header
  powerHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg },
  infoBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  infoBtnText: { color: colors.lightBlue, fontSize: 11, fontWeight: "700" },

  // Floating +XP
  floatXp: {
    position: "absolute", top: 14, right: 14,
    backgroundColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 100,
  },
  floatXpText: { color: "#fff", fontSize: 13, fontWeight: "800" },

  // Power-ups modal
  modalBackdrop: { flex: 1, backgroundColor: "rgba(11,21,42,0.82)", alignItems: "center", justifyContent: "center", padding: 20 },
  modalSheet: { width: "100%", maxWidth: 380, backgroundColor: colors.bgSurface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: colors.borderSubtle },
  modalClose: { position: "absolute", top: 12, right: 12, width: 30, height: 30, borderRadius: 15, backgroundColor: "rgba(11,21,42,0.6)", alignItems: "center", justifyContent: "center", zIndex: 1, borderWidth: 1, borderColor: "rgba(255,255,255,0.18)" },
  modalEyebrow: { color: colors.neonPink, fontSize: 10, fontWeight: "800", letterSpacing: 1.4 },
  modalTitle: { color: colors.textPrimary, fontSize: 22, fontWeight: "800", marginTop: 4, marginBottom: 12 },
  powerInfoRow: { flexDirection: "row", gap: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" },
  powerInfoIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  powerInfoTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: "800" },
  powerInfoBody: { color: colors.textSecondary, fontSize: 12, marginTop: 3, lineHeight: 17 },
  powerInfoFootnote: { color: colors.textSecondary, fontSize: 12, marginTop: 14, textAlign: "center" },
  bold: { color: colors.textPrimary, fontWeight: "800" },
});
