export const user = {
  name: "Paco Ramirez",
  firstName: "Paco",
  team: "Operations Finance",
  country: "Netherlands",
  countryFlag: "🇳🇱",
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
  { rank: 1, name: "Isabella Rossi", team: "FP&A", points: 12480, avatar: "🧑‍💼", country: "🇮🇹" },
  { rank: 2, name: "Liam O'Connor", team: "P2P", points: 11320, avatar: "👨‍💼", country: "🇮🇪" },
  { rank: 3, name: "Aiko Tanaka", team: "Treasury", points: 10940, avatar: "👩‍💼", country: "🇯🇵" },
  { rank: 4, name: "Mateus Silva", team: "FP&A", points: 9870, avatar: "🧑‍💻", country: "🇧🇷" },
  { rank: 5, name: "Priya Sharma", team: "Controlling", points: 9510, avatar: "👩‍🎓", country: "🇮🇳" },
];

// Full leaderboard with current user highlighted
export const weeklyLeaderboard = [
  { rank: 1, name: "Isabella Rossi", team: "FP&A", points: 12480, country: "🇮🇹", isUser: false },
  { rank: 2, name: "Liam O'Connor", team: "P2P", points: 11320, country: "🇮🇪", isUser: false },
  { rank: 3, name: "Aiko Tanaka", team: "Treasury", points: 10940, country: "🇯🇵", isUser: false },
  { rank: 4, name: "Mateus Silva", team: "FP&A", points: 9870, country: "🇧🇷", isUser: false },
  { rank: 5, name: "Priya Sharma", team: "Controlling", points: 9510, country: "🇮🇳", isUser: false },
  { rank: 6, name: "Chen Wei", team: "Tax", points: 8920, country: "🇨🇳", isUser: false },
  { rank: 7, name: "Paco Ramirez", team: "Ops Finance", points: 8450, country: "🇳🇱", isUser: true },
  { rank: 8, name: "Sophie Dubois", team: "FP&A", points: 8120, country: "🇫🇷", isUser: false },
  { rank: 9, name: "Kwame Mensah", team: "Treasury", points: 7890, country: "🇬🇭", isUser: false },
  { rank: 10, name: "Emma Schmidt", team: "Controlling", points: 7650, country: "🇩🇪", isUser: false },
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

export const quizQuestion = {
  index: 3,
  total: 5,
  xpOnCorrect: 15,
  question:
    "Which practice most reduces hallucinations when asking an AI to analyze a monthly P&L?",
  answers: [
    { id: "a", text: "Ask in a very short sentence" },
    { id: "b", text: "Paste the P&L data and ask it to cite only those numbers" },
    { id: "c", text: "Let the AI invent benchmarks from memory" },
    { id: "d", text: "Use as many emojis as possible" },
  ],
  correctId: "b",
  explanation:
    "Grounding the model in the actual data and restricting answers to what you provided is the single biggest lever against hallucinations.",
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
