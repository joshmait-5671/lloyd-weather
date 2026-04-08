export type ArchetypeId =
  | "inner_circle"
  | "operators"
  | "insurgents"
  | "climbers"
  | "intelligentsia"
  | "builders";

export type CardType = "text" | "icon-text" | "image-text";

export interface Archetype {
  id: ArchetypeId;
  name: string;
  tagline: string;
  description: string;
  traits: [string, string, string];
  manifesto: [string, string, string];
  gradient: string;
  emoji: string;
  moodPhoto: string;
}

export interface CityConfig {
  id: string;
  name: string;
  cityPhoto: string;
}

export interface AnswerOption {
  id: string;
  text: string;
  icon?: string;
  image?: string;
}

export interface Question {
  id: string;
  text: string;
  cardType: CardType;
  autoAdvance: boolean;
  options: AnswerOption[];
}

export type Answers = Record<string, string>;

export interface ArchetypeResult {
  archetype: Archetype;
  drink: string;
  spot: string;
  says: string;
}

/* ── Archetypes ──────────────────────────────────────────── */

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  inner_circle: {
    id: "inner_circle",
    name: "INNER CIRCLE",
    tagline: "Where trust is the currency.",
    description:
      "This chapter runs on genuine connection. People show up for each other — not just for the agenda.",
    traits: ["Relationship-first", "Deeply welcoming", "High trust"],
    manifesto: [
      "The relationship IS the strategy.",
      "We remember who showed up.",
      "Trust takes years. We're building it anyway.",
    ],
    gradient: "from-amber-400 via-orange-400 to-rose-400",
    emoji: "🤝",
    moodPhoto:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&auto=format&fit=crop",
  },
  operators: {
    id: "operators",
    name: "OPERATORS",
    tagline: "Execution over everything.",
    description:
      "This chapter is allergic to fluff. Show up with a real problem and leave with a real answer.",
    traits: ["Tactically sharp", "Low ego", "High output"],
    manifesto: [
      "Real problems. Real answers. No theatre.",
      "Good enough ships. Perfect doesn't.",
      "We don't workshop it. We fix it.",
    ],
    gradient: "from-slate-400 via-blue-500 to-indigo-600",
    emoji: "⚙️",
    moodPhoto:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop",
  },
  insurgents: {
    id: "insurgents",
    name: "INSURGENTS",
    tagline: "Say the thing. Mean it.",
    description:
      "This chapter has no patience for performance. The most useful thing you'll hear is the thing nobody else will say.",
    traits: ["Radically direct", "No filter", "High standards"],
    manifesto: [
      "Polished is overrated.",
      "The truth has an edge. Good.",
      "We say the thing nobody else will.",
    ],
    gradient: "from-red-500 via-rose-500 to-pink-500",
    emoji: "⚡",
    moodPhoto:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80&auto=format&fit=crop",
  },
  climbers: {
    id: "climbers",
    name: "CLIMBERS",
    tagline: "Ambition is the entry fee.",
    description:
      "This chapter attracts people who are going somewhere and want to be around others doing the same.",
    traits: ["Relentlessly ambitious", "Competitive edge", "High ceiling"],
    manifesto: [
      "Every room is an opportunity.",
      "Ambition isn't a dirty word here.",
      "We're going somewhere. Join us.",
    ],
    gradient: "from-emerald-400 via-green-500 to-teal-500",
    emoji: "🚀",
    moodPhoto:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80&auto=format&fit=crop",
  },
  intelligentsia: {
    id: "intelligentsia",
    name: "INTELLIGENTSIA",
    tagline: "The sharpest room in the city.",
    description:
      "This chapter raises the bar by asking harder questions. Expect to be challenged. Expect to leave smarter.",
    traits: ["Intellectually rigorous", "High signal", "Discerning"],
    manifesto: [
      "The hardest question in the room is ours.",
      "Frameworks first. Always.",
      "We leave smarter. Every time.",
    ],
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    emoji: "🧠",
    moodPhoto:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop",
  },
  builders: {
    id: "builders",
    name: "BUILDERS",
    tagline: "Playing the long game.",
    description:
      "This chapter invests in people before they need something. The network compounds quietly and pays off big.",
    traits: ["Collaborative", "Thoughtful", "Long-term minded"],
    manifesto: [
      "Ship it. Learn. Ship it better.",
      "We invest before we need something.",
      "The network compounds quietly.",
    ],
    gradient: "from-cyan-400 via-teal-500 to-blue-500",
    emoji: "🏗️",
    moodPhoto:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&auto=format&fit=crop",
  },
};

