"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ARCHETYPES,
  CITIES,
  QUESTIONS,
  calculateArchetype,
  type ArchetypeId,
  type ArchetypeResult,
  type Answers,
  type CityConfig,
  type Question,
  type CardType,
} from "./data";

type Stage = "city" | "welcome" | "quiz" | "loading" | "result";

/* ── Main Component ──────────────────────────────────────── */

export default function ChapterDNA() {
  const [stage, setStage] = useState<Stage>("city");
  const [selectedCity, setSelectedCity] = useState<CityConfig | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<ArchetypeResult | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const resultId = params.get("r") as ArchetypeId | null;
    const cityId = params.get("c");
    if (resultId && ARCHETYPES[resultId]) {
      setResult({ archetype: ARCHETYPES[resultId], drink: "", spot: "", says: "" });
      if (cityId) {
        const city = CITIES.find((c) => c.id === cityId);
        if (city) setSelectedCity(city);
      }
      setStage("result");
    }
  }, []);

  const selectCity = useCallback((city: CityConfig) => {
    setSelectedCity(city);
    setStage("welcome");
    window.scrollTo({ top: 0 });
  }, []);

  const startQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setAnimKey((k) => k + 1);
    setStage("quiz");
    window.scrollTo({ top: 0 });
  }, []);

  const handleAnswer = useCallback(
    (questionId: string, optionId: string) => {
      if (isAdvancing) return;
      const newAnswers = { ...answers, [questionId]: optionId };
      setAnswers(newAnswers);

      const q = QUESTIONS[currentQuestion];
      if (q.autoAdvance) {
        setIsAdvancing(true);
        setTimeout(() => {
          if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion((i: number) => i + 1);
            setAnimKey((k) => k + 1);
          } else {
            finishQuiz(newAnswers);
          }
          setIsAdvancing(false);
        }, 360);
      }
    },
    [answers, currentQuestion, isAdvancing]
  );

  const handleSubmitLast = useCallback(() => {
    finishQuiz(answers);
  }, [answers]);

  const finishQuiz = (finalAnswers: Answers) => {
    const computed = calculateArchetype(finalAnswers);
    setResult(computed);
    setStage("loading");
    window.scrollTo({ top: 0 });
  };

  const handleBack = useCallback(() => {
    if (currentQuestion === 0) {
      setStage("welcome");
    } else {
      setCurrentQuestion((i: number) => i - 1);
      setAnimKey((k) => k + 1);
    }
  }, [currentQuestion]);

  const handleLoadingComplete = useCallback(() => {
    setStage("result");
    if (selectedCity && result) {
      window.history.replaceState(
        {},
        "",
        `/chapter-dna?r=${result.archetype.id}&c=${selectedCity.id}`
      );
    }
  }, [selectedCity, result]);

  const restart = useCallback(() => {
    setStage("city");
    setSelectedCity(null);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    window.history.replaceState({}, "", "/chapter-dna");
    window.scrollTo({ top: 0 });
  }, []);

  const getShareUrl = () =>
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}/chapter-dna?r=${result?.archetype.id}&c=${selectedCity?.id || ""}`;

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

  if (!mounted) return <div className="min-h-screen bg-slate-900" />;

  return (
    <>
      {stage === "city" && <CitySelection cities={CITIES} onSelect={selectCity} />}
      {stage === "welcome" && selectedCity && (
        <WelcomeScreen chapterName={selectedCity.name} onStart={startQuiz} onBack={() => setStage("city")} />
      )}
      {stage === "quiz" && selectedCity && (
        <QuizFlow
          question={QUESTIONS[currentQuestion]}
          questionIndex={currentQuestion}
          totalQuestions={QUESTIONS.length}
          cityName={selectedCity.name}
          selectedAnswer={answers[QUESTIONS[currentQuestion].id]}
          isAdvancing={isAdvancing}
          animKey={animKey}
          isFirst={currentQuestion === 0}
          isLast={currentQuestion === QUESTIONS.length - 1}
          onAnswer={handleAnswer}
          onSubmit={handleSubmitLast}
          onBack={handleBack}
        />
      )}
      {stage === "loading" && selectedCity && (
        <LoadingScreen chapterName={selectedCity.name} onComplete={handleLoadingComplete} />
      )}
      {stage === "result" && result && (
        <ResultReveal
          result={result}
          city={selectedCity}
          onShareLinkedIn={shareToLinkedIn}
          onShareFacebook={shareToFacebook}
          onShareInstagram={copyForInstagram}
          onRestart={restart}
          copied={copied}
        />
      )}
    </>
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-[0.25em] mb-4 animate-fade-in-up">
            Pavilion &middot; Chapter DNA
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-5 animate-fade-in-up [animation-delay:100ms]">
            Same network.
            <br /> Different DNA.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 font-medium animate-fade-in-up [animation-delay:200ms]">
            Pick your chapter. 10 questions. Under 3 minutes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {cities.map((city, i) => (
            <button
              key={city.id}
              onClick={() => onSelect(city)}
              className="group relative overflow-hidden rounded-2xl min-h-[180px] sm:min-h-[220px] hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 animate-fade-in-up cursor-pointer"
              style={{
                animationDelay: `${300 + i * 50}ms`,
                backgroundImage: `url(${city.cityPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/70 transition-all" />

              {/* City name */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight group-hover:translate-y-[-2px] transition-transform duration-300">
                  {city.name}
                </h3>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white/70 text-lg">&rarr;</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-slate-600 text-xs sm:text-sm mt-8 md:mt-12 animate-fade-in-up [animation-delay:1100ms]">
          No right answers. Just your chapter&apos;s true personality.
        </p>
      </div>
    </section>
  );
}

/* ── Welcome Screen ──────────────────────────────────────── */

function WelcomeScreen({
  chapterName,
  onStart,
  onBack,
}: {
  chapterName: string;
  onStart: () => void;
  onBack: () => void;
}) {
  return (
    <section className="min-h-screen bg-slate-900 flex flex-col px-5 pt-14 pb-10">
      <button
        onClick={onBack}
        className="text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8 self-start cursor-pointer"
      >
        &larr; Back
      </button>

      <p className="text-amber-400 font-bold text-xs tracking-[0.2em] uppercase mb-2 animate-fade-in-up">
        Chapter DNA
      </p>
      <p className="text-slate-400 text-sm font-medium mb-10 animate-fade-in-up [animation-delay:50ms]">
        {chapterName} Chapter
      </p>

      <div className="flex-1">
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6 animate-fade-in-up [animation-delay:100ms]">
          10 questions.
          <br />
          Under 3 minutes.
          <br />
          No right answers.
        </h1>

        <p className="text-slate-400 text-base leading-relaxed max-w-sm animate-fade-in-up [animation-delay:200ms]">
          Your answers will be combined with your chapter&apos;s responses to
          generate a unique chapter identity — and eventually, head-to-head
          comparisons with other chapters.
        </p>

        <div className="mt-8 flex flex-col gap-3 animate-fade-in-up [animation-delay:300ms]">
          {["One question at a time", "Tap to select, auto-advances", "Takes about 2 minutes"].map(
            (hint) => (
              <div key={hint} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40 flex-shrink-0" />
                <p className="text-sm text-slate-500">{hint}</p>
              </div>
            )
          )}
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full max-w-md mx-auto py-4 bg-amber-400 text-slate-900 font-bold text-base rounded-xl hover:bg-amber-300 active:scale-[0.98] transition-all mt-10 cursor-pointer animate-fade-in-up [animation-delay:400ms]"
      >
        Start
      </button>
    </section>
  );
}

/* ── Quiz Flow ───────────────────────────────────────────── */

function QuizFlow({
  question,
  questionIndex,
  totalQuestions,
  cityName,
  selectedAnswer,
  isAdvancing,
  animKey,
  isFirst,
  isLast,
  onAnswer,
  onSubmit,
  onBack,
}: {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  cityName: string;
  selectedAnswer: string | undefined;
  isAdvancing: boolean;
  animKey: number;
  isFirst: boolean;
  isLast: boolean;
  onAnswer: (questionId: string, optionId: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <section className="min-h-screen bg-slate-900 flex flex-col">
      {/* Progress bar */}
      <div className="px-4 pt-4">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-0">
        <button
          onClick={onBack}
          className={`flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer ${isFirst ? "invisible" : ""}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <p className="text-xs font-medium tracking-wider text-white/30 uppercase">
          {questionIndex + 1} / {totalQuestions}
        </p>
        <p className="text-xs text-white/30 max-w-[100px] truncate text-right">{cityName}</p>
      </div>

      {/* Question text */}
      <div key={animKey} className="px-5 pt-6 pb-5 animate-slide-in">
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-[1.2] tracking-tight">
          {question.text}
        </h2>
      </div>

      {/* Answer grid */}
      <div
        key={`grid-${animKey}`}
        className="px-5 grid grid-cols-2 gap-2.5 animate-slide-in [animation-delay:40ms]"
      >
        {question.options.map((option) => (
          <AnswerCard
            key={option.id}
            option={option}
            cardType={question.cardType}
            isSelected={selectedAnswer === option.id}
            isDisabled={isAdvancing}
            onSelect={() => onAnswer(question.id, option.id)}
          />
        ))}
      </div>

      {/* Submit button — only on last question */}
      {isLast && (
        <div className={`px-5 mt-5 transition-all duration-300 ${selectedAnswer ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <button
            onClick={onSubmit}
            disabled={!selectedAnswer}
            className="w-full py-4 bg-amber-400 text-slate-900 font-bold text-base rounded-xl hover:bg-amber-300 active:scale-[0.98] transition-all disabled:opacity-40 cursor-pointer"
          >
            Submit
          </button>
        </div>
      )}

      <div className="flex-1 min-h-8" />
    </section>
  );
}

/* ── Answer Card ─────────────────────────────────────────── */

function AnswerCard({
  option,
  cardType,
  isSelected,
  isDisabled,
  onSelect,
}: {
  option: { id: string; text: string; icon?: string; image?: string };
  cardType: CardType;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}) {
  const base = `relative cursor-pointer rounded-xl transition-all duration-150 select-none border outline-none ${isDisabled ? "pointer-events-none" : ""}`;
  const selectedStyle = "bg-amber-400/15 border-amber-400";
  const defaultStyle = "bg-white/[0.06] border-white/10 hover:bg-white/[0.1] hover:border-white/20 active:scale-[0.98]";

  if (cardType === "text") {
    return (
      <button onClick={onSelect} className={`${base} flex items-center justify-between px-4 py-4 min-h-[68px] ${isSelected ? selectedStyle : defaultStyle}`}>
        <span className={`text-sm font-medium leading-snug text-left ${isSelected ? "text-white" : "text-white/80"}`}>
          {option.text}
        </span>
        {isSelected && <CheckIcon />}
      </button>
    );
  }

  if (cardType === "icon-text") {
    return (
      <button onClick={onSelect} className={`${base} flex items-center gap-3 px-4 py-4 min-h-[68px] ${isSelected ? selectedStyle : defaultStyle}`}>
        <span className="text-xl flex-shrink-0">{option.icon}</span>
        <span className={`text-sm font-medium leading-snug text-left ${isSelected ? "text-white" : "text-white/80"}`}>
          {option.text}
        </span>
        {isSelected && <span className="ml-auto flex-shrink-0"><CheckIcon /></span>}
      </button>
    );
  }

  // image-text
  return (
    <button
      onClick={onSelect}
      className={`${base} overflow-hidden h-[150px] sm:h-[170px] ${isSelected ? "border-amber-400 ring-1 ring-amber-400/30" : "border-white/10 hover:border-white/25 active:scale-[0.98]"}`}
      style={{
        backgroundImage: `url(${option.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#1e293b",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: isSelected
            ? "linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.35) 60%, rgba(15,23,42,0.15) 100%)"
            : "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.3) 60%, rgba(15,23,42,0.1) 100%)",
        }}
      />
      {isSelected && <div className="absolute inset-0 bg-amber-400/[0.06]" />}
      {isSelected && (
        <div className="absolute top-2.5 right-2.5 bg-amber-400 rounded-full p-0.5">
          <CheckIcon size={12} />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6">
        <p className="text-sm font-semibold text-white leading-tight text-left">{option.text}</p>
      </div>
    </button>
  );
}

/* ── Loading Screen ──────────────────────────────────────── */

const LOADING_MESSAGES = [
  "Reading the room\u2026",
  "Analyzing chapter energy\u2026",
  "Cross-referencing 847 chapters\u2026",
  "Calculating your DNA\u2026",
];

function LoadingScreen({
  chapterName,
  onComplete,
}: {
  chapterName: string;
  onComplete: () => void;
}) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, LOADING_MESSAGES.length - 1));
    }, 500);

    const startTime = Date.now();
    const duration = 1800;
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(eased * 100);
      if (pct >= 1) {
        clearInterval(progressInterval);
        clearInterval(msgInterval);
        setTimeout(onComplete, 100);
      }
    }, 16);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-slate-900 px-8">
      <p className="text-xs font-semibold tracking-[0.22em] uppercase mb-12 text-amber-400/60 animate-fade-in-up">
        {chapterName}
      </p>
      <h2 className="text-2xl font-black text-white mb-2 text-center leading-tight animate-slide-in">
        Calculating your
        <br />
        Chapter DNA
      </h2>
      <p className="text-sm mb-10 h-5 text-center text-white/40 transition-all duration-300">
        {LOADING_MESSAGES[messageIndex]}
      </p>
      <div className="w-48 h-[3px] rounded-full overflow-hidden bg-white/10">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}

/* ── Result Reveal ───────────────────────────────────────── */

function ResultReveal({
  result,
  city,
  onShareLinkedIn,
  onShareFacebook,
  onShareInstagram,
  onRestart,
  copied,
}: {
  result: ArchetypeResult;
  city: CityConfig | null;
  onShareLinkedIn: () => void;
  onShareFacebook: () => void;
  onShareInstagram: () => void;
  onRestart: () => void;
  copied: boolean;
}) {
  const { archetype, drink, spot, says } = result;

  return (
    <section className={`min-h-screen bg-gradient-to-br ${archetype.gradient} relative overflow-hidden`}>
      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-3xl sm:text-4xl opacity-[0.08] animate-float"
            style={{
              left: `${5 + i * 12}%`,
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
        {/* Reveal */}
        <div className="text-center">
          <p className="text-white/50 font-bold text-xs uppercase tracking-[0.25em] mb-1 animate-fade-in-up">
            {city?.name} Chapter
          </p>
          <p className="text-white/30 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 animate-fade-in-up [animation-delay:50ms]">
            Chapter DNA
          </p>
          <span className="text-6xl sm:text-7xl block mb-3 animate-scale-in">{archetype.emoji}</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 tracking-tight animate-fade-in-up [animation-delay:200ms]">
            {archetype.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 italic font-medium mb-8 animate-fade-in-up [animation-delay:300ms]">
            &ldquo;{archetype.tagline}&rdquo;
          </p>
        </div>

        {/* Description */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-5 sm:p-6 mb-6 animate-fade-in-up [animation-delay:400ms]">
          <p className="text-white/90 text-base leading-relaxed">{archetype.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {archetype.traits.map((trait) => (
              <span key={trait} className="bg-white/15 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Manifesto */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-5 sm:p-6 mb-6 animate-fade-in-up [animation-delay:450ms]">
          <p className="text-[10px] font-bold tracking-[0.22em] text-white/30 uppercase mb-4">
            Chapter Manifesto
          </p>
          <div className="flex flex-col gap-3">
            {archetype.manifesto.map((line, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="text-xs font-bold text-amber-400 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base font-bold text-white leading-snug">{line}</p>
              </div>
            ))}
          </div>
        </div>

        {/* By the Numbers */}
        {(drink || spot || says) && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 animate-fade-in-up [animation-delay:500ms]">
            {[
              { label: "Drink", value: drink },
              { label: "Spot", value: spot },
              { label: "We say", value: says, accent: true },
            ]
              .filter((item) => item.value)
              .map(({ label, value, accent }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 bg-black/15 backdrop-blur-sm border border-white/10"
                >
                  <span className="text-[9px] font-bold tracking-[0.16em] uppercase text-white/30 block mb-1">
                    {label}
                  </span>
                  <span
                    className={`text-xs leading-snug block ${accent ? "font-semibold text-amber-200 italic" : "text-white/80"}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
          </div>
        )}

        {/* Share Buttons */}
        <div className="text-center animate-fade-in-up [animation-delay:600ms]">
          <p className="text-white/50 font-bold text-xs uppercase tracking-[0.2em] mb-4">
            Share your DNA
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onShareLinkedIn}
              className="bg-[#0A66C2] hover:bg-[#004182] text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer shadow-lg shadow-black/20"
            >
              <LinkedInIcon /> LinkedIn
            </button>
            <button
              onClick={onShareFacebook}
              className="bg-[#1877F2] hover:bg-[#0C5DC7] text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer shadow-lg shadow-black/20"
            >
              <FacebookIcon /> Facebook
            </button>
            <button
              onClick={onShareInstagram}
              className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-110 text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer shadow-lg shadow-black/20"
            >
              <InstagramIcon /> {copied ? "Link Copied!" : "Instagram"}
            </button>
          </div>
        </div>

        {/* Retake */}
        <div className="text-center mt-8 animate-fade-in-up [animation-delay:700ms]">
          <button
            onClick={onRestart}
            className="text-white/40 hover:text-white/80 font-medium transition-colors text-sm cursor-pointer"
          >
            &larr; Take it again
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Small components ────────────────────────────────────── */

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className="text-white">
      <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
