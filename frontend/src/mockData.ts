export const user = {
  name: "Jürgen Esser",
  firstName: "Danoner",
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
  rank: 1,
  powerUps: { skip: 2, retry: 3, hint: 1 },
};

/* ---------- DAILY TIP (home + notifications) ---------- */
export const dailyTip = {
  id: "tip-prompt-anchoring",
  date: "Today",
  category: "Prompt Craft",
  title: "Anchor your prompts with one example",
  body:
    "Adding a single worked example before your real request typically lifts answer quality by 30–40%. Show the model the format you expect.",
  cta: "See the Learn module",
};

/* ---------- NOTIFICATIONS ---------- */
export const notifications = [
  {
    id: "n1",
    icon: "trophy" as const,
    title: "You climbed 2 spots this week",
    body: "Now ranked #7 in the Weekly league.",
    unread: true,
    time: "2h ago",
  },
  {
    id: "n2",
    icon: "bulb" as const,
    title: "New daily tip is live",
    body: "Anchor your prompts with one example.",
    unread: true,
    time: "4h ago",
  },
  {
    id: "n3",
    icon: "flash" as const,
    title: "Don't break your streak!",
    body: "1 mission left to keep your 14-day streak.",
    unread: false,
    time: "1d ago",
  },
];

/* ---------- MISSIONS (renamed: Your AI Missions) ---------- */
export const missions = [
  { id: "m1", title: "Complete today's lesson", xp: 30, done: true, icon: "book-outline", cadence: "Daily" },
  { id: "m2", title: "Win a 5-question quiz", xp: 25, done: true, icon: "trophy-outline", cadence: "Daily" },
  { id: "m3", title: "Beat your best score", xp: 20, done: false, icon: "flash-outline", cadence: "Weekly" },
  { id: "m4", title: "Share an AI use case", xp: 45, done: false, icon: "bulb-outline", impact: true, cadence: "Monthly" },
];

export const continueLearning = {
  title: "Prompt Engineering for FP&A",
  module: "Module 3 of 5",
  progress: 0.62,
  duration: "8 min",
  xpReward: 40,
};

/* ---------- BADGES (knowledge + rare only — social moved out) ---------- */
export const badgePreview = [
  { id: "b1", name: "AI Expert", tier: "expert", icon: "ribbon", unlocked: true },
  { id: "b2", name: "Speed Master", tier: "rare", icon: "flash", unlocked: true },
  { id: "b3", name: "7-Day Streak", tier: "rare", icon: "flame", unlocked: true },
  { id: "b4", name: "AI Mentor", tier: "mentor", icon: "school", unlocked: false },
];

export const badges = [
  // Knowledge tiers
  { id: "k1", name: "AI Explorer", tier: "explorer", level: "L1–L5", unlocked: true, icon: "compass", criteria: "Reach Learning Level 5" },
  { id: "k2", name: "AI Challenger", tier: "challenger", level: "L6–L15", unlocked: true, icon: "flash", criteria: "Reach Learning Level 15" },
  { id: "k3", name: "AI Expert", tier: "expert", level: "L16–L30", unlocked: true, icon: "ribbon", criteria: "Reach Learning Level 30" },
  { id: "k4", name: "AI Mentor", tier: "mentor", level: "L31–L50", unlocked: false, icon: "school", criteria: "Reach Learning Level 50 + mentor 3 peers" },
  // Rare
  { id: "r1", name: "Speed Master", tier: "rare", level: "Rare", unlocked: true, icon: "timer", criteria: "Finish a quiz under 60s with 100% score" },
  { id: "r2", name: "Consistency", tier: "rare", level: "Rare", unlocked: true, icon: "flame", criteria: "Keep a 14-day streak" },
  { id: "r3", name: "AI Pioneer", tier: "rare", level: "Rare", unlocked: false, icon: "rocket", criteria: "Submit 5 AI use cases adopted by your team" },
];

/* ---------- SOCIAL & EVENTS (own section) ---------- */
export const socialItems = [
  { id: "s1", name: "Helping Hand", level: "Social", unlocked: true, icon: "people", criteria: "Answer 10 peer questions", color: "#3EDCFF" },
  { id: "s2", name: "Top Contributor", level: "Social", unlocked: false, icon: "megaphone", criteria: "Most-upvoted prompt of the month", color: "#3EDCFF" },
  { id: "e1", name: "Team Challenge", level: "Event", unlocked: true, icon: "flag", criteria: "Win a team challenge", color: "#9C6BFF" },
  { id: "e2", name: "Winter Sprint", level: "Seasonal", unlocked: false, icon: "snow", criteria: "Top 50 during the Winter Sprint", color: "#9C6BFF" },
];

