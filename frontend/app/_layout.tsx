import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients } from "../src/theme";
import OnboardingFlow from "../src/onboarding/OnboardingFlow";

type TabIconProps = { name: keyof typeof Ionicons.glyphMap; focused: boolean; label: string };

function TabIcon({ name, focused, label }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      {focused ? (
        <LinearGradient
          colors={gradients.impact}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.focusedPill}
        >
          <Ionicons name={name} size={20} color="#fff" />
        </LinearGradient>
      ) : (
        <Ionicons name={name} size={22} color={colors.textSecondary} />
      )}
      <Text
        style={[
          styles.label,
          { color: focused ? colors.neonPink : colors.textSecondary, fontWeight: focused ? "800" : "500" },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon name="home" focused={focused} label="Home" />
            ),
            tabBarButtonTestID: "tab-home",
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon name="book" focused={focused} label="Learn" />
            ),
            tabBarButtonTestID: "tab-learn",
          }}
        />
        <Tabs.Screen
          name="quiz"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon name="game-controller" focused={focused} label="Quiz" />
            ),
            tabBarButtonTestID: "tab-quiz",
          }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon name="trophy" focused={focused} label="League" />
            ),
            tabBarButtonTestID: "tab-leaderboard",
          }}
        />
      </Tabs>
      <OnboardingFlow />
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.bgBase,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    height: 76,
    paddingTop: 10,
    paddingBottom: 14,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    gap: 4,
  },
  focusedPill: {
    width: 44,
    height: 32,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.neonPink,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.3,
  },
});
