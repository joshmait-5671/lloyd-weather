"use client";

import { useState, useEffect } from "react";
import {
  ARCHETYPES,
  CITIES,
  QUESTIONS,
  type Archetype,
  type CityConfig,
  type Question,
} from "./data";

type Stage = "city" | "quiz" | "result";

/* ── Main Component ──────────────────────────────────────── */

export default function ChapterDNA() {
  const [stage, setStage] = useState<Stage>("city");
  const [selectedCity, setSelectedCity] = useState<CityConfig | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Archetype | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle shared result URLs (?r=storm-chaser&c=westchester)
  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const resultId = params.get("r");
    const cityKey = params.get("c");
    if (resultId && ARCHETYPES[resultId]) {
      setResult(ARCHETYPES[resultId]);
      if (cityKey) {
        const city = CITIES.find((c) => c.key === cityKey);
        if (city) setSelectedCity(city);
      }
      setStage("result");
    }
  }, []);

  const selectCity = (city: CityConfig) => {
    setSelectedCity(city);
    setTransitioning(true);
    setTimeout(() => {
      setStage("quiz");
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 400);
  };

  const answerQuestion = (optionScores: Record<string, number>) => {
    const newScores = { ...scores };
    for (const [archetype, points] of Object.entries(optionScores)) {
      newScores[archetype] = (newScores[archetype] || 0) + points;
    }
    setScores(newScores);

    if (currentQuestion < QUESTIONS.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev: number) => prev + 1);
        setTransitioning(false);
      }, 300);
    } else {
      const sorted = Object.entries(newScores).sort(
        (a: [string, number], b: [string, number]) => b[1] - a[1]
      );
      const winnerId = sorted[0]?.[0] || "storm-chaser";
      const archetype = ARCHETYPES[winnerId];
      setResult(archetype);
      setTransitioning(true);
      setTimeout(() => {
        setStage("result");
        setTransitioning(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(
          {},
          "",
          `/chapter-dna?r=${archetype.id}&c=${selectedCity?.key || ""}`
        );
      }, 600);
    }
  };

  const restart = () => {
    setStage("city");
    setSelectedCity(null);
    setCurrentQuestion(0);
    setScores({});
    setResult(null);
    window.history.replaceState({}, "", "/chapter-dna");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getShareUrl = () =>
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}/chapter-dna?r=${result?.id}&c=${selectedCity?.key || ""}`;

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`,
      "_blank",
      "width=600,height=600"
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
      "_blank",
      "width=600,height=600"
    );
  };

  const copyForInstagram = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-slate-900" />;
  }

  return (
    <div
      className={`transition-opacity duration-400 ${
        transitioning && stage !== "quiz" ? "opacity-0" : "opacity-100"
      }`}
    >
      {stage === "city" && (
        <CitySelection cities={CITIES} onSelect={selectCity} />
      )}
      {stage === "quiz" && (
        <QuizFlow
          question={QUESTIONS[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={QUESTIONS.length}
          cityName={selectedCity?.name || ""}
          transitioning={transitioning}
          onAnswer={answerQuestion}
          onRestart={restart}
        />
      )}
      {stage === "result" && result && (
        <ResultReveal
          archetype={result}
          city={selectedCity}
          onShareLinkedIn={shareToLinkedIn}
          onShareFacebook={shareToFacebook}
          onShareInstagram={copyForInstagram}
          onRestart={restart}
          copied={copied}
        />
      )}
    </div>
  );
}

/* ── City Selection ──────────────────────────────────────── */

function CitySelection({
  cities,
  onSelect,
}: {
  cities: CityConfig[];
  onSelect: (city: CityConfig) => void;
}) {
  return (
    <section className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Giant ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[18vw] font-black text-white/[0.03] tracking-tighter whitespace-nowrap">
          CHAPTER DNA
        </span>
      </div>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-[0.25em] mb-4 animate-fade-in-up">
            Chapter DNA
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-5 animate-fade-in-up [animation-delay:100ms]">
            You already know what kind
            <br className="hidden sm:block" /> of weather person you are.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 font-medium animate-fade-in-up [animation-delay:200ms]">
            We&apos;re just making it official. Pick your city.
          </p>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {cities.map((city, i) => (
            <button
              key={city.key}
              onClick={() => onSelect(city)}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${city.gradient} p-5 sm:p-6 md:p-8 text-left min-h-[160px] sm:min-h-[180px] md:min-h-[200px] hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 animate-fade-in-up cursor-pointer`}
              style={{ animationDelay: `${300 + i * 70}ms` }}
            >
              {/* Pattern overlay */}
              <div
                className="absolute inset-0 opacity-10 rounded-2xl"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Big emoji */}
              <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-4xl sm:text-5xl md:text-6xl opacity-25 group-hover:opacity-50 group-hover:scale-110 transition-all duration-300">
                {city.emoji}
              </span>

              {/* Content pinned to bottom */}
              <div className="relative z-10 flex flex-col justify-end h-full">
                <p className="text-white/30 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-1">
                  {city.shortName}
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 group-hover:translate-x-1 transition-transform duration-300">
                  {city.name}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm font-medium">
                  {city.tagline}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <span className="text-white/60 text-xl sm:text-2xl font-light">
                  &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-slate-600 text-xs sm:text-sm mt-8 md:mt-12 animate-fade-in-up [animation-delay:900ms]">
          8 questions. 60 seconds. One weather personality.
        </p>
      </div>
    </section>
  );
}

/* ── Quiz Flow ───────────────────────────────────────────── */

function QuizFlow({
  question,
  questionNumber,
  totalQuestions,
  cityName,
  transitioning,
  onAnswer,
  onRestart,
}: {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  cityName: string;
  transitioning: boolean;
  onAnswer: (scores: Record<string, number>) => void;
  onRestart: () => void;
}) {
  return (
    <section className="min-h-screen bg-slate-50 flex flex-col">
      {/* Progress bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sm:py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm font-bold text-slate-500">
              {questionNumber} of {totalQuestions}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-xs sm:text-sm text-slate-400">{cityName}</p>
              <button
                onClick={onRestart}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                Start over
              </button>
            </div>
          </div>
          <div className="h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(questionNumber / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div
          className={`max-w-2xl w-full transition-all duration-300 ${
            transitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 text-center mb-6 sm:mb-8 px-2">
            {question.question}
          </h2>

          {question.type === "text" ? (
            <div className="space-y-2.5 sm:space-y-3">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => onAnswer(opt.scores)}
                  className="w-full text-left bg-white rounded-xl px-5 sm:px-6 py-3.5 sm:py-4 border-2 border-slate-200 hover:border-sky-400 hover:shadow-md hover:bg-sky-50/50 transition-all text-sm sm:text-base md:text-lg font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => onAnswer(opt.scores)}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${
                    opt.visual?.gradient || ""
                  } min-h-[140px] sm:min-h-[170px] md:min-h-[200px] flex flex-col items-center justify-center gap-1 sm:gap-2 hover:scale-[1.03] hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-white/40 cursor-pointer`}
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl drop-shadow-md">
                    {opt.visual?.icon}
                  </span>
                  <span className="text-white font-bold text-xs sm:text-sm md:text-base drop-shadow-md">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Result Reveal ───────────────────────────────────────── */

function ResultReveal({
  archetype,
  city,
  onShareLinkedIn,
  onShareFacebook,
  onShareInstagram,
  onRestart,
  copied,
}: {
  archetype: Archetype;
  city: CityConfig | null;
  onShareLinkedIn: () => void;
  onShareFacebook: () => void;
  onShareInstagram: () => void;
  onRestart: () => void;
  copied: boolean;
}) {
  return (
    <section
      className={`min-h-screen bg-gradient-to-br ${archetype.gradient} relative overflow-hidden`}
    >
      {/* Floating celebration emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-3xl sm:text-4xl md:text-5xl opacity-[0.08] animate-float"
            style={{
              left: `${5 + i * 10}%`,
              top: `${10 + (i % 4) * 22}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3) * 1.5}s`,
            }}
          >
            {archetype.emoji}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 sm:py-12 md:py-16">
        {/* Reveal header */}
        <div className="text-center">
          <p className="text-white/50 font-bold text-xs sm:text-sm uppercase tracking-[0.25em] mb-4 animate-fade-in-up">
            Your Chapter DNA
          </p>
          <span className="text-6xl sm:text-7xl md:text-8xl block mb-3 animate-scale-in">
            {archetype.emoji}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-3 animate-fade-in-up [animation-delay:200ms]">
            {archetype.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 italic font-medium mb-8 sm:mb-10 animate-fade-in-up [animation-delay:300ms]">
            &ldquo;{archetype.tagline}&rdquo;
          </p>
        </div>

        {/* Description */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 mb-8 text-left animate-fade-in-up [animation-delay:400ms]">
          <p className="text-white/90 text-base sm:text-lg leading-relaxed">
            {archetype.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {archetype.traits.map((trait) => (
              <span
                key={trait}
                className="bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Social Card */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl mb-8 animate-fade-in-up [animation-delay:500ms]">
          <div
            className={`bg-gradient-to-br ${archetype.gradient} rounded-xl p-6 sm:p-8 md:p-10 text-center`}
          >
            <p className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3">
              My Chapter DNA
            </p>
            <span className="text-4xl sm:text-5xl block mb-2">
              {archetype.emoji}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">
              {archetype.name}
            </h2>
            <p className="text-white/70 text-xs sm:text-sm italic mb-4">
              &ldquo;{archetype.tagline}&rdquo;
            </p>
            {city && (
              <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                {city.name} Chapter
              </p>
            )}
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-center gap-1.5">
              <span className="text-sm">☀️</span>
              <p className="text-white/30 text-[10px] sm:text-xs font-semibold">
                onlylloydknows.com
              </p>
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="text-center animate-fade-in-up [animation-delay:600ms]">
          <p className="text-white/50 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">
            Share your DNA
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onShareLinkedIn}
              className="bg-[#0A66C2] hover:bg-[#004182] text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all flex items-center justify-center gap-2.5 text-base sm:text-lg cursor-pointer shadow-lg shadow-black/20"
            >
              <LinkedInIcon />
              LinkedIn
            </button>
            <button
              onClick={onShareFacebook}
              className="bg-[#1877F2] hover:bg-[#0C5DC7] text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all flex items-center justify-center gap-2.5 text-base sm:text-lg cursor-pointer shadow-lg shadow-black/20"
            >
              <FacebookIcon />
              Facebook
            </button>
            <button
              onClick={onShareInstagram}
              className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-110 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all flex items-center justify-center gap-2.5 text-base sm:text-lg cursor-pointer shadow-lg shadow-black/20"
            >
              <InstagramIcon />
              {copied ? "Link Copied!" : "Instagram"}
            </button>
          </div>
          <p className="text-white/30 text-xs mt-3 sm:hidden">
            Screenshot the card above for Instagram Stories
          </p>
        </div>

        {/* Retake */}
        <div className="text-center mt-8 animate-fade-in-up [animation-delay:700ms]">
          <button
            onClick={onRestart}
            className="text-white/40 hover:text-white/80 font-medium transition-colors text-sm sm:text-base cursor-pointer"
          >
            &larr; Take it again
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Social Icons ────────────────────────────────────────── */

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
