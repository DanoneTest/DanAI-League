export const user = {
  name: "Jürgen Esser",
  firstName: "Jürgen",
  team: "Deputy CEO, Finance, Technology & Data",
  country: "Paris, France",
  countryFlag: "🇫🇷",
  streak: 14,
  xpToday: 85,
  xpDailyCap: 120,
  impactPoints: 2340,
  totalXp: 8450,
  level: 18,
  tier: "AI Expert",
  rank: 7,
};

export const dailyMissions = [
  { id: "m1", title: "Complete today's lesson", xp: 30, done: true, icon: "book-outline" },
  { id: "m2", title: "Win a 5-question quiz", xp: 25, done: true, icon: "trophy-outline" },
  { id: "m3", title: "Beat your best score", xp: 20, done: false, icon: "flash-outline" },
  { id: "m4", title: "Share an AI use case", xp: 45, done: false, icon: "bulb-outline", impact: true },
];

export const continueLearning = {
  title: "Prompt Engineering for FP&A",
  module: "Module 3 of 5",
  progress: 0.62,
  duration: "8 min",
  xpReward: 40,
};

export const badgePreview = [
  { id: "b1", name: "AI Expert", tier: "expert", icon: "ribbon", unlocked: true },
  { id: "b2", name: "Speed Master", tier: "rare", icon: "flash", unlocked: true },
  { id: "b3", name: "7-Day Streak", tier: "rare", icon: "flame", unlocked: true },
  { id: "b4", name: "AI Mentor", tier: "mentor", icon: "school", unlocked: false },
];

export const miniLeaderboard = [
  { rank: 1, name: "Daniela Dalton", team: "FP&A", points: 12480, avatar: "👩‍💼", country: "🇺🇸" },
  { rank: 2, name: "Antoine Guttinger", team: "P2P", points: 11320, avatar: "👨‍💼", country: "🇨🇭" },
  { rank: 3, name: "Yves Pellegrino", team: "Treasury", points: 10940, avatar: "🧑‍💼", country: "🇮🇹" },
  { rank: 4, name: "Carles Vall", team: "FP&A", points: 9870, avatar: "🧑‍💻", country: "🇪🇸" },
  { rank: 5, name: "Julie Leclerc", team: "Controlling", points: 9510, avatar: "👩‍🎓", country: "🇫🇷" },
];

// Full leaderboard with current user highlighted
export const weeklyLeaderboard = [
  { rank: 1, name: "Daniela Dalton", team: "FP&A", points: 12480, country: "🇺🇸", isUser: false },
  { rank: 2, name: "Antoine Guttinger", team: "P2P", points: 11320, country: "🇨🇭", isUser: false },
  { rank: 3, name: "Yves Pellegrino", team: "Treasury", points: 10940, country: "🇮🇹", isUser: false },
  { rank: 4, name: "Carles Vall", team: "FP&A", points: 9870, country: "🇪🇸", isUser: false },
  { rank: 5, name: "Julie Leclerc", team: "Controlling", points: 9510, country: "🇫🇷", isUser: false },
  { rank: 6, name: "Stephane Gayet", team: "Tax", points: 8920, country: "🇫🇷", isUser: false },
  { rank: 7, name: "Jürgen Esser", team: "Deputy CEO · Fin/Tech", points: 8450, country: "🇫🇷", isUser: true },
  { rank: 8, name: "Erik Graf Von Krockow", team: "FP&A", points: 8120, country: "🇩🇪", isUser: false },
  { rank: 9, name: "Mimie Tsoi", team: "Treasury", points: 7890, country: "🇭🇰", isUser: false },
  { rank: 10, name: "Mathilde Rodie", team: "Controlling", points: 7650, country: "🇫🇷", isUser: false },
];

export const lessonContent = {
  title: "Prompt Engineering for FP&A",
  module: "Module 3 of 5",
  progress: 0.6,
  totalCards: 5,
  xpReward: 40,
  tip: "Great prompts are specific, give context and define the output format — just like a good brief!",
  cards: [
    {
      id: 1,
      label: "Core Concept",
      title: "What is a prompt?",
      body: "A prompt is the instruction you give to an AI model. Think of it as briefing a very capable junior analyst: the clearer you are, the sharper the output.",
    },
    {
      id: 2,
      label: "Framework",
      title: "The C.R.I.S.P. method",
      body: "Context • Role • Instruction • Style • Parameters. Use this structure for repeatable, high-quality results in any finance workflow.",
    },
    {
      id: 3,
      label: "Example",
      title: "Variance analysis prompt",
      body: "\"Act as an FP&A analyst. Given this P&L vs budget, explain the top 3 variances over €100k, with likely drivers, in 5 bullets.\"",
    },
    {
      id: 4,
      label: "Watch out",
      title: "Avoid hallucinations",
      body: "Always ground the AI with data you provide. Ask it to say 'I don't know' when missing info. Verify numbers before using them.",
    },
    {
      id: 5,
      label: "Apply it",
      title: "Your turn",
      body: "Pick one recurring task this week. Draft a prompt using C.R.I.S.P. and share the result with your team to earn Impact Points!",
    },
  ],
};