/* ---------- PERSONAS (generic, non-FP&A specific) ---------- */
type Row = { rank: number; name: string; team: string; points: number; country: string; isUser: boolean };

const persona = (name: string, team: string, country: string): Omit<Row, "rank" | "points" | "isUser"> => ({ name, team, country });

const ALL = [
  persona("Sarah Mitchell", "Marketing Ops", "🇬🇧"),
  persona("James Patterson", "Supply Chain", "🇺🇸"),
  persona("Maria Garcia", "HR Analytics", "🇪🇸"),
  persona("Wei Chen", "R&D", "🇸🇬"),
  persona("Sophie Laurent", "Strategy", "🇫🇷"),
  persona("Alex Johnson", "Customer Success", "🇨🇦"),
  persona("Priya Nair", "Product", "🇮🇳"),
  persona("Marco Rossi", "Sales", "🇮🇹"),
  persona("Anna Kowalski", "IT", "🇵🇱"),
  persona("David Kim", "Legal", "🇰🇷"),
  persona("Lucas Almeida", "Procurement", "🇧🇷"),
  persona("Emma Berg", "Comms", "🇸🇪"),
];

const USER_ROW = (rank: number, points: number): Row => ({
  rank,
  name: "Jürgen Esser",
  team: "Deputy CEO · Fin/Tech",
  country: "🇫🇷",
  points,
  isUser: true,
});

const build = (
  picks: number[],
  weights: number[],
  userRank: number,
  userPoints: number
): Row[] => {
  const rows: Row[] = picks.map((idx, i) => ({
    rank: 0,
    name: ALL[idx].name,
    team: ALL[idx].team,
    country: ALL[idx].country,
    points: weights[i],
    isUser: false,
  }));
  rows.push(USER_ROW(0, userPoints));
  rows.sort((a, b) => b.points - a.points);
  rows.forEach((r, i) => (r.rank = i + 1));
  // ensure user lands at the requested rank when close
  return rows;
};

/* Pre-built leaderboards: audience × time (mocked but distinctly different) */
export const leaderboards: Record<string, Row[]> = {
  // ----- WEEKLY -----
  "Personal·Weekly": [
    // "Personal" = your own week-over-week trajectory (last 5 weeks vs current)
    // shown as a virtual ranking against your own past selves
    { rank: 1, name: "You · this week", team: "Best run yet", country: "📈", points: 8450, isUser: true },
    { rank: 2, name: "You · 1 week ago", team: "Prev week", country: "—", points: 7800, isUser: false },
    { rank: 3, name: "You · 2 weeks ago", team: "Prev week", country: "—", points: 7200, isUser: false },
    { rank: 4, name: "You · 3 weeks ago", team: "Prev week", country: "—", points: 6800, isUser: false },
    { rank: 5, name: "You · 4 weeks ago", team: "Prev week", country: "—", points: 6100, isUser: false },
  ],
  "Team·Weekly": build([1, 5, 6, 7, 9], [9620, 9180, 8990, 8210, 7430], 1, 10250),
  "Country·Weekly": build([4, 11, 0, 8, 3], [12480, 11320, 10940, 9870, 9510], 1, 13420)
    .concat([
      { rank: 7, name: "Camille Petit", team: "Brand", country: "🇫🇷", points: 8120, isUser: false },
      { rank: 8, name: "Hugo Bernard", team: "Trade", country: "🇫🇷", points: 7890, isUser: false },
      { rank: 9, name: "Léa Moreau", team: "Logistics", country: "🇫🇷", points: 7650, isUser: false },
    ])
    .sort((a, b) => b.points - a.points)
    .map((r, i) => ({ ...r, rank: i + 1 })),
  "Zone·Weekly": build([0, 1, 3, 4, 5, 7, 10], [13210, 11500, 10840, 10120, 9520, 9180, 8730], 1, 14180),

  // ----- MONTHLY -----
  "Personal·Monthly": [
    { rank: 1, name: "You · this month", team: "Personal best", country: "🚀", points: 32450, isUser: true },
    { rank: 2, name: "You · last month", team: "Prev month", country: "—", points: 28100, isUser: false },
    { rank: 3, name: "You · 2 months ago", team: "Prev month", country: "—", points: 24600, isUser: false },
  ],
  "Team·Monthly": build([5, 1, 7, 9, 6], [38120, 35640, 34280, 31900, 30540], 1, 40250),
  "Country·Monthly": build([11, 4, 0, 8, 3], [42180, 40120, 38640, 36200, 34800], 1, 44120),
  "Zone·Monthly": build([0, 11, 1, 4, 5, 7, 3], [52340, 48910, 46220, 44120, 41600, 39880, 37920], 1, 54480),

  // ----- ALL-TIME -----
  "Personal·All-time": [
    { rank: 1, name: "You · lifetime", team: "Career total", country: "🏆", points: 184500, isUser: true },
  ],
  "Team·All-time": build([1, 5, 7, 6, 9], [212400, 198600, 184500, 167200, 152800], 1, 224800),
  "Country·All-time": build([11, 4, 0, 8, 3], [245800, 228400, 212400, 198600, 184500], 1, 252000),
  "Zone·All-time": build([0, 1, 11, 4, 5, 7, 10], [312500, 285400, 268700, 248200, 232400, 218600, 198500], 1, 322000),
};

