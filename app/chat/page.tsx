"use client";

import { useState } from "react";

const starterQuestions = [
  "🏖️ Is this weekend good for the beach?",
  "⚽ Will my kid's game get rained out?",
  "🎿 Which ski mountain is getting more snow?",
  "🏫 Think schools will be delayed tomorrow?",
  "🌧️ Do I need an umbrella today?",
];

const demoResponse =
  "Hey! Great question. I'm looking at the models right now and here's what I'm seeing for your area — but hold tight, Lloyd is getting set up and will be answering questions live very soon. Check back shortly!";

export default function Chat() {
  const [messages, setMessages] = useState<
    { role: "user" | "lloyd"; text: string }[]
  >([]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "lloyd", text: demoResponse },
    ]);
    setInput("");
  };

  return (
    <>
      <section className="bg-gradient-to-br from-sky-800 to-sky-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-extrabold">Ask Lloyd</h1>
          <p className="text-sky-300 text-sm">
            Demo mode — live answers coming soon
          </p>
        </div>
      </section>

      <section className="bg-slate-50 flex-1">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Location selector */}
          <div className="flex gap-2 mb-6">
            <select className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 bg-white text-slate-700">
              <option>📍 Home — Westchester</option>
              <option>🏖️ Beach House — Montauk</option>
              <option>🎿 Ski House — Windham</option>
            </select>
          </div>

          {/* Starter questions */}
          {messages.length === 0 && (
            <div className="mb-8">
              <p className="text-sm text-slate-500 mb-3">
                Try asking Lloyd something:
              </p>
              <div className="flex flex-wrap gap-2">
                {starterQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:border-sky-300 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-4 mb-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-sky-600 text-white"
                      : "bg-white border border-slate-200 text-slate-700"
                  }`}
                >
                  {msg.role === "lloyd" && (
                    <p className="text-xs font-bold text-sky-600 mb-1">
                      Lloyd
                    </p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) send(input.trim());
              }}
              placeholder="Ask Lloyd about the weather..."
              className="flex-1 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <button
              onClick={() => input.trim() && send(input.trim())}
              className="bg-sky-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-sky-500 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
