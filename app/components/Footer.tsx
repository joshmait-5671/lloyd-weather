import LloydAvatar from "./LloydAvatar";

const LLOYD_QUOTES = [
  "Models are NOT a forecast. They are a tool to make a forecast.",
  "Nothing easy about forecasting winter storms in the tri-state area.",
  "Should be fun to track!",
];

export default function Footer() {
  const quote = LLOYD_QUOTES[Math.floor(Math.random() * LLOYD_QUOTES.length)];

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col items-center text-center gap-4">
          <LloydAvatar size={48} />
          <p className="text-white font-extrabold text-lg">Only Lloyd Knows</p>
          <p className="text-slate-500 italic text-xs max-w-sm">
            &ldquo;{quote}&rdquo; — Lloyd
          </p>
          <p className="text-slate-500 mt-2">
            Your weather guy for the NYC tri-state suburbs.
          </p>
          <p className="text-xs text-slate-600 max-w-md">
            For entertainment and informational purposes only. Not professional
            meteorological advice. But Lloyd&apos;s pretty good.
          </p>
          <p className="text-xs text-slate-700 mt-2">
            &copy; {new Date().getFullYear()} Only Lloyd Knows
          </p>
        </div>
      </div>
    </footer>
  );
}
