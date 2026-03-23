import Link from "next/link";
import LloydAvatar from "./components/LloydAvatar";
import WeatherBackground from "./components/WeatherBackground";
import TryItDemo from "./components/TryItDemo";

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100 overflow-hidden wave-divider">
        <WeatherBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
          <LloydAvatar size={120} withWeather className="mx-auto mb-6 animate-fade-in-up md:[&]:w-[140px] md:[&]:h-[140px]" />

          <h1 className="text-[2rem] sm:text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-4 animate-fade-in-up [animation-delay:100ms]">
            Stop Guessing.
            <br />
            <span className="text-sky-700">Ask Lloyd.</span>
          </h1>

          <p className="text-slate-700 text-base md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up [animation-delay:200ms]">
            Lloyd Mallah is a weather-obsessed guy in Westchester who&apos;s
            been calling storms for his friends for years. Now he&apos;s yours.
            Ask a question, get a real forecast from someone who actually knows
            your area.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up [animation-delay:300ms]">
            <Link
              href="/pricing"
              className="bg-amber-400 text-slate-900 font-extrabold px-8 py-3.5 rounded-full hover:bg-amber-300 hover:scale-105 transition-all text-lg shadow-lg shadow-amber-400/30"
            >
              Get Lloyd for $6/mo
            </Link>
            <Link
              href="/meet-lloyd"
              className="bg-white/70 backdrop-blur text-slate-800 font-bold px-8 py-3.5 rounded-full hover:bg-white transition-all text-lg border border-white/50"
            >
              Who is Lloyd?
            </Link>
          </div>
        </div>
      </section>

      {/* ── Try It Demo ──────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-amber-600 font-bold text-sm uppercase tracking-widest mb-2">
              Try it right now
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Ask Lloyd anything about the weather
            </h2>
            <p className="text-slate-500 mt-2 max-w-lg mx-auto">
              Go ahead — ask about this weekend, your kid&apos;s game, the beach,
              whatever. This is the real deal.
            </p>
          </div>
          <TryItDemo />
        </div>
      </section>

      {/* ── Sample Response ──────────────────────────────── */}
      <section className="bg-sky-50">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <p className="text-center text-sm font-bold text-sky-600 uppercase tracking-widest mb-6">
            This is what you get
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-sky-100">
            <div className="flex items-center gap-3 mb-4">
              <LloydAvatar size={44} />
              <div>
                <p className="font-bold text-slate-800">Lloyd</p>
                <p className="text-xs text-slate-400">Just now</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed italic">
              &ldquo;OK everybody. Saturday is looking like a go for the beach.
              High of 82, light southwest breeze, and the models are in good
              agreement on keeping the showers well to our north. Sunday gets
              trickier — a front is pushing through late Saturday night and I
              think we see scattered showers developing by mid-morning. If
              you&apos;re picking one day, Saturday is your play. Trust me on this
              one.&rdquo;
            </p>
            <p className="text-slate-400 text-sm mt-3 italic">
              Take Care, Lloyd
            </p>
          </div>
          <p className="text-center text-slate-500 text-sm mt-4">
            That&apos;s not a weather app. That&apos;s Lloyd.
          </p>
        </div>
      </section>

      {/* ── Use Cases ────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-3">
            Questions real people ask Lloyd
          </h2>
          <p className="text-center text-slate-500 mb-12 max-w-lg mx-auto">
            Lloyd doesn&apos;t just tell you the temperature. He tells you what to do about it.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "\u26BD",
                q: "My kid has soccer at 2pm Saturday. Rain-out?",
                a: "Lloyd checks the models, tells you if it's happening or not.",
              },
              {
                icon: "\uD83C\uDFD6\uFE0F",
                q: "Montauk or Jersey Shore this weekend?",
                a: "Lloyd compares both coasts and picks your best day.",
              },
              {
                icon: "\u26F7\uFE0F",
                q: "Hunter or Windham getting more snow?",
                a: "Lloyd breaks down elevation, storm track, and calls it.",
              },
              {
                icon: "\uD83C\uDFEB",
                q: "Think schools will be delayed tomorrow?",
                a: "Lloyd knows the plowing patterns and makes the call.",
              },
              {
                icon: "\uD83C\uDF00",
                q: "Should I board up the beach house?",
                a: "Lloyd tracks the storm and tells you when to worry.",
              },
              {
                icon: "\uD83C\uDF42",
                q: "Best weekend for leaf peeping upstate?",
                a: "Lloyd checks the foliage reports AND the forecast.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-gradient-to-br from-sky-50 to-white rounded-2xl p-6 border border-sky-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <p className="text-3xl mb-3">{item.icon}</p>
                <p className="font-bold text-slate-800 mb-2">
                  &ldquo;{item.q}&rdquo;
                </p>
                <p className="text-slate-500 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="bg-sky-50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Ask your question",
                desc: "Text or chat Lloyd about anything weather-related for your area.",
              },
              {
                step: "2",
                title: "Lloyd checks the models",
                desc: "Real weather data, local knowledge, and years of pattern recognition.",
              },
              {
                step: "3",
                title: "Get a real answer",
                desc: "Not data. An actual recommendation you can make decisions with.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-sky-500 text-white font-black text-xl flex items-center justify-center mb-4 shadow-lg shadow-sky-500/30">
                  {s.step}
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-r from-sky-500 to-sky-600 text-white overflow-hidden">
        <WeatherBackground />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 text-center">
          <LloydAvatar size={80} className="mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Weather apps give you data.
            <br />
            Lloyd gives you answers.
          </h2>
          <p className="text-sky-100 mb-8 text-lg">
            $6/month. Cancel anytime. Unlimited questions.
          </p>
          <Link
            href="/pricing"
            className="bg-amber-400 text-slate-900 font-extrabold px-8 py-3.5 rounded-full hover:bg-amber-300 hover:scale-105 transition-all text-lg inline-block shadow-lg shadow-amber-400/30"
          >
            Get Lloyd
          </Link>
        </div>
      </section>
    </>
  );
}
