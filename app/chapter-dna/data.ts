export type Archetype = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  emoji: string;
  traits: string[];
};

export type CityConfig = {
  key: string;
  name: string;
  shortName: string;
  gradient: string;
  emoji: string;
  tagline: string;
};

export type QuizOption = {
  label: string;
  visual?: { gradient: string; icon: string };
  scores: Record<string, number>;
};

export type Question = {
  id: number;
  type: "text" | "visual";
  question: string;
  options: QuizOption[];
};

/* ── Archetypes ──────────────────────────────────────────── */

export const ARCHETYPES: Record<string, Archetype> = {
  "storm-chaser": {
    id: "storm-chaser",
    name: "The Storm Chaser",
    tagline: "You don't check the weather. You hunt it.",
    description:
      "While everyone else runs inside, you're on the porch watching the sky turn green. You live for the drama — the radar, the models, the moment a line of thunderstorms lights up your screen. Your group chat has seen your radar screenshots at 2am. You don't experience weather. You are weather.",
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    emoji: "⛈️",
    traits: [
      "Radar obsessed",
      "First to alert the group",
      "Knows the models by name",
      "Lives for storm season",
    ],
  },
  "beach-oracle": {
    id: "beach-oracle",
    name: "The Beach Oracle",
    tagline: "Tide, wind, UV — you know it all before anyone asks.",
    description:
      "You can feel a good beach day coming three days out. You know the wind patterns, you track the water temp, and your beach bag is packed by Thursday night. Summer isn't a season for you — it's a religion. And your towel placement is an art form.",
    gradient: "from-amber-300 via-orange-400 to-rose-400",
    emoji: "🏖️",
    traits: [
      "Packed by Thursday",
      "Knows every beach",
      "Tracks water temps",
      "Summer is life",
    ],
  },
  "powder-prophet": {
    id: "powder-prophet",
    name: "The Powder Prophet",
    tagline: "You've refreshed the snow totals 47 times today.",
    description:
      "When the models show a nor'easter, your heart rate doubles. You've got the mountain cams bookmarked, the elevation data memorized, and your gear is ready by the door. Everyone else sees snow as an inconvenience. You see it as the whole damn point.",
    gradient: "from-cyan-300 via-sky-400 to-blue-500",
    emoji: "🎿",
    traits: [
      "Elevation nerd",
      "Owns 3 ski jackets",
      "Checks cams daily",
      "Nor'easter = holiday",
    ],
  },
  "weekend-warrior": {
    id: "weekend-warrior",
    name: "The Weekend Warrior",
    tagline: "You plan life in 48-hour windows.",
    description:
      "You don't need perfect weather. You need weekend weather. Every Tuesday you're scanning the 5-day, and by Wednesday you're making plans. Brunch, the park, the rooftop, the cookout — you are the social architect, and weather is your blueprint.",
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    emoji: "🎉",
    traits: [
      "Tuesday = forecast day",
      "Social architect",
      "Backup plans on lock",
      "Lives for the weekend",
    ],
  },
  "sky-reader": {
    id: "sky-reader",
    name: "The Sky Reader",
    tagline: "You see weather where others just see sky.",
    description:
      "You're the one who stops mid-sentence to say \"look at that sky.\" Sunsets stop you cold. Fog feels like poetry. You don't just check weather — you feel it in your bones. Your camera roll is 40% clouds and you're not even a little sorry.",
    gradient: "from-pink-400 via-rose-400 to-purple-500",
    emoji: "🌅",
    traits: [
      "Sunset chaser",
      "Camera roll = clouds",
      "Feels the weather",
      "Poetry in every storm",
    ],
  },
  "all-weather-alpha": {
    id: "all-weather-alpha",
    name: "The All-Weather Alpha",
    tagline: "Rain, snow, heat — you don't cancel plans.",
    description:
      "Weather doesn't happen to you. You happen to weather. You run in the rain, grill in the snow, and your only jacket is a light hoodie. While everyone else asks \"should we cancel?\" you've already left the house.",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    emoji: "💪",
    traits: [
      "Unstoppable",
      "One jacket year-round",
      "Grills in any weather",
      "Fear is not a forecast",
    ],
  },
};

/* ── Cities ───────────────────────────────────────────────── */