// Used by Home mini-leaderboard (a snapshot — "Country / Weekly" Top 5)
export const miniLeaderboard = leaderboards["Country·Weekly"]
  .slice(0, 5)
  .map((r) => ({ ...r, avatar: ["👩‍💼", "👨‍💼", "🧑‍💼", "👩‍🎓", "🧑‍💻"][r.rank - 1] || "🧑" }));

/* ---------- LEARN CONTENT (lesson 1 + lesson 2) ---------- */
export const lessonContent = {
  title: "Prompt Engineering for FP&A",
  module: "Module 3 of 5",
  progress: 0.6,
  totalCards: 5,
  xpReward: 40,
  series: "AI Foundations",
  tip:
    "Great prompts are specific, give context and define the output format — just like a good brief!",
  // Value-saving framing replicated here too
  timeSaved:
    "Mastering prompt basics typically cuts your AI iteration time by 50% — fewer back-and-forths, sharper answers from the first try.",
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
    { id: "challenge", label: "The Challenge", body: "Monthly variance analysis for a large P&L can take 2–3 days: reviewing actuals vs. budget, identifying material variances, investigating root causes, and writing commentary for leadership." },
    { id: "solution", label: "AI Solution", body: "Use AI to analyze variance data, identify patterns across dimensions (product, region, period), and generate draft explanations that you can validate and refine." },
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

/* ---------- QUIZ ---------- */
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

/* ---------- REWARDS (rebalanced + realistic) ---------- */
export const rewards = [
  {
    id: "rw1",
    name: "Cinema ticket",
    desc: "Voucher for any major cinema chain",
    cost: 900,
    kind: "xp",
    icon: "film",
  },
  {
    id: "rw2",
    name: "Curated learning bundle",
    desc: "Hand-picked AI + Finance course (~10h)",
    cost: 1500,
    kind: "xp",
    icon: "library",
  },
  {
    id: "rw3",
    name: "Coffee with a Finance Board member",
    desc: "Informal 30-min coffee, calendar match",
    cost: 2200,
    kind: "impact",
    icon: "cafe",
  },
  {
    id: "rw4",
    name: "1:1 with an AI Champion",
    desc: "45-min inspirational session on your real use case",
    cost: 3000,
    kind: "impact",
    icon: "sparkles",
  },
  {
    id: "rw5",
    name: "AI Conference Seat",
    desc: "All-expenses trip to the global AI Finance Summit",
    cost: 9000,
    kind: "impact",
    icon: "trophy",
    top: true,
  },
];

/* ---------- LEAGUE FILTER STRUCTURE ---------- */
export const audienceTabs = ["Personal", "Team", "Country", "Zone"] as const;
export const timeTabs = ["Weekly", "Monthly", "All-time"] as const;

export const audienceHints: Record<(typeof audienceTabs)[number], string> = {
  Personal: "Your own progress over time",
  Team: "Compare with your direct team",
  Country: "Top players in your country",
  Zone: "Top players across your regional zone (EMEA)",
};
