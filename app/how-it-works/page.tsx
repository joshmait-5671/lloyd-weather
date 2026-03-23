import Link from "next/link";

export default function HowItWorks() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-800 to-sky-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold mb-4">How It Works</h1>
          <p className="text-sky-200 text-lg">
            Three steps. One Lloyd. Zero ruined weekends.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="space-y-12">
            {[
              {
                step: "1",
                title: "Sign Up",
                description:
                  "$6/month. One plan. No upsells. Set your locations — home, beach house, ski house — so Lloyd knows where you're asking about.",
                detail:
                  "Your whole family can use it. One subscription covers everyone.",
              },
              {
                step: "2",
                title: "Ask a Question",
                description:
                  "Text or chat any weather question. \"Is Saturday good for the beach?\" \"Will school be delayed?\" \"Hunter or Windham this weekend?\"",
                detail:
                  "Ask in plain English. Lloyd doesn't need coordinates or zip codes — he knows the area.",
              },
              {
                step: "3",
                title: "Get Lloyd's Take",
                description:
                  "Not a generic forecast. A specific, opinionated answer from someone who's been calling tri-state weather for years.",
                detail:
                  "Lloyd tells you what to DO, not just what the temperature is. \"Push the party to Sunday\" beats \"60% chance of precipitation.\"",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-700 mb-1">{item.description}</p>
                  <p className="text-slate-500 text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold mb-2">
              🌦️ Lloyd&apos;s Weekly Outlook
            </h3>
            <p className="text-slate-600 mb-2">
              Every Sunday night, subscribers get a text from Lloyd with the
              week ahead. No question needed — Lloyd comes to you.
            </p>
            <p className="text-slate-500 text-sm">
              Big storm brewing? Lloyd texts you before you even think to ask.
            </p>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/pricing"
              className="bg-sky-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-sky-500 transition-colors text-lg inline-block"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