export const CITIES: CityConfig[] = [
  {
    key: "nyc",
    name: "New York City",
    shortName: "NYC",
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    emoji: "🏙️",
    tagline: "The city that never sleeps on a forecast",
  },
  {
    key: "westchester",
    name: "Westchester",
    shortName: "WSTCHSTR",
    gradient: "from-emerald-600 via-green-700 to-emerald-800",
    emoji: "🌳",
    tagline: "Where the suburbs meet the storm",
  },
  {
    key: "montauk",
    name: "Montauk",
    shortName: "MTK",
    gradient: "from-blue-500 via-cyan-600 to-teal-700",
    emoji: "🌊",
    tagline: "The end of the island, start of the waves",
  },
  {
    key: "hamptons",
    name: "The Hamptons",
    shortName: "HMPTONS",
    gradient: "from-amber-400 via-yellow-400 to-amber-500",
    emoji: "✨",
    tagline: "Where every weekend is a weather event",
  },
  {
    key: "long-island",
    name: "Long Island",
    shortName: "LI",
    gradient: "from-orange-400 via-rose-500 to-pink-600",
    emoji: "🌅",
    tagline: "Sunrises and nor'easters since forever",
  },
  {
    key: "north-jersey",
    name: "North Jersey",
    shortName: "NJ",
    gradient: "from-slate-500 via-blue-600 to-indigo-700",
    emoji: "🏗️",
    tagline: "Tougher than any winter",
  },
  {
    key: "fairfield",
    name: "Fairfield",
    shortName: "FRFLD",
    gradient: "from-red-500 via-orange-600 to-amber-600",
    emoji: "🍂",
    tagline: "New England charm, unpredictable skies",
  },
  {
    key: "windham",
    name: "Windham",
    shortName: "WNDHM",
    gradient: "from-green-600 via-emerald-700 to-teal-700",
    emoji: "⛰️",
    tagline: "Where the fog rolls in and stays",
  },
  {
    key: "hunter-mountain",
    name: "Hunter Mountain",
    shortName: "HUNTER",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    emoji: "🎿",
    tagline: "Powder days are holy days",
  },
];

