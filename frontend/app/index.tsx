import React from "react";
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
import {
  user,
  dailyMissions,
  continueLearning,
  badgePreview,
  miniLeaderboard,
} from "../src/mockData";
import ScreenHeader from "../src/components/ScreenHeader";
import Mascot from "../src/components/Mascot";
import GradientCard from "../src/components/GradientCard";

const tierColor: Record<string, string> = {
  explorer: "#3EDCFF",
  challenger: "#1F88FF",
  expert: "#9C6BFF",
  mentor: "#FF3B9D",
  rare: "#FF3B9D",
};

export default function HomeScreen() {
  const router = useRouter();
  const xpPercent = Math.min(user.xpToday / user.xpDailyCap, 1);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader streak={user.streak} rightLabel={user.tier} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        testID="home-screen"
      >
        {/* Hero greeting + mascot */}
        <View style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Text style={typography.micro}>Welcome back</Text>
            <Text style={styles.greeting}>Hi, {user.firstName}! 👋</Text>
            <Text style={styles.subGreeting}>
              {user.team} · {user.country} {user.countryFlag}
            </Text>
            <View style={styles.streakChip} testID="hero-streak">
              <Ionicons name="flame" size={14} color={colors.neonPink} />
              <Text style={styles.streakChipText}>
                {user.streak}-day streak · keep it alive!
              </Text>
            </View>
          </View>
          <Mascot pose="trophy" size={108} testID="mascot-home" />
        </View>

        {/* Points split view */}
        <View style={styles.pointsRow}>
          {/* XP */}
          <GradientCard
            colors={gradients.premium}
            style={styles.xpCard}
            testID="xp-card"
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconWrapXp}>
                <Ionicons name="flash" size={16} color={colors.lightBlue} />
              </View>
              <Text style={typography.micro}>Learning XP</Text>
            </View>
            <Text style={styles.pointValue} testID="xp-today-value">
              {user.xpToday}
              <Text style={styles.pointSuffix}> / {user.xpDailyCap}</Text>
            </Text>
            <View style={styles.progressTrack}>
              <LinearGradient
                colors={gradients.xp}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${xpPercent * 100}%` }]}
              />
            </View>
            <Text style={styles.captionMuted}>Daily cap resets at midnight</Text>
          </GradientCard>

          {/* Impact Points - premium */}
          <GradientCard
            colors={gradients.impact}
            style={styles.impactCard}
            glowColor={colors.neonPink}
            testID="impact-card"
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconWrapImpact}>
                <Ionicons name="diamond" size={16} color="#fff" />
              </View>
              <Text style={[typography.micro, { color: "#fff" }]}>Impact Points</Text>
            </View>
            <Text style={[styles.pointValue, { color: "#fff" }]} testID="impact-value">
              {user.impactPoints.toLocaleString()}
            </Text>
            <View style={styles.impactBadge}>
              <Ionicons name="trending-up" size={12} color="#fff" />
              <Text style={styles.impactBadgeText}>+180 this week</Text>
            </View>
            <Text style={styles.impactNote}>Real business impact · premium tier</Text>
          </GradientCard>
        </View>

        {/* Continue learning */}
        <Text style={styles.sectionTitle}>Continue learning</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/learn")}
          testID="continue-learning-card"
        >
          <GradientCard colors={gradients.premium} style={styles.continueCard}>
            <View style={styles.continueRow}>
              <View style={styles.continueIcon}>
                <LinearGradient
                  colors={gradients.xp}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.continueIconInner}
                >
                  <Ionicons name="play" size={22} color="#fff" />
                </LinearGradient>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.continueTitle}>{continueLearning.title}</Text>
                <Text style={styles.continueSub}>
                  {continueLearning.module} · {continueLearning.duration}
                </Text>
                <View style={styles.continueBar}>
                  <LinearGradient
                    colors={gradients.xp}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.continueBarFill,
                      { width: `${continueLearning.progress * 100}%` },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.xpPill}>
                <Ionicons name="flash" size={12} color={colors.lightBlue} />
                <Text style={styles.xpPillText}>+{continueLearning.xpReward}</Text>
              </View>
            </View>
          </GradientCard>
        </TouchableOpacity>

        {/* Daily missions */}
        <Text style={styles.sectionTitle}>Daily missions</Text>
        <View style={styles.missionsWrap} testID="daily-missions">
          {dailyMissions.map((m) => (
            <View
              key={m.id}
              style={[styles.missionRow, m.done && styles.missionRowDone]}
              testID={`mission-${m.id}`}
            >
              <View
                style={[
                  styles.checkBox,
                  m.done
                    ? { backgroundColor: colors.lightBlue, borderColor: colors.lightBlue }
                    : null,
                ]}
              >
                {m.done && <Ionicons name="checkmark" size={14} color={colors.bgBase} />}
              </View>
              <Ionicons
                name={m.icon as any}
                size={18}
                color={m.done ? colors.textSecondary : colors.textPrimary}
                style={{ marginRight: 10 }}
              />
              <Text
                style={[
                  styles.missionText,
                  m.done && { color: colors.textSecondary, textDecorationLine: "line-through" },
                ]}
              >
                {m.title}
              </Text>
              {m.impact ? (
                <LinearGradient
                  colors={gradients.impact}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.rewardPillImpact}
                >
                  <Ionicons name="diamond" size={10} color="#fff" />
                  <Text style={styles.rewardPillTextImpact}>+{m.xp} IP</Text>
                </LinearGradient>
              ) : (
                <View style={styles.rewardPill}>
                  <Ionicons name="flash" size={10} color={colors.lightBlue} />
                  <Text style={styles.rewardPillText}>+{m.xp} XP</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Badge preview */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Your badges</Text>
          <TouchableOpacity onPress={() => router.push("/leaderboard")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingRight: spacing.md }}
          testID="badge-preview"
        >
          {badgePreview.map((b) => {
            const color = tierColor[b.tier] || colors.primary;
            return (
              <View
                key={b.id}
                style={[
                  styles.badgeCard,
                  { borderColor: b.unlocked ? color : "rgba(255,255,255,0.08)" },
                  !b.unlocked && { opacity: 0.45 },
                ]}
              >
                <LinearGradient
                  colors={[color + "40", "transparent"]}
                  style={styles.badgeGlow}
                />
                <View style={[styles.badgeIcon, { backgroundColor: color + "22" }]}>
                  <Ionicons name={b.icon as any} size={22} color={color} />
                </View>
                <Text style={styles.badgeName}>{b.name}</Text>
                <Text style={styles.badgeStatus}>
                  {b.unlocked ? "Unlocked" : "Locked"}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Mini leaderboard */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Weekly top 5</Text>
          <TouchableOpacity onPress={() => router.push("/leaderboard")}>
            <Text style={styles.seeAll}>League →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.leaderboardCard} testID="mini-leaderboard">
          {miniLeaderboard.map((p, i) => (
            <View
              key={p.rank}
              style={[
                styles.lbRow,
                i < miniLeaderboard.length - 1 && styles.lbRowBorder,
              ]}
            >
              <View
                style={[
                  styles.rankPill,
                  p.rank === 1 && { backgroundColor: "rgba(255,59,157,0.18)" },
                ]}
              >
                <Text
                  style={[
                    styles.rankText,
                    p.rank === 1 && { color: colors.neonPink },
                  ]}
                >
                  {p.rank}
                </Text>
              </View>
              <Text style={styles.lbAvatar}>{p.avatar}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.lbName}>{p.name}</Text>
                <Text style={styles.lbTeam}>
                  {p.country} · {p.team}
                </Text>
              </View>
              <Text style={styles.lbPoints}>{p.points.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  greeting: { ...typography.h1, marginTop: 2 },
  subGreeting: { ...typography.body, marginTop: 2 },
  streakChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: "rgba(255,59,157,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,59,157,0.28)",
  },
  streakChipText: { color: colors.textPrimary, fontSize: 12, fontWeight: "700" },
  pointsRow: { flexDirection: "row", gap: 12, marginBottom: spacing.lg },
  xpCard: { flex: 1 },
  impactCard: { flex: 1 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8, padding: 16, paddingBottom: 6 },
  iconWrapXp: {
    width: 26, height: 26, borderRadius: 8,
    backgroundColor: "rgba(62,220,255,0.15)",
    alignItems: "center", justifyContent: "center",
  },
  iconWrapImpact: {
    width: 26, height: 26, borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center", justifyContent: "center",
  },
  pointValue: {
    fontSize: 30, fontWeight: "800", color: colors.textPrimary,
    paddingHorizontal: 16, marginTop: 2,
  },
  pointSuffix: { fontSize: 14, color: colors.textSecondary, fontWeight: "600" },
  progressTrack: {
    height: 8, borderRadius: 100, marginHorizontal: 16, marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 100 },
  captionMuted: { ...typography.caption, fontSize: 11, padding: 16, paddingTop: 8 },
  impactBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    alignSelf: "flex-start", marginHorizontal: 16, marginTop: 8,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  impactBadgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  impactNote: { color: "rgba(255,255,255,0.85)", fontSize: 11, padding: 16, paddingTop: 6, fontWeight: "600" },
  sectionTitle: { ...typography.h3, marginTop: spacing.md, marginBottom: spacing.sm },
  sectionRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.md, marginBottom: spacing.sm,
  },
  seeAll: { color: colors.lightBlue, fontSize: 13, fontWeight: "700" },
  continueCard: { marginBottom: 4, borderWidth: 1, borderColor: colors.borderSubtle },
  continueRow: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  continueIcon: { width: 52, height: 52 },
  continueIconInner: {
    flex: 1, borderRadius: 14, alignItems: "center", justifyContent: "center",
  },
  continueTitle: { color: colors.textPrimary, fontWeight: "800", fontSize: 15 },
  continueSub: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  continueBar: {
    height: 6, marginTop: 8, borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden",
  },
  continueBarFill: { height: "100%", borderRadius: 100 },
  xpPill: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100,
    backgroundColor: "rgba(62,220,255,0.14)",
    borderWidth: 1, borderColor: "rgba(62,220,255,0.3)",
  },
  xpPillText: { color: colors.lightBlue, fontWeight: "800", fontSize: 12 },
  missionsWrap: {
    backgroundColor: colors.bgSurface, borderRadius: radii.lg,
    borderWidth: 1, borderColor: colors.borderSubtle,
    overflow: "hidden",
  },
  missionRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 14, paddingVertical: 14,
  },
  missionRowDone: { backgroundColor: "rgba(62,220,255,0.04)" },
  checkBox: {
    width: 22, height: 22, borderRadius: 7,
    borderWidth: 1.5, borderColor: "rgba(255,255,255,0.22)",
    alignItems: "center", justifyContent: "center", marginRight: 12,
  },
  missionText: { color: colors.textPrimary, flex: 1, fontSize: 14, fontWeight: "600" },
  rewardPill: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 9, paddingVertical: 5, borderRadius: 100,
    backgroundColor: "rgba(62,220,255,0.14)",
    borderWidth: 1, borderColor: "rgba(62,220,255,0.3)",
  },
  rewardPillText: { color: colors.lightBlue, fontWeight: "800", fontSize: 11 },
  rewardPillImpact: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 9, paddingVertical: 5, borderRadius: 100,
    shadowColor: colors.neonPink, shadowOpacity: 0.5,
    shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
  },
  rewardPillTextImpact: { color: "#fff", fontWeight: "800", fontSize: 11 },
  badgeCard: {
    width: 120, padding: 12, borderRadius: radii.lg,
    backgroundColor: colors.bgSurface, borderWidth: 1,
    alignItems: "flex-start", overflow: "hidden",
  },
  badgeGlow: { ...StyleSheet.absoluteFillObject, opacity: 0.8 },
  badgeIcon: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: "center", justifyContent: "center", marginBottom: 10,
  },
  badgeName: { color: colors.textPrimary, fontSize: 13, fontWeight: "800" },
  badgeStatus: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  leaderboardCard: {
    backgroundColor: colors.bgSurface, borderRadius: radii.lg,
    borderWidth: 1, borderColor: colors.borderSubtle,
    paddingHorizontal: 4,
  },
  lbRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 12, paddingVertical: 12, gap: 10,
  },
  lbRowBorder: { borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)" },
  rankPill: {
    width: 28, height: 28, borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center", justifyContent: "center",
  },
  rankText: { color: colors.textPrimary, fontSize: 13, fontWeight: "800" },
  lbAvatar: { fontSize: 24 },
  lbName: { color: colors.textPrimary, fontSize: 14, fontWeight: "700" },
  lbTeam: { color: colors.textSecondary, fontSize: 11, marginTop: 1 },
  lbPoints: { color: colors.lightBlue, fontSize: 14, fontWeight: "800" },
});
