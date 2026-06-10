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
  leaderboards,
  badges,
  socialItems,
  rewards,
  audienceTabs,
  timeTabs,
  audienceHints,
} from "../src/mockData";
import ScreenHeader from "../src/components/ScreenHeader";
import Mascot from "../src/components/Mascot";

type Audience = (typeof audienceTabs)[number];
type Time = (typeof timeTabs)[number];

const tierColor: Record<string, string> = {
  explorer: "#3EDCFF",
  challenger: "#1F88FF",
  expert: "#9C6BFF",
  mentor: "#FF3B9D",
  rare: "#FF3B9D",
};

export default function LeaderboardScreen() {
  const [audience, setAudience] = useState<Audience>("Country");
  const [time, setTime] = useState<Time>("Weekly");
  const [showPrize, setShowPrize] = useState(false);
  const [showBadgeInfo, setShowBadgeInfo] = useState<null | (typeof badges)[number]>(null);

  const data = leaderboards[`${audience}·${time}`] || [];
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader streak={user.streak} rank={user.rank} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        testID="leaderboard-screen"
      >
        {/* Hero with mascot */}
        <LinearGradient colors={gradients.premium} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Text style={typography.micro}>League spotlight</Text>
            <Text style={styles.heroTitle}>AI celebrities of the {time.toLowerCase()}</Text>
            <Text style={styles.heroSub}>{audienceHints[audience]}</Text>
          </View>
          <Mascot pose="trophy" size={110} testID="mascot-leaderboard" />
        </LinearGradient>

        {/* Two-row filter structure */}
        <Text style={styles.filterRowLabel}>AUDIENCE</Text>
        <View style={styles.tabsRow} testID="audience-tabs">
          {audienceTabs.map((t) => (
            <FilterChip key={t} label={t} active={t === audience} onPress={() => setAudience(t)} testID={`audience-${t.toLowerCase()}`} />
          ))}
        </View>
        <Text style={styles.filterRowLabel}>TIME</Text>
        <View style={styles.tabsRow} testID="time-tabs">
          {timeTabs.map((t) => (
            <FilterChip key={t} label={t} active={t === time} onPress={() => setTime(t)} testID={`time-${t.toLowerCase()}`} variant="time" />
          ))}
        </View>

        {/* Top 3 podium */}
        {top3.length >= 3 && (
          <View style={styles.podium} testID="top-3-podium">
            {[top3[1], top3[0], top3[2]].map((p) => {
              const place = p.rank;
              const isFirst = place === 1;
              const height = isFirst ? 108 : place === 2 ? 86 : 72;
              const podiumColor = place === 1 ? colors.neonPink : place === 2 ? colors.violet : colors.lightBlue;
              return (
                <View key={p.rank} style={styles.podiumItem}>
                  <View
                    style={[
                      styles.podiumAvatar,
                      { borderColor: podiumColor, shadowColor: podiumColor },
                      isFirst && { width: 74, height: 74, borderRadius: 37 },
                      p.isUser && { borderColor: colors.neonPink, borderWidth: 3 },
                    ]}
                  >
                    <Text style={styles.podiumAvatarText}>
                      {p.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                    </Text>
                  </View>
                  <Text style={styles.podiumName} numberOfLines={1}>
                    {p.isUser ? "You" : p.name.split(" ")[0]}
                  </Text>
                  <Text style={styles.podiumPoints}>{p.points.toLocaleString()}</Text>
                  <LinearGradient
                    colors={
                      isFirst ? (["#FF3B9D", "#9C6BFF"] as const) : place === 2 ? (["#9C6BFF", "#1F88FF"] as const) : (["#1F88FF", "#3EDCFF"] as const)
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
        )}

        {/* Ranking list */}
        <View style={styles.listCard} testID="ranking-list">
          {(rest.length > 0 ? rest : data).map((p, i, arr) => (
            <View
              key={`${audience}-${time}-${p.rank}`}
              style={[
                styles.listRow,
                i < arr.length - 1 && styles.listRowBorder,
                p.isUser && styles.listRowUser,
              ]}
              testID={p.isUser ? "current-user-row" : `user-row-${p.rank}`}
            >
              <View style={[styles.rankBox, p.isUser && { backgroundColor: "rgba(255,59,157,0.2)" }]}>
                <Text style={[styles.rankBoxText, p.isUser && { color: colors.neonPink }]}>{p.rank}</Text>
              </View>
              <View style={[styles.listAvatar, p.isUser && { borderColor: colors.neonPink }]}>
                <Text style={styles.listAvatarText}>{p.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.listName, p.isUser && { color: colors.neonPink }]}>{p.name}{p.isUser && " · You"}</Text>
                <Text style={styles.listTeam}>{p.country} · {p.team}</Text>
              </View>
              <Text style={styles.listPoints}>{p.points.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        {/* Badges section */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Knowledge badges</Text>
          <Text style={styles.sectionHint}>Tap for criteria</Text>
        </View>
        <View style={styles.badgesGrid} testID="badges-grid">
          {badges.map((b) => {
            const color = tierColor[b.tier] || colors.primary;
            return (
              <TouchableOpacity
                key={b.id}
                onPress={() => setShowBadgeInfo(b)}
                activeOpacity={0.85}
                style={[styles.badgeTile, { borderColor: b.unlocked ? color : "rgba(255,255,255,0.08)" }, !b.unlocked && { opacity: 0.5 }]}
                testID={`badge-${b.id}`}
              >
                {b.unlocked && b.tier === "rare" && <LinearGradient colors={[color + "55", "transparent"] as [string, string]} style={StyleSheet.absoluteFill} />}
                <View style={[styles.badgeTileIcon, { backgroundColor: color + "22" }]}>
                  <Ionicons name={b.icon as any} size={22} color={color} />
                </View>
                <Text style={styles.badgeTileName}>{b.name}</Text>
                <Text style={[styles.badgeTileTier, { color }]}>{b.level}</Text>
                {!b.unlocked && (
                  <View style={styles.lockedOverlay}>
                    <Ionicons name="lock-closed" size={12} color={colors.textSecondary} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Social & Events separate section */}
        <Text style={styles.sectionTitle}>Social & events</Text>
        <View style={styles.badgesGrid} testID="social-grid">
          {socialItems.map((b) => (
            <View
              key={b.id}
              style={[
                styles.badgeTile,
                { borderColor: b.unlocked ? b.color : "rgba(255,255,255,0.08)" },
                !b.unlocked && { opacity: 0.5 },
              ]}
              testID={`social-${b.id}`}
            >
              <View style={[styles.badgeTileIcon, { backgroundColor: b.color + "22" }]}>
                <Ionicons name={b.icon as any} size={22} color={b.color} />
              </View>
              <Text style={styles.badgeTileName}>{b.name}</Text>
              <Text style={[styles.badgeTileTier, { color: b.color }]}>{b.level}</Text>
              <Text style={styles.criteriaText}>{b.criteria}</Text>
              {!b.unlocked && (
                <View style={styles.lockedOverlay}>
                  <Ionicons name="lock-closed" size={12} color={colors.textSecondary} />
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Rewards */}
        <Text style={styles.sectionTitle}>Redeem your rewards</Text>

        {rewards.filter((r) => r.top).map((r) => (
          <TouchableOpacity key={r.id} activeOpacity={0.92} onPress={() => setShowPrize(true)} testID="top-reward">
            <LinearGradient colors={gradients.impact} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.topReward}>
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

        <View style={styles.rewardsList}>
          {rewards.filter((r) => !r.top).map((r) => {
            const isImpact = r.kind === "impact";
            return (
              <View key={r.id} style={styles.rewardRow} testID={`reward-${r.id}`}>
                <View style={[styles.rewardIcon, { backgroundColor: isImpact ? "rgba(255,59,157,0.16)" : "rgba(62,220,255,0.14)" }]}>
                  <Ionicons name={r.icon as any} size={20} color={isImpact ? colors.neonPink : colors.lightBlue} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rewardName}>{r.name}</Text>
                  <Text style={styles.rewardDesc}>{r.desc}</Text>
                </View>
                {isImpact ? (
                  <LinearGradient colors={gradients.impact} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.costPillImpact}>
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

      {/* Badge info modal */}
      <Modal visible={!!showBadgeInfo} transparent animationType="fade" onRequestClose={() => setShowBadgeInfo(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setShowBadgeInfo(null)}>
          <Pressable style={styles.badgeInfoCard}>
            {showBadgeInfo && (
              <>
                <View style={[styles.badgeInfoIcon, { backgroundColor: (tierColor[showBadgeInfo.tier] || colors.primary) + "22" }]}>
                  <Ionicons name={showBadgeInfo.icon as any} size={32} color={tierColor[showBadgeInfo.tier] || colors.primary} />
                </View>
                <Text style={styles.badgeInfoTier}>{showBadgeInfo.level}</Text>
                <Text style={styles.badgeInfoName}>{showBadgeInfo.name}</Text>
                <Text style={styles.badgeInfoCriteria}>{showBadgeInfo.criteria}</Text>
                <View style={[styles.badgeInfoStatus, showBadgeInfo.unlocked ? styles.badgeInfoUnlocked : styles.badgeInfoLocked]}>
                  <Ionicons name={showBadgeInfo.unlocked ? "checkmark-circle" : "lock-closed"} size={14} color={showBadgeInfo.unlocked ? colors.lightBlue : colors.textSecondary} />
                  <Text style={[styles.badgeInfoStatusText, { color: showBadgeInfo.unlocked ? colors.lightBlue : colors.textSecondary }]}>{showBadgeInfo.unlocked ? "UNLOCKED" : "LOCKED"}</Text>
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Prize modal */}
      <Modal visible={showPrize} transparent animationType="fade" onRequestClose={() => setShowPrize(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setShowPrize(false)} testID="prize-modal-backdrop">
          <Pressable style={styles.prizeCard} testID="prize-modal">
            <LinearGradient colors={gradients.impact} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.prizeHeader}>
              <Mascot pose="trophy" size={132} glow={false} />
              <Text style={styles.prizeConfetti}>🎉   ✈️   🏆   ✨</Text>
            </LinearGradient>
            <View style={styles.prizeBody}>
              <Text style={styles.prizeEyebrow}>YOU UNLOCKED THE GRAND PRIZE</Text>
              <Text style={styles.prizeTitle}>Pack your bags!</Text>
              <Text style={styles.prizeSubtitle}>Valid ticket for the AI Conference in Silicon Valley.</Text>
              <View style={styles.ticket}>
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
                    <Text style={styles.ticketValue}>{user.name}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.ticketLabel}>EVENT</Text>
                    <Text style={styles.ticketValue}>AI Finance Summit</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.9} onPress={() => setShowPrize(false)} testID="prize-close-btn" style={{ marginTop: 20 }}>
                <LinearGradient colors={gradients.impact} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.prizeBtn}>
                  <Text style={styles.prizeBtnText}>Let's go!</Text>
                  <Ionicons name="arrow-forward" size={18} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShowPrize(false)} style={styles.prizeClose}>
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------- filter chip ---------- */
function FilterChip({ label, active, onPress, testID, variant = "audience" }: { label: string; active: boolean; onPress: () => void; testID: string; variant?: "audience" | "time" }) {
  if (active) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} testID={testID}>
        <LinearGradient
          colors={variant === "time" ? (["#1F88FF", "#3EDCFF"] as const) : (["#FF3B9D", "#9C6BFF"] as const)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.chipActive}
        >
          <Text style={[styles.chipActiveText, variant === "time" && { color: "#0B152A" }]}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} testID={testID} style={styles.chipInactive}>
      <Text style={styles.chipInactiveText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },

  hero: { flexDirection: "row", alignItems: "center", padding: 18, borderRadius: radii.xl, borderWidth: 1, borderColor: colors.borderSubtle, marginBottom: spacing.md, gap: 12 },
  heroTitle: { ...typography.h1, fontSize: 21, marginTop: 4 },
  heroSub: { ...typography.body, fontSize: 12, marginTop: 4 },

  filterRowLabel: { color: colors.textSecondary, fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginTop: 10, marginBottom: 6 },
  tabsRow: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  chipActive: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, shadowColor: colors.neonPink, shadowOpacity: 0.4, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  chipActiveText: { color: "#fff", fontWeight: "800", fontSize: 11 },
  chipInactive: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, backgroundColor: colors.bgSurface, borderWidth: 1, borderColor: colors.borderSubtle },
  chipInactiveText: { color: colors.textSecondary, fontWeight: "700", fontSize: 11 },

  podium: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 12, marginTop: spacing.md, marginBottom: spacing.md },
  podiumItem: { alignItems: "center", flex: 1 },
  podiumAvatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, marginBottom: 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.bgSurface, shadowOpacity: 0.6, shadowRadius: 12, shadowOffset: { width: 0, height: 0 } },
  podiumAvatarText: { color: colors.textPrimary, fontWeight: "800", fontSize: 14 },
  podiumName: { color: colors.textPrimary, fontWeight: "700", fontSize: 13 },
  podiumPoints: { color: colors.textSecondary, fontSize: 11, marginBottom: 6, fontWeight: "700" },
  podiumBase: { width: "100%", borderTopLeftRadius: 12, borderTopRightRadius: 12, alignItems: "center", justifyContent: "center" },
  podiumRank: { color: "#fff", fontSize: 22, fontWeight: "800" },

  listCard: { backgroundColor: colors.bgSurface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.borderSubtle, marginBottom: spacing.md },
  listRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 12, paddingVertical: 12 },
  listRowBorder: { borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)" },
  listRowUser: { backgroundColor: "rgba(255,59,157,0.08)", borderWidth: 1, borderColor: "rgba(255,59,157,0.4)", borderRadius: radii.lg },
  rankBox: { width: 28, height: 28, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  rankBoxText: { color: colors.textPrimary, fontWeight: "800", fontSize: 12 },
  listAvatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.bgSurfaceElevated, borderWidth: 1, borderColor: colors.borderSubtle, alignItems: "center", justifyContent: "center" },
  listAvatarText: { color: colors.textPrimary, fontSize: 11, fontWeight: "800" },
  listName: { color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  listTeam: { color: colors.textSecondary, fontSize: 11, marginTop: 1 },
  listPoints: { color: colors.lightBlue, fontSize: 14, fontWeight: "800" },

  sectionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.sm },
  sectionTitle: { ...typography.h3, marginTop: spacing.sm, marginBottom: spacing.sm },
  sectionHint: { color: colors.textSecondary, fontSize: 11, fontWeight: "700" },

  badgesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  badgeTile: { width: "31.5%", padding: 12, borderRadius: radii.md, backgroundColor: colors.bgSurface, borderWidth: 1, alignItems: "flex-start", overflow: "hidden", minHeight: 110 },
  badgeTileIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  badgeTileName: { color: colors.textPrimary, fontWeight: "800", fontSize: 12 },
  badgeTileTier: { fontSize: 10, fontWeight: "800", marginTop: 2, letterSpacing: 0.5 },
  criteriaText: { color: colors.textSecondary, fontSize: 9, marginTop: 4, lineHeight: 12 },
  lockedOverlay: { position: "absolute", top: 6, right: 6, width: 20, height: 20, borderRadius: 10, backgroundColor: "rgba(11,21,42,0.9)", alignItems: "center", justifyContent: "center" },

  topReward: { flexDirection: "row", alignItems: "center", padding: 16, borderRadius: radii.xl, gap: 14, shadowColor: colors.neonPink, shadowOpacity: 0.55, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 10, marginBottom: spacing.md },
  topRewardIcon: { width: 54, height: 54, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  topRewardLabel: { color: "#fff", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, opacity: 0.85 },
  topRewardName: { color: "#fff", fontSize: 16, fontWeight: "800", marginTop: 2 },
  topRewardDesc: { color: "#fff", fontSize: 11, opacity: 0.9, marginTop: 3 },
  topRewardCost: { alignItems: "center", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.22)", flexDirection: "row", gap: 4 },
  topRewardCostText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  topRewardCostSub: { color: "#fff", fontSize: 10, opacity: 0.8, fontWeight: "700" },

  rewardsList: { backgroundColor: colors.bgSurface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.borderSubtle },
  rewardRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)" },
  rewardIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  rewardName: { color: colors.textPrimary, fontSize: 14, fontWeight: "700" },
  rewardDesc: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  costPillXp: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100, backgroundColor: "rgba(62,220,255,0.14)", borderWidth: 1, borderColor: "rgba(62,220,255,0.3)" },
  costPillXpText: { color: colors.lightBlue, fontWeight: "800", fontSize: 12 },
  costPillImpact: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100, shadowColor: colors.neonPink, shadowOpacity: 0.5, shadowRadius: 6 },
  costPillImpactText: { color: "#fff", fontWeight: "800", fontSize: 12 },

  // Badge info modal
  modalBackdrop: { flex: 1, backgroundColor: "rgba(11,21,42,0.82)", alignItems: "center", justifyContent: "center", padding: 20 },
  badgeInfoCard: { width: "100%", maxWidth: 360, backgroundColor: colors.bgSurface, borderRadius: 24, padding: 24, alignItems: "center", borderWidth: 1, borderColor: colors.borderSubtle },
  badgeInfoIcon: { width: 64, height: 64, borderRadius: 18, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  badgeInfoTier: { color: colors.textSecondary, fontSize: 10, fontWeight: "800", letterSpacing: 1.4 },
  badgeInfoName: { color: colors.textPrimary, fontSize: 22, fontWeight: "800", marginTop: 6, marginBottom: 8 },
  badgeInfoCriteria: { color: colors.textSecondary, fontSize: 13, textAlign: "center", lineHeight: 19 },
  badgeInfoStatus: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, marginTop: 14 },
  badgeInfoStatusText: { fontSize: 10, fontWeight: "800", letterSpacing: 1.2 },
  badgeInfoUnlocked: { backgroundColor: "rgba(62,220,255,0.14)" },
  badgeInfoLocked: { backgroundColor: "rgba(255,255,255,0.06)" },

  // Prize modal
  prizeCard: { width: "100%", maxWidth: 380, backgroundColor: colors.bgSurface, borderRadius: 28, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,59,157,0.4)" },
  prizeHeader: { paddingVertical: 20, alignItems: "center", justifyContent: "center" },
  prizeConfetti: { fontSize: 18, letterSpacing: 8, marginTop: 10, color: "#fff" },
  prizeBody: { padding: 20 },
  prizeEyebrow: { color: colors.neonPink, fontSize: 10, fontWeight: "800", letterSpacing: 1.4, textAlign: "center" },
  prizeTitle: { color: colors.textPrimary, fontSize: 28, fontWeight: "800", textAlign: "center", marginTop: 6 },
  prizeSubtitle: { color: colors.textSecondary, fontSize: 14, textAlign: "center", marginTop: 6 },
  ticket: { marginTop: 18, padding: 16, borderRadius: 18, backgroundColor: colors.bgBase, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  ticketRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  ticketLabel: { color: colors.textSecondary, fontSize: 9, fontWeight: "800", letterSpacing: 1.2 },
  ticketCode: { color: colors.textPrimary, fontSize: 22, fontWeight: "800", marginTop: 2, letterSpacing: 1 },
  ticketCity: { color: colors.textSecondary, fontSize: 11, fontWeight: "600", marginTop: 1 },
  ticketDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.08)", marginVertical: 12 },
  ticketValue: { color: colors.textPrimary, fontSize: 13, fontWeight: "700", marginTop: 4 },
  prizeBtn: { height: 50, borderRadius: 100, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  prizeBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  prizeClose: { position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(11,21,42,0.6)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
});