/* ── Questions (alternating text / visual) ────────────────── */

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "text",
    question: "Saturday forecast says rain all day. What's your move?",
    options: [
      {
        label: "Check three more apps — I don't trust one source",
        scores: { "storm-chaser": 2, "powder-prophet": 1 },
      },
      {
        label: "Finally, a guilt-free cozy day",
        scores: { "sky-reader": 2 },
      },
      {
        label: "Doesn't matter. I'm going.",
        scores: { "all-weather-alpha": 2 },
      },
      {
        label: "Pivot the plans to something indoor-friendly",
        scores: { "weekend-warrior": 2 },
      },
    ],
  },
  {
    id: 2,
    type: "visual",
    question: "Pick the sky that speaks to you.",
    options: [
      {
        label: "Electric Storm",
        visual: {
          gradient: "from-slate-800 via-purple-900 to-indigo-900",
          icon: "⚡",
        },
        scores: { "storm-chaser": 2 },
      },
      {
        label: "Perfect Blue",
        visual: {
          gradient: "from-sky-300 via-blue-400 to-cyan-300",
          icon: "☀️",
        },
        scores: { "beach-oracle": 2 },
      },
      {
        label: "Fresh Powder",
        visual: {
          gradient: "from-blue-50 via-blue-100 to-sky-200",
          icon: "❄️",
        },
        scores: { "powder-prophet": 2 },
      },
      {
        label: "Golden Hour",
        visual: {
          gradient: "from-orange-300 via-rose-400 to-purple-500",
          icon: "🌇",
        },
        scores: { "sky-reader": 2 },
      },
    ],
  },
  {
    id: 3,
    type: "text",
    question: "First truly warm day of spring. Where are you?",
    options: [
      {
        label: "Beach. Towel down by 9am.",
        scores: { "beach-oracle": 2, "weekend-warrior": 1 },
      },
      {
        label: "Outside immediately — run, bike, anything",
        scores: { "all-weather-alpha": 2 },
      },
      {
        label: "Checking if the warmth holds through the weekend",
        scores: { "weekend-warrior": 2 },
      },
      {
        label: "On the porch, watching the clouds change",
        scores: { "sky-reader": 2, "storm-chaser": 1 },
      },
    ],
  },
  {
    id: 4,
    type: "visual",
    question: "Which weather event gets your heart racing?",
    options: [
      {
        label: "Blizzard Warning",
        visual: {
          gradient: "from-blue-200 via-slate-300 to-gray-400",
          icon: "🌨️",
        },
        scores: { "powder-prophet": 2, "storm-chaser": 1 },
      },
      {
        label: "Heat Wave",
        visual: {
          gradient: "from-amber-300 via-orange-400 to-red-400",
          icon: "🔥",
        },
        scores: { "beach-oracle": 2 },
      },
      {
        label: "Supercell Incoming",
        visual: {
          gradient: "from-green-900 via-slate-700 to-amber-900",
          icon: "🌪️",
        },
        scores: { "storm-chaser": 2 },
      },
      {
        label: "Crisp Fall Morning",
        visual: {
          gradient: "from-amber-200 via-orange-300 to-red-300",
          icon: "🍂",
        },
        scores: { "sky-reader": 2, "weekend-warrior": 1 },
      },
    ],
  },
  {
    id: 5,
    type: "text",
    question: "Your friend texts: \"did you see the forecast?\" You reply...",
    options: [
      {
        label: "\"Which model? The Euro disagrees with the GFS.\"",
        scores: { "storm-chaser": 2 },
      },
      {
        label: "\"Is the weekend still looking good?\"",
        scores: { "weekend-warrior": 2 },
      },
      {
        label: "\"How much snow are we talking?\"",
        scores: { "powder-prophet": 2 },
      },
      {
        label: "\"I know — that sunset tonight is going to be insane\"",
        scores: { "sky-reader": 2 },
      },
    ],
  },
  {
    id: 6,
    type: "visual",
    question: "Pick your ideal weekend scene.",
    options: [
      {
        label: "Rooftop Hangs",
        visual: {
          gradient: "from-sky-400 via-blue-500 to-indigo-400",
          icon: "🥂",
        },
        scores: { "weekend-warrior": 2 },
      },
      {
        label: "Mountain Summit",
        visual: {
          gradient: "from-blue-50 via-sky-200 to-blue-400",
          icon: "⛷️",
        },
        scores: { "powder-prophet": 2 },
      },
      {
        label: "Beach Bonfire",
        visual: {
          gradient: "from-orange-500 via-amber-500 to-rose-400",
          icon: "🔥",
        },
        scores: { "beach-oracle": 2, "all-weather-alpha": 1 },
      },
      {
        label: "Storm Watching",
        visual: {
          gradient: "from-slate-600 via-purple-800 to-slate-900",
          icon: "⛈️",
        },
        scores: { "storm-chaser": 2, "sky-reader": 1 },
      },
    ],
  },
  {
    id: 7,
    type: "text",
    question: "How many weather apps are on your phone?",
    options: [
      {
        label: "Zero. I look outside like a normal person.",
        scores: { "all-weather-alpha": 2 },
      },
      {
        label: "One — and I only check it before weekend plans",
        scores: { "weekend-warrior": 2 },
      },
      {
        label: "Two or three. Gotta cross-reference.",
        scores: { "powder-prophet": 2, "beach-oracle": 1 },
      },
      {
        label: "Four plus, and I've got radar bookmarked",
        scores: { "storm-chaser": 2 },
      },
    ],
  },
  {
    id: 8,
    type: "visual",
    question: "If you could have one weather superpower?",
    options: [
      {
        label: "Control the Wind",
        visual: {
          gradient: "from-teal-400 via-cyan-500 to-blue-600",
          icon: "💨",
        },
        scores: { "all-weather-alpha": 2, "beach-oracle": 1 },
      },
      {
        label: "Predict Any Storm",
        visual: {
          gradient: "from-purple-500 via-indigo-600 to-violet-800",
          icon: "🔮",
        },
        scores: { "storm-chaser": 2 },
      },
      {
        label: "Summon Perfect Sun",
        visual: {
          gradient: "from-yellow-300 via-amber-400 to-orange-300",
          icon: "☀️",
        },
        scores: { "weekend-warrior": 2, "beach-oracle": 1 },
      },
      {
        label: "Make It Snow on Command",
        visual: {
          gradient: "from-blue-100 via-indigo-200 to-purple-300",
          icon: "❄️",
        },
        scores: { "powder-prophet": 2 },
      },
    ],
  },
];
