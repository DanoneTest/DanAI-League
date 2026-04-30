// Dan'AI League Design Tokens
export const colors = {
  bgBase: "#0B152A",
  bgSurface: "#173A8F",
  bgSurfaceElevated: "#1A42A0",
  primary: "#1F88FF",
  lightBlue: "#3EDCFF",
  violet: "#9C6BFF",
  neonPink: "#FF3B9D",
  textPrimary: "#FFFFFF",
  textSecondary: "#B3C7F9",
  borderSubtle: "rgba(255,255,255,0.08)",
  overlayDark: "rgba(11,21,42,0.9)",
  overlaySurface: "rgba(23,58,143,0.9)",
};

export const gradients = {
  impact: ["#FF3B9D", "#9C6BFF"] as const, // Impact Points premium
  xp: ["#1F88FF", "#3EDCFF"] as const, // XP / common
  premium: ["#1A42A0", "#0B152A"] as const, // surfaces
  violet: ["#9C6BFF", "#1F88FF"] as const, // mixed accent
  trophy: ["#FF3B9D", "#9C6BFF", "#1F88FF"] as const,
};

export const radii = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 100,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const assets = {
  logo:
    "https://customer-assets.emergentagent.com/job_c09f872e-dc91-4153-b57f-ec15f90147f8/artifacts/np109bsb_Logo%20Dan%27AI%20League_D%20full.png",
  mascotHappy:
    "https://customer-assets.emergentagent.com/job_c09f872e-dc91-4153-b57f-ec15f90147f8/artifacts/ab3lrs3v_Maia_happy_white%20background.png",
  mascotTrophy:
    "https://customer-assets.emergentagent.com/job_c09f872e-dc91-4153-b57f-ec15f90147f8/artifacts/nbw47g1p_Maia_trophy.png",
  mascotSad:
    "https://customer-assets.emergentagent.com/job_c09f872e-dc91-4153-b57f-ec15f90147f8/artifacts/mqdaimuz_Maia_sad_white%20background.png",
};

export const typography = {
  h1: { fontSize: 30, fontWeight: "800" as const, color: colors.textPrimary, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: "700" as const, color: colors.textPrimary },
  h3: { fontSize: 17, fontWeight: "700" as const, color: colors.textPrimary },
  body: { fontSize: 15, fontWeight: "400" as const, color: colors.textSecondary },
  caption: { fontSize: 12, fontWeight: "500" as const, color: colors.textSecondary },
  micro: {
    fontSize: 10,
    fontWeight: "800" as const,
    color: colors.lightBlue,
    letterSpacing: 1.2,
    textTransform: "uppercase" as const,
  },
};
