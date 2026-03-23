import Link from "next/link";

export default function Pricing() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-800 to-sky-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Pricing</h1>
          <p className="text-sky-200 text-lg">
            One plan. One price. Unlimited Lloyd.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="max-w-lg mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-sky-600 text-white text-center py-3 text-sm font-bold uppercase tracking-widest">
              The Only Plan You Need
            </div>
            <div className="p-8 text-center">
              <p className="text-5xl font-extrabold text-slate-800 mb-1">$6</p>
              <p className="text-slate-500 mb-8">/month · cancel anytime</p>

              <ul className="text-left space-y-3 mb-8">
                {[
                  "Unlimited questions via chat or text",
                  "Lloyd's weekly Sunday outlook",
                  "Proactive storm alerts",
                  "Multiple locations (home, beach, ski)",
                  "Family sharing included",
                  "Real human meteorologist, not an algorithm",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-sky-500 mt-0.5">✓</span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full bg-amber-400 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-300 transition-colors text-lg cursor-not-allowed opacity-75"
                disabled
              >
                Coming Soon
              </button>
              <p className="text-slate-400 text-xs mt-3">
                Launching soon — sign up to be first in line.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-slate-500 text-sm">
            <p className="font-medium mb-2">Think about it this way:</p>
            <p>
              $6/month is less than one ruined beach day, one unnecessary
              snow-day grocery run, or one canceled birthday party that
              didn&apos;t need to be canceled.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
