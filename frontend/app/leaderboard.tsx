import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, gradients, radii, spacing, typography } from "../src/theme";
import {
  user,
  weeklyLeaderboard,
  badges,
  rewards,
  leaderboardTabs,
} from "../src/mockData";
import ScreenHeader from "../src/components/ScreenHeader";
import Mascot from "../src/components/Mascot";

const tierColor: Record<string, string> = {
  explorer: "#3EDCFF",
  challenger: "#1F88FF",
  expert: "#9C6BFF",
  mentor: "#FF3B9D",
  rare: "#FF3B9D",
  social: "#3EDCFF",
  event: "#9C6BFF",
};

export default function LeaderboardScreen() {
  const [tab, setTab] = useState<(typeof leaderboardTabs)[number]>("Weekly");
  const [showPrize, setShowPrize] = useState(false);
  const top3 = weeklyLeaderboard.slice(0, 3);
  const rest = weeklyLeaderboard.slice(3);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader streak={user.streak} rightLabel={`Rank #${user.rank}`} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        testID="leaderboard-screen"
      >
        {/* Hero with mascot trophy */}
        <LinearGradient
          colors={gradients.premium}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={{ flex: 1 }}>
            <Text style={typography.micro}>League spotlight</Text>
            <Text style={styles.heroTitle}>AI celebrities of the week</Text>
            <Text style={styles.heroSub}>
              Join the top 3 to unlock the AI Conference reward 🏆
            </Text>
          </View>
          <Mascot pose="trophy" size={110} testID="mascot-leaderboard" />
        </LinearGradient>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
          testID="leaderboard-tabs"
        >
          {leaderboardTabs.map((t) => {
            const active = t === tab;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setTab(t)}
                testID={`leaderboard-tab-${t.toLowerCase()}`}
                activeOpacity={0.85}
              >
                {active ? (
                  <LinearGradient
                    colors={gradients.impact}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.tabActive}
                  >
                    <Text style={styles.tabActiveText}>{t}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.tabInactive}>
                    <Text style={styles.tabInactiveText}>{t}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Top 3 podium */}
        <View style={styles.podium} testID="top-3-podium">
          {[top3[1], top3[0], top3[2]].map((p, i) => {
            const place = p.rank;
            const isFirst = place === 1;
            const height = isFirst ? 108 : place === 2 ? 86 : 72;
            const podiumColor =
              place === 1 ? colors.neonPink : place === 2 ? colors.violet : colors.lightBlue;
            return (
              <View key={p.rank} style={styles.podiumItem}>
                <View
                  style={[
                    styles.podiumAvatar,
                    {
                      borderColor: podiumColor,
                      shadowColor: podiumColor,
                    },
                    isFirst && { width: 74, height: 74, borderRadius: 37 },
                  ]}
                >
                  <Text style={styles.podiumAvatarText}>
                    {p.name
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </Text>
                </View>
                <Text style={styles.podiumName}>{p.name.split(" ")[0]}</Text>
                <Text style={styles.podiumPoints}>{p.points.toLocaleString()}</Text>
                <LinearGradient
                  colors={
                    isFirst
                      ? (["#FF3B9D", "#9C6BFF"] as const)
                      : place === 2
                      ? (["#9C6BFF", "#1F88FF"] as const)
                      : (["#1F88FF", "#3EDCFF"] as const)
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={[styles.podiumBase, { height }]}
                >
                  <Text style={styles.podiumRank}>{place}</Text>
                </LinearGradient>
              </View>
            );
          })}
        </View>

        {/* Rest of ranking list */}
        <View style={styles.listCard} testID="ranking-list">
          {rest.map((p, i) => (
            <View
              key={p.rank}
              style={[
                styles.listRow,
                i < rest.length - 1 && styles.listRowBorder,
                p.isUser && styles.listRowUser,
              ]}
              testID={p.isUser ? "current-user-row" : `user-row-${p.rank}`}
            >
              <View style={[styles.rankBox, p.isUser && { backgroundColor: "rgba(255,59,157,0.2)" }]}>
                <Text style={[styles.rankBoxText, p.isUser && { color: colors.neonPink }]}>
                  {p.rank}
                </Text>
              </View>
              <View
                style={[
                  styles.listAvatar,
                  p.isUser && { borderColor: colors.neonPink },
                ]}
              >
                <Text style={styles.listAvatarText}>
                  {p.name.split(" ").map((x) => x[0]).join("")}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.listName, p.isUser && { color: colors.neonPink }]}>
                  {p.name} {p.isUser && "· You"}
                </Text>
                <Text style={styles.listTeam}>
                  {p.country} · {p.team}
                </Text>
              </View>
              <Text style={styles.listPoints}>{p.points.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        {/* Badge showcase */}
        <Text style={styles.sectionTitle}>Badges showcase</Text>
        <View style={styles.badgesGrid} testID="badges-grid">
          {badges.map((b) => {
            const color = tierColor[b.tier] || colors.primary;
            return (
              <View
                key={b.id}
                style={[
                  styles.badgeTile,
                  { borderColor: b.unlocked ? color : "rgba(255,255,255,0.08)" },
                  !b.unlocked && { opacity: 0.42 },
                ]}
                testID={`badge-${b.id}`}
              >
                {b.unlocked && b.tier === "rare" && (
                  <LinearGradient
                    colors={[color + "55", "transparent"]}
                    style={StyleSheet.absoluteFill}
                  />
                )}
                <View style={[styles.badgeTileIcon, { backgroundColor: color + "22" }]}>
                  <Ionicons name={b.icon as any} size={22} color={color} />
                </View>
                <Text style={styles.badgeTileName}>{b.name}</Text>
                <Text style={[styles.badgeTileTier, { color }]}>{b.level}</Text>
                {!b.unlocked && (
                  <View style={styles.lockedOverlay}>
                    <Ionicons name="lock-closed" size={14} color={colors.textSecondary} />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Rewards */}
        <Text style={styles.sectionTitle}>Redeem your rewards</Text>

        {/* Top reward */}
        {rewards
          .filter((r) => r.top)
          .map((r) => (
            <TouchableOpacity
              key={r.id}
              activeOpacity={0.92}
              onPress={() => setShowPrize(true)}
              testID="top-reward"
            >
              <LinearGradient
                colors={gradients.impact}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.topReward}
              >
                <View style={styles.topRewardIcon}>
                  <Ionicons name="trophy" size={30} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.topRewardLabel}>GRAND PRIZE</Text>
                  <Text style={styles.topRewardName}>{r.name}</Text>
                  <Text style={styles.topRewardDesc}>{r.desc}</Text>
                </View>
                <View style={styles.topRewardCost}>
                  <Ionicons name="diamond" size={14} color="#fff" />
                  <Text style={styles.topRewardCostText}>{r.cost.toLocaleString()}</Text>
                  <Text style={styles.topRewardCostSub}>IP</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}

        {/* Other rewards */}
        <View style={styles.rewardsList}>
          {rewards
            .filter((r) => !r.top)
            .map((r) => {
              const isImpact = r.kind === "impact";
              return (
                <View key={r.id} style={styles.rewardRow} testID={`reward-${r.id}`}>
                  <View
                    style={[
                      styles.rewardIcon,
                      {
                        backgroundColor: isImpact
                          ? "rgba(255,59,157,0.16)"
                          : "rgba(62,220,255,0.14)",
                      },
                    ]}
                  >
                    <Ionicons
                      name={r.icon as any}
                      size={20}
                      color={isImpact ? colors.neonPink : colors.lightBlue}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rewardName}>{r.name}</Text>
                    <Text style={styles.rewardDesc}>{r.desc}</Text>
                  </View>
                  {isImpact ? (
                    <LinearGradient
                      colors={gradients.impact}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.costPillImpact}
                    >
                      <Ionicons name="diamond" size={10} color="#fff" />
                      <Text style={styles.costPillImpactText}>{r.cost}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.costPillXp}>
                      <Ionicons name="flash" size={10} color={colors.lightBlue} />
                      <Text style={styles.costPillXpText}>{r.cost}</Text>
                    </View>
                  )}
                </View>
              );
            })}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Grand prize celebration modal */}
      <Modal
        visible={showPrize}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPrize(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setShowPrize(false)}
          testID="prize-modal-backdrop"
        >
          <Pressable style={styles.modalCard} testID="prize-modal">
            <LinearGradient
              colors={gradients.impact}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalGlowHeader}
            >
              <View style={styles.modalMascotWrap}>
                <Mascot pose="trophy" size={132} glow={false} />
              </View>
              <Text style={styles.modalConfetti}>🎉   ✈️   🏆   ✨</Text>
            </LinearGradient>

            <View style={styles.modalBody}>
              <Text style={styles.modalEyebrow}>YOU UNLOCKED THE GRAND PRIZE</Text>
              <Text style={styles.modalTitle}>Pack your bags!</Text>
              <Text style={styles.modalSubtitle}>
                Valid ticket for the AI Conference in Silicon Valley.
              </Text>

              {/* Faux boarding-pass details */}
              <View style={styles.ticket} testID="prize-ticket">
                <View style={styles.ticketRow}>
                  <View>
                    <Text style={styles.ticketLabel}>FROM</Text>
                    <Text style={styles.ticketCode}>CDG</Text>
                    <Text style={styles.ticketCity}>Paris</Text>
                  </View>
                  <Ionicons name="airplane" size={24} color={colors.neonPink} />
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.ticketLabel}>TO</Text>
                    <Text style={styles.ticketCode}>SFO</Text>
                    <Text style={styles.ticketCity}>Silicon Valley</Text>
                  </View>
                </View>
                <View style={styles.ticketDivider} />
                <View style={styles.ticketRow}>
                  <View>
                    <Text style={styles.ticketLabel}>PASSENGER</Text>
                    <Text style={styles.ticketValue}>Jürgen Esser</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.ticketLabel}>EVENT</Text>
                    <Text style={styles.ticketValue}>AI Finance Summit</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowPrize(false)}
                testID="prize-close-btn"
                style={{ marginTop: 20 }}
              >
                <LinearGradient
                  colors={gradients.impact}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.modalBtn}
                >
                  <Text style={styles.modalBtnText}>Let's go!</Text>
                  <Ionicons name="arrow-forward" size={18} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setShowPrize(false)}
              style={styles.modalClose}
              testID="prize-close-x"
            >
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
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
  hero: {
    flexDirection: "row", alignItems: "center",
    padding: 18, borderRadius: radii.xl,
    borderWidth: 1, borderColor: colors.borderSubtle,
    marginBottom: spacing.md,
  },
  heroTitle: { ...typography.h1, fontSize: 22, marginTop: 4 },
  heroSub: { ...typography.body, fontSize: 13, marginTop: 4 },
  tabsRow: { gap: 8, paddingVertical: 4, paddingRight: 12 },
  tabActive: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100,
    shadowColor: colors.neonPink, shadowOpacity: 0.45,
    shadowRadius: 10, shadowOffset: { width: 0, height: 2 },
  },
  tabActiveText: { color: "#fff", fontWeight: "800", fontSize: 12 },
  tabInactive: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100,
    backgroundColor: colors.bgSurface,
    borderWidth: 1, borderColor: colors.borderSubtle,
  },
  tabInactiveText: { color: colors.textSecondary, fontWeight: "700", fontSize: 12 },
  podium: {
    flexDirection: "row", alignItems: "flex-end",
    justifyContent: "center", gap: 12, marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  podiumItem: { alignItems: "center", flex: 1 },
  podiumAvatar: {
    width: 60, height: 60, borderRadius: 30,
    borderWidth: 2, marginBottom: 8,
    alignItems: "center", justifyContent: "center",
    backgroundColor: colors.bgSurface,
    shadowOpacity: 0.6, shadowRadius: 12, shadowOffset: { width: 0, height: 0 },
  },
  podiumAvatarText: { color: colors.textPrimary, fontWeight: "800", fontSize: 14 },
  podiumName: { color: colors.textPrimary, fontWeight: "700", fontSize: 13 },
  podiumPoints: { color: colors.textSecondary, fontSize: 11, marginBottom: 6, fontWeight: "700" },
  podiumBase: {
    width: "100%", borderTopLeftRadius: 12, borderTopRightRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  podiumRank: { color: "#fff", fontSize: 22, fontWeight: "800" },
  listCard: {
    backgroundColor: colors.bgSurface, borderRadius: radii.lg,
    borderWidth: 1, borderColor: colors.borderSubtle,
    marginBottom: spacing.md,
  },
  listRow: {
    flexDirection: "row", alignItems: "center",
    gap: 10, paddingHorizontal: 12, paddingVertical: 12,
  },
  listRowBorder: {
    borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)",
  },
  listRowUser: {
    backgroundColor: "rgba(255,59,157,0.08)",
    borderWidth: 1, borderColor: "rgba(255,59,157,0.4)",
    borderRadius: radii.lg,
  },
  rankBox: {
    width: 28, height: 28, borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center", justifyContent: "center",
  },
  rankBoxText: { color: colors.textPrimary, fontWeight: "800", fontSize: 12 },
  listAvatar: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: colors.bgSurfaceElevated,
    borderWidth: 1, borderColor: colors.borderSubtle,
    alignItems: "center", justifyContent: "center",
  },
  listAvatarText: { color: colors.textPrimary, fontSize: 11, fontWeight: "800" },
  listName: { color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  listTeam: { color: colors.textSecondary, fontSize: 11, marginTop: 1 },
  listPoints: { color: colors.lightBlue, fontSize: 14, fontWeight: "800" },
  sectionTitle: { ...typography.h3, marginTop: spacing.sm, marginBottom: spacing.sm },
  badgesGrid: {
    flexDirection: "row", flexWrap: "wrap", gap: 10,
  },
  badgeTile: {
    width: "31.5%",
    padding: 12,
    borderRadius: radii.md,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    alignItems: "flex-start",
    overflow: "hidden",
  },
  badgeTileIcon: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: "center", justifyContent: "center", marginBottom: 8,
  },
  badgeTileName: { color: colors.textPrimary, fontWeight: "800", fontSize: 12 },
  badgeTileTier: { fontSize: 10, fontWeight: "800", marginTop: 2, letterSpacing: 0.5 },
  lockedOverlay: {
    position: "absolute", top: 8, right: 8,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: "rgba(11,21,42,0.9)",
    alignItems: "center", justifyContent: "center",
  },
  topReward: {
    flexDirection: "row", alignItems: "center",
    padding: 16, borderRadius: radii.xl, gap: 14,
    shadowColor: colors.neonPink, shadowOpacity: 0.55,
    shadowRadius: 18, shadowOffset: { width: 0, height: 8 },
    elevation: 10, marginBottom: spacing.md,
  },
  topRewardIcon: {
    width: 54, height: 54, borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  topRewardLabel: {
    color: "#fff", fontSize: 10, fontWeight: "800",
    letterSpacing: 1.2, opacity: 0.85,
  },
  topRewardName: { color: "#fff", fontSize: 17, fontWeight: "800", marginTop: 2 },
  topRewardDesc: { color: "#fff", fontSize: 12, opacity: 0.9, marginTop: 3 },
  topRewardCost: {
    alignItems: "center",
    paddingHorizontal: 12, paddingVertical: 10,
    borderRadius: 14, backgroundColor: "rgba(255,255,255,0.22)",
    flexDirection: "row", gap: 4,
  },
  topRewardCostText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  topRewardCostSub: { color: "#fff", fontSize: 10, opacity: 0.8, fontWeight: "700" },
  rewardsList: {
    backgroundColor: colors.bgSurface,
    borderRadius: radii.lg,
    borderWidth: 1, borderColor: colors.borderSubtle,
  },
  rewardRow: {
    flexDirection: "row", alignItems: "center",
    gap: 12, paddingHorizontal: 12, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)",
  },
  rewardIcon: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  rewardName: { color: colors.textPrimary, fontSize: 14, fontWeight: "700" },
  rewardDesc: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  costPillXp: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100,
    backgroundColor: "rgba(62,220,255,0.14)",
    borderWidth: 1, borderColor: "rgba(62,220,255,0.3)",
  },
  costPillXpText: { color: colors.lightBlue, fontWeight: "800", fontSize: 12 },
  costPillImpact: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100,
    shadowColor: colors.neonPink, shadowOpacity: 0.5, shadowRadius: 6,
  },
  costPillImpactText: { color: "#fff", fontWeight: "800", fontSize: 12 },

  // Prize celebration modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(11,21,42,0.82)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.bgSurface,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,59,157,0.4)",
    shadowColor: colors.neonPink,
    shadowOpacity: 0.6,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },
  modalGlowHeader: {
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalMascotWrap: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
  },
  modalConfetti: {
    fontSize: 18,
    letterSpacing: 8,
    marginTop: 10,
    color: "#fff",
  },
  modalBody: {
    padding: 20,
    paddingTop: 16,
  },
  modalEyebrow: {
    color: colors.neonPink,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    textAlign: "center",
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 6,
    letterSpacing: -0.4,
  },
  modalSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
  ticket: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.bgBase,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  ticketRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ticketLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  ticketCode: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
    letterSpacing: 1,
  },
  ticketCity: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 1,
  },
  ticketDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 12,
  },
  ticketValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },
  modalBtn: {
    height: 50,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: colors.neonPink,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  modalBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  modalClose: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(11,21,42,0.6)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
});