export const lesson2 = {
  id: "variance-analysis",
  title: "AI-Powered Variance Analysis: From Hours to Minutes",
  series: "FP&A Excellence",
  collection: "Finance Leadership Series",
  icon: "trending-up" as const,
  xpReward: 60,
  duration: "12 min",
  hook:
    "Traditional variance analysis requires manual investigation of hundreds of line items. AI can analyze patterns, identify anomalies, and draft executive explanations in minutes.",
  sections: [
    {
      id: "challenge",
      label: "The Challenge",
      body:
        "Monthly variance analysis for a large P&L can take 2–3 days: reviewing actuals vs. budget, identifying material variances, investigating root causes, and writing commentary for leadership.",
    },
    {
      id: "solution",
      label: "AI Solution",
      body:
        "Use AI to analyze variance data, identify patterns across dimensions (product, region, period), and generate draft explanations that you can validate and refine.",
    },
  ],
  steps: [
    "Export your variance report to Excel (actuals, budget, variance, %)",
    "Use Copilot in Excel to identify top 10 variances and common patterns",
    "Feed the analysis to AI with context about your business drivers",
    "Request structured commentary by materiality threshold",
  ],
  examplePrompt:
    "Analyze this variance report for Q1 2026. Identify the top 10 material variances (>$500K or >15%). For each, suggest likely root causes based on: 1) Prior period trends, 2) Known market conditions (supply chain, FX, pricing), 3) Seasonal patterns. Structure the output as: Executive Summary (3 bullets), Detailed Variance Analysis (table), Recommended Actions. Tone: CFO-ready, data-driven, actionable.",
  proTips: [
    "Always specify your materiality threshold (absolute $ and %)",
    "Include business context: recent initiatives, market changes, known events",
    "Ask AI to separate one-time vs. recurring variances",
    "Use AI output as a first draft — validate with business partners before finalizing",
  ],
  timeSaved:
    "This approach reduces variance analysis from 2–3 days to 4–6 hours, allowing you to spend more time on strategic insights and action planning.",
};

export const quizQuestion = {
  index: 3,
  total: 5,
  xpOnCorrect: 15,
  question:
    "You're preparing the monthly variance commentary for the CFO using AI. Which prompt is most likely to produce a usable FP&A output?",
  answers: [
    { id: "a", text: "“Explain why the numbers moved.”" },
    {
      id: "b",
      text:
        "“Act as a senior FP&A analyst. Using the attached Actuals vs Budget table, list the top 5 variances >€50k with likely drivers (volume, price, mix, FX) in 1-line bullets.”",
    },
    { id: "c", text: "“Make it sound smart for the CFO and add headwinds & tailwinds.”" },
    { id: "d", text: "“Summarise the P&L using your general knowledge of FMCG benchmarks.”" },
  ],
  correctId: "b",
  explanation:
    "A strong FP&A prompt sets the role, grounds the model in your actual data, defines a materiality threshold, and asks for the standard variance drivers (volume / price / mix / FX) — the building blocks of any variance bridge.",
};

export const badges = [
  // Knowledge
  { id: "k1", name: "AI Explorer", tier: "explorer", level: "L1–L5", unlocked: true, icon: "compass" },
  { id: "k2", name: "AI Challenger", tier: "challenger", level: "L6–L15", unlocked: true, icon: "flash" },
  { id: "k3", name: "AI Expert", tier: "expert", level: "L16–L30", unlocked: true, icon: "ribbon" },
  { id: "k4", name: "AI Mentor", tier: "mentor", level: "L31–L50", unlocked: false, icon: "school" },
  // Social
  { id: "s1", name: "Helping Hand", tier: "social", level: "Social", unlocked: true, icon: "people" },
  { id: "s2", name: "Top Contributor", tier: "social", level: "Social", unlocked: false, icon: "megaphone" },
  // Event
  { id: "e1", name: "Team Challenge", tier: "event", level: "Event", unlocked: true, icon: "flag" },
  { id: "e2", name: "Winter Sprint", tier: "event", level: "Seasonal", unlocked: false, icon: "snow" },
  // Rare
  { id: "r1", name: "Speed Master", tier: "rare", level: "Rare", unlocked: true, icon: "timer" },
  { id: "r2", name: "Consistency", tier: "rare", level: "Rare", unlocked: true, icon: "flame" },
  { id: "r3", name: "AI Pioneer", tier: "rare", level: "Rare", unlocked: false, icon: "rocket" },
];

export const rewards = [
  {
    id: "rw1",
    name: "Avatar customization",
    desc: "Unlock exclusive mascot outfits",
    cost: 500,
    kind: "xp",
    icon: "shirt",
  },
  {
    id: "rw2",
    name: "€25 Voucher",
    desc: "Partner e-shop gift card",
    cost: 1200,
    kind: "xp",
    icon: "gift",
  },
  {
    id: "rw3",
    name: "LinkedIn Recognition",
    desc: "Official AI Champion post from your CFO",
    cost: 800,
    kind: "impact",
    icon: "star",
  },
  {
    id: "rw4",
    name: "AI Conference Seat",
    desc: "All-expenses trip to the global AI Finance Summit",
    cost: 5000,
    kind: "impact",
    icon: "trophy",
    top: true,
  },
];

export const leaderboardTabs = ["Weekly", "Country", "Team", "All-time", "Personal"] as const;
