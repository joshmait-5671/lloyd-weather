"use client";

import { useState, useRef } from "react";
import ChatBubble from "./ChatBubble";
import LloydAvatar from "./LloydAvatar";

const STARTER_QUESTIONS = [
  "Is this weekend good for the beach?",
  "Will my kid's soccer game get rained out Saturday?",
  "Do I need an umbrella today?",
  "Which ski mountain is getting more snow this week?",
  "Good day for a BBQ tomorrow?",
];

const LOCATIONS = [
  { key: "westchester", label: "Westchester, NY" },
  { key: "montauk", label: "Montauk, NY" },
  { key: "long-island", label: "Long Island, NY" },
  { key: "north-jersey", label: "North Jersey" },
  { key: "fairfield", label: "Fairfield, CT" },
  { key: "nyc", label: "New York City" },
  { key: "hamptons", label: "The Hamptons" },
  { key: "windham", label: "Windham, NY" },
  { key: "hunter-mountain", label: "Hunter Mountain, NY" },
];

type Message = { role: "user" | "lloyd"; text: string };

export default function TryItDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("westchester");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [hasAsked, setHasAsked] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const askLloyd = async (question: string) => {
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);
    scrollToBottom();

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, location, email }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "lloyd", text: data.response || data.error },
      ]);
      setHasAsked(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "lloyd",
          text: "Hmm, having trouble checking the models right now. Give me a sec and try again. Take Care, Lloyd",
        },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const handleSend = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setInput("");

    // If already asked and no email captured, gate the second question
    if (hasAsked && !emailCaptured) {
      setPendingQuestion(q);
      return;
    }

    askLloyd(q);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailCaptured(true);
    console.log("Lead captured:", email); // TODO: store in Supabase
    if (pendingQuestion) {
      askLloyd(pendingQuestion);
      setPendingQuestion("");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-4 flex items-center gap-3">
        <LloydAvatar size={40} />
        <div>
          <p className="text-white font-bold text-sm">Ask Lloyd</p>
          <p className="text-sky-100 text-xs">Live weather answers in Lloyd&apos;s voice</p>
        </div>
        <div className="ml-auto">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-xs bg-white/20 text-white border border-white/30 rounded-lg px-2 py-1 backdrop-blur-sm [&>option]:text-slate-800"
          >
            {LOCATIONS.map((l) => (
              <option key={l.key} value={l.key}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat area */}
      <div ref={chatRef} className="h-[360px] overflow-y-auto px-6 py-4 space-y-4 bg-slate-50/50">
        {messages.length === 0 && !pendingQuestion && (
          <div className="text-center py-8">
            <LloydAvatar size={64} withWeather className="mx-auto mb-4" />
            <p className="text-slate-600 font-medium mb-1">Hey! Lloyd here.</p>
            <p className="text-slate-400 text-sm mb-6">
              Ask me anything about the weather. I&apos;ll give you the real deal.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="bg-white border border-sky-200 rounded-full px-4 py-2 text-xs text-sky-700 hover:bg-sky-50 hover:border-sky-400 transition-all shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} text={msg.text} />
        ))}

        {loading && <ChatBubble role="lloyd" text="" isLoading />}
      </div>

      {/* Email capture gate */}
      {pendingQuestion && !emailCaptured && (
        <div className="px-6 py-4 bg-amber-50 border-t border-amber-200">
          <p className="text-sm text-amber-800 font-medium mb-2">
            Lloyd&apos;s got your answer ready! Drop your email to keep chatting.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className="flex-1 border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            />
            <button
              type="submit"
              className="bg-amber-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors text-sm"
            >
              Ask Lloyd
            </button>
          </form>
        </div>
      )}

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-slate-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(input);
              }
            }}
            placeholder={
              loading
                ? "Lloyd's checking the models..."
                : "Ask Lloyd about the weather..."
            }
            disabled={loading}
            className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent disabled:opacity-50 disabled:bg-slate-50"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={loading || !input.trim()}
            className="bg-sky-500 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-sky-400 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
