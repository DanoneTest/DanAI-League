# Dan'AI League — PRD (Prototype)

## Overview
"Dan'AI League" is a **front-end only prototype** (Expo + React Native) for a gamified AI upskilling platform targeted at finance professionals (FP&A, Operations Finance, etc.) in a global FMCG company. The prototype uses **mock data** — no backend, no persistence.

## Persona used in prototype
- **Name**: Paco Ramirez
- **Team**: Operations Finance
- **Country**: Netherlands 🇳🇱
- **Tier**: AI Expert · 14-day streak · Rank #7

## Brand / Design System
- Primary dark blue `#173A8F`, medium blue `#1F88FF`, light blue `#3EDCFF`, violet `#9C6BFF`, neon pink `#FF3B9D`.
- Dark premium fintech aesthetic with blue→violet→pink gradients.
- Mandatory **logo** (Dan'AI League) top-left on every screen.
- Mandatory **Maia mascot** on every screen with a functional role (happy / trophy / sad poses).

## Navigation
Bottom tab bar with 4 tabs: **Home · Learn · Quiz · League**. Active tab uses the impact-gradient glowing pill.

## Screens

### 1. Home (`/`)
- Logo header + streak flame + avatar
- Hero greeting "Hi, Paco!" with mascot (trophy pose)
- **Split points view**:
  - Learning XP card (blue gradient) 85/120 daily cap with progress bar
  - Impact Points card (**pink→violet premium gradient + neon-pink glow**) 2,340 IP
- Continue learning card (Prompt Engineering for FP&A)
- Daily missions (4 items with check state, XP pills, one Impact-Points mission)
- Your badges preview carousel (tier-colored)
- Weekly top 5 mini leaderboard

### 2. Learn (`/learn`)
- Logo header + module chip
- Lesson title "Prompt Engineering for FP&A" with step progress bar
- **Mascot (happy) + speech bubble** "MAIA TIP"
- Microlearning card (5 cards, swipe via dots + Prev/Next buttons)
- XP reward indicator "+40 XP on complete"
- "Up next in this module" locked previews
- Footer Next button (XP gradient) → navigates to Quiz on last card

### 3. Quiz (`/quiz`)
- Logo header + question progress (Q3/5)
- **Mascot reacts dynamically**: happy (idle) / trophy (correct) / sad (wrong) with dynamic message
- XP chip "+15 XP if correct"
- Question + 4 lettered answer cards; immediate green/pink feedback
- Gradient feedback banner with explanation
- **Power-ups**: Skip question (blue), Retry answer (pink) — usage-limited
- Footer gradient button → navigates to Leaderboard

### 4. League (`/leaderboard`)
- Logo header + rank chip
- Hero "AI celebrities of the week" + mascot (trophy)
- **Tabs**: Weekly / Country / Team / All-time / Personal
- **Top-3 podium** with gradient pedestals + glow borders by rank
- Ranking list with current user (Paco) highlighted in neon pink
- **Badges showcase grid** — 11 badges across Knowledge / Social / Event / Rare tiers (locked/unlocked)
- **Rewards**:
  - Grand prize "AI Conference Seat" (5,000 IP) with impact-gradient + glow
  - Avatar customization, €25 voucher, LinkedIn Recognition (mix of XP and IP costs)

## Gamification visual contract
- **XP**: blue gradient, light-blue chips (common)
- **Impact Points**: pink→violet gradient + neon-pink drop-shadow glow (premium, rare)
- Badges tier-colored: Explorer (light blue) → Challenger (blue) → Expert (violet) → Mentor (pink); Rare get extra gradient glow overlay.

## Tech
- Expo SDK 54, expo-router (file-based routing), TypeScript
- `expo-image` for logo/mascot (remote URL caching)
- `expo-linear-gradient` for gradients
- `@expo/vector-icons` (Ionicons) for icons

## Smart enhancement (business)
The **Impact Points** system is the core product-market lever: it rewards **real business action** (AI use cases shared, automations) over passive learning, so the gamification directly drives measurable productivity gains — not vanity XP.