/* ── Cities ───────────────────────────────────────────────── */

export const CITIES: CityConfig[] = [
  { id: "atlanta", name: "Atlanta", cityPhoto: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=800&q=60&auto=format&fit=crop" },
  { id: "austin", name: "Austin", cityPhoto: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=60&auto=format&fit=crop" },
  { id: "boston", name: "Boston", cityPhoto: "https://images.unsplash.com/photo-1501979376754-f61b3c7a5c58?w=800&q=60&auto=format&fit=crop" },
  { id: "chicago", name: "Chicago", cityPhoto: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=60&auto=format&fit=crop" },
  { id: "dallas", name: "Dallas", cityPhoto: "https://images.unsplash.com/photo-1548254770-8f7a99da8f5b?w=800&q=60&auto=format&fit=crop" },
  { id: "dc", name: "Washington D.C.", cityPhoto: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&q=60&auto=format&fit=crop" },
  { id: "denver", name: "Denver", cityPhoto: "https://images.unsplash.com/photo-1619856699906-09e1f58c98b1?w=800&q=60&auto=format&fit=crop" },
  { id: "la", name: "Los Angeles", cityPhoto: "https://images.unsplash.com/photo-1580655653885-65763b2597d1?w=800&q=60&auto=format&fit=crop" },
  { id: "london", name: "London", cityPhoto: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=60&auto=format&fit=crop" },
  { id: "miami", name: "Miami", cityPhoto: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&q=60&auto=format&fit=crop" },
  { id: "nashville", name: "Nashville", cityPhoto: "https://images.unsplash.com/photo-1545419913-775e3e5f7a3a?w=800&q=60&auto=format&fit=crop" },
  { id: "nyc", name: "New York City", cityPhoto: "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=800&q=60&auto=format&fit=crop" },
  { id: "seattle", name: "Seattle", cityPhoto: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=800&q=60&auto=format&fit=crop" },
  { id: "sf", name: "San Francisco", cityPhoto: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=60&auto=format&fit=crop" },
  { id: "toronto", name: "Toronto", cityPhoto: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800&q=60&auto=format&fit=crop" },
];

/* ── Questions (photo questions at positions 3, 7, 10) ────── */

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "When you show up to this chapter, what do you expect most?",
    cardType: "text",
    autoAdvance: true,
    options: [
      { id: "q1_a", text: "Sharp debate" },
      { id: "q1_b", text: "Practical advice" },
      { id: "q1_c", text: "Warm support" },
      { id: "q1_d", text: "Big ambition" },
      { id: "q1_e", text: "Strong personalities" },
      { id: "q1_f", text: "Easy chemistry" },
    ],
  },
  {
    id: "q2",
    text: "What is this chapter best at?",
    cardType: "text",
    autoAdvance: true,
    options: [
      { id: "q2_a", text: "Making useful intros" },
      { id: "q2_b", text: "Sharing real tactics" },
      { id: "q2_c", text: "Calling bullshit" },
      { id: "q2_d", text: "Welcoming new people" },
      { id: "q2_e", text: "Pushing each other higher" },
      { id: "q2_f", text: "Getting honest fast" },
    ],
  },
  {
    id: "q6",
    text: "What kind of event feels most on brand for this chapter?",
    cardType: "image-text",
    autoAdvance: true,
    options: [
      { id: "q6_a", text: "Private dinner", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop" },
      { id: "q6_b", text: "Tactical workshop", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format&fit=crop" },
      { id: "q6_c", text: "Hard-hitting panel", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop" },
      { id: "q6_d", text: "Casual happy hour", image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=600&q=80&auto=format&fit=crop" },
      { id: "q6_e", text: "Member roundtable", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format&fit=crop" },
      { id: "q6_f", text: "Off the record fireside", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "q3",
    text: "Which best describes the people in this chapter?",
    cardType: "icon-text",
    autoAdvance: true,
    options: [
      { id: "q3_a", text: "Experienced operators", icon: "⚙️" },
      { id: "q3_b", text: "Natural connectors", icon: "🔗" },
      { id: "q3_c", text: "Ambitious climbers", icon: "📈" },
      { id: "q3_d", text: "Thoughtful builders", icon: "🏗️" },
      { id: "q3_e", text: "Big personalities", icon: "⚡" },
      { id: "q3_f", text: "Low ego pros", icon: "🎯" },
    ],
  },
  {
    id: "q4",
    text: "What kind of energy does this chapter have?",
    cardType: "text",
    autoAdvance: true,
    options: [
      { id: "q4_a", text: "Intense" },
      { id: "q4_b", text: "Generous" },
      { id: "q4_c", text: "Polished" },
      { id: "q4_d", text: "Scrappy" },
      { id: "q4_e", text: "Curious" },
      { id: "q4_f", text: "Calm confidence" },
    ],
  },
  {
    id: "q5",
    text: "What makes this chapter different from others?",
    cardType: "icon-text",
    autoAdvance: true,
    options: [
      { id: "q5_a", text: "No fluff", icon: "✂️" },
      { id: "q5_b", text: "Strong local pride", icon: "🏙️" },
      { id: "q5_c", text: "Deep operator bench", icon: "💪" },
      { id: "q5_d", text: "Real relationships", icon: "🤝" },
      { id: "q5_e", text: "Smartest room energy", icon: "🧠" },
      { id: "q5_f", text: "People actually follow up", icon: "✓" },
    ],
  },
  {
    id: "q9",
    text: "If this chapter had a drink, what would it be?",
    cardType: "image-text",
    autoAdvance: true,
    options: [
      { id: "q9_a", text: "Martini", image: "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=600&q=80&auto=format&fit=crop" },
      { id: "q9_b", text: "Whiskey neat", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&q=80&auto=format&fit=crop" },
      { id: "q9_c", text: "Spicy margarita", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=80&auto=format&fit=crop" },
      { id: "q9_d", text: "IPA", image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&q=80&auto=format&fit=crop" },
      { id: "q9_e", text: "Natural wine", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80&auto=format&fit=crop" },
      { id: "q9_f", text: "Black coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "q7",
    text: "What is this chapter secretly proud of?",
    cardType: "icon-text",
    autoAdvance: true,
    options: [
      { id: "q7_a", text: "How smart the people are", icon: "🧠" },
      { id: "q7_b", text: "How welcoming it is", icon: "🤗" },
      { id: "q7_c", text: "How direct people are", icon: "🎯" },
      { id: "q7_d", text: "How strong the network is", icon: "🔗" },
      { id: "q7_e", text: "How ambitious the room feels", icon: "🚀" },
      { id: "q7_f", text: "Conversations continue after the event", icon: "💬" },
    ],
  },
  {
    id: "q8",
    text: "What is this chapter most likely to say?",
    cardType: "text",
    autoAdvance: true,
    options: [
      { id: "q8_a", text: '"Get to the point"' },
      { id: "q8_b", text: '"Who do you need to meet?"' },
      { id: "q8_c", text: '"Sounds good, but will it work?"' },
      { id: "q8_d", text: '"Let\'s make it useful"' },
      { id: "q8_e", text: '"Say the thing you really mean"' },
      { id: "q8_f", text: '"Someone here has solved this"' },
    ],
  },
  {
    id: "q10",
    text: "If this chapter had a default meeting spot, where would it be?",
    cardType: "image-text",
    autoAdvance: false,
    options: [
      { id: "q10_a", text: "Steakhouse private room", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop" },
      { id: "q10_b", text: "Neighborhood bar", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80&auto=format&fit=crop" },
      { id: "q10_c", text: "Hotel lobby", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80&auto=format&fit=crop" },
      { id: "q10_d", text: "Great coffee shop", image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80&auto=format&fit=crop" },
      { id: "q10_e", text: "Someone's office", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop" },
      { id: "q10_f", text: "Dinner party at a member's house", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&auto=format&fit=crop" },
    ],
  },
];

/* ── Answer → archetype score mapping ────────────────────── */

export const ANSWER_SCORES: Record<string, Partial<Record<ArchetypeId, number>>> = {
  q1_a: { insurgents: 1, intelligentsia: 1 },
  q1_b: { operators: 2 },
  q1_c: { inner_circle: 1, builders: 1 },
  q1_d: { climbers: 2 },
  q1_e: { insurgents: 1, climbers: 1 },
  q1_f: { inner_circle: 2 },

  q2_a: { inner_circle: 2 },
  q2_b: { operators: 2 },
  q2_c: { insurgents: 2 },
  q2_d: { inner_circle: 1, builders: 1 },
  q2_e: { climbers: 2 },
  q2_f: { insurgents: 1, intelligentsia: 1 },

  q3_a: { operators: 2 },
  q3_b: { inner_circle: 2 },
  q3_c: { climbers: 2 },
  q3_d: { builders: 2 },
  q3_e: { insurgents: 1, climbers: 1 },
  q3_f: { operators: 1, builders: 1 },

  q4_a: { insurgents: 1, climbers: 1 },
  q4_b: { inner_circle: 2 },
  q4_c: { intelligentsia: 2 },
  q4_d: { operators: 1, builders: 1 },
  q4_e: { intelligentsia: 1, builders: 1 },
  q4_f: { operators: 1, intelligentsia: 1 },

  q5_a: { insurgents: 1, operators: 1 },
  q5_b: { inner_circle: 2 },
  q5_c: { operators: 2 },
  q5_d: { inner_circle: 1, builders: 1 },
  q5_e: { intelligentsia: 2 },
  q5_f: { operators: 1, builders: 1 },

  q6_a: { intelligentsia: 1 },
  q6_b: { operators: 1 },
  q6_c: { insurgents: 1 },
  q6_d: { inner_circle: 1 },
  q6_e: { builders: 1 },
  q6_f: { intelligentsia: 1 },

  q7_a: { intelligentsia: 2 },
  q7_b: { inner_circle: 2 },
  q7_c: { insurgents: 2 },
  q7_d: { inner_circle: 1, builders: 1 },
  q7_e: { climbers: 2 },
  q7_f: { builders: 1, inner_circle: 1 },

  q8_a: { insurgents: 3 },
  q8_b: { inner_circle: 3 },
  q8_c: { intelligentsia: 2, operators: 1 },
  q8_d: { operators: 2, builders: 1 },
  q8_e: { insurgents: 2, intelligentsia: 1 },
  q8_f: { operators: 2, builders: 1 },

  q9_a: { intelligentsia: 1 },
  q9_b: { insurgents: 1 },
  q9_c: { climbers: 1 },
  q9_d: { builders: 1 },
  q9_e: { inner_circle: 1 },
  q9_f: { operators: 1 },

  q10_a: { intelligentsia: 1 },
  q10_b: { insurgents: 1 },
  q10_c: { climbers: 1 },
  q10_d: { builders: 1 },
  q10_e: { operators: 1 },
  q10_f: { inner_circle: 1 },
};

/* ── Flavor text lookups ─────────────────────────────────── */

export const DRINK_LABELS: Record<string, string> = {
  q9_a: "🍸 Martini",
  q9_b: "🥃 Whiskey neat",
  q9_c: "🌶️ Spicy margarita",
  q9_d: "🍺 IPA",
  q9_e: "🍷 Natural wine",
  q9_f: "☕ Black coffee",
};

export const SPOT_LABELS: Record<string, string> = {
  q10_a: "Steakhouse private room",
  q10_b: "Neighborhood bar",
  q10_c: "Hotel lobby",
  q10_d: "Great coffee shop",
  q10_e: "Someone's office",
  q10_f: "Dinner party at a member's house",
};

export const SAY_LABELS: Record<string, string> = {
  q8_a: '"Get to the point"',
  q8_b: '"Who do you need to meet?"',
  q8_c: '"Sounds good, but will it work?"',
  q8_d: '"Let\'s make it useful"',
  q8_e: '"Say the thing you really mean"',
  q8_f: '"Someone here has solved this"',
};

/* ── Scoring function ────────────────────────────────────── */

export function calculateArchetype(answers: Answers): ArchetypeResult {
  const scores: Record<ArchetypeId, number> = {
    inner_circle: 0,
    operators: 0,
    insurgents: 0,
    climbers: 0,
    intelligentsia: 0,
    builders: 0,
  };

  for (const answerId of Object.values(answers)) {
    const pts = ANSWER_SCORES[answerId];
    if (!pts) continue;
    for (const [id, points] of Object.entries(pts)) {
      scores[id as ArchetypeId] += points;
    }
  }

  const winnerId = Object.entries(scores).sort(
    ([, a]: [string, number], [, b]: [string, number]) => b - a
  )[0][0] as ArchetypeId;

  return {
    archetype: ARCHETYPES[winnerId],
    drink: DRINK_LABELS[answers.q9] ?? "",
    spot: SPOT_LABELS[answers.q10] ?? "",
    says: SAY_LABELS[answers.q8] ?? "",
  };
}
