export default function MeetLloyd() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-800 to-sky-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Meet Lloyd</h1>
          <p className="text-sky-200 text-lg">
            The weather-obsessed friend you didn&apos;t know you needed.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-sky-50 rounded-2xl p-8 mb-12 border border-sky-100">
            <div className="w-24 h-24 rounded-full bg-sky-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              LM
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Lloyd Mallah</h2>
            <p className="text-sky-600 text-center text-sm font-medium mb-6">
              Amateur Meteorologist · Westchester, NY · Weather Obsessive Since Forever
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-6">
            <p className="text-lg">
              Lloyd isn&apos;t a TV meteorologist. He doesn&apos;t work for the
              Weather Channel. He&apos;s a regular guy in Westchester who
              happens to be <em>completely obsessed</em> with weather.
            </p>
            <p>
              For years, Lloyd has been sending detailed weather forecasts to a
              growing email list of friends, family, and neighbors. Not generic
              forecasts — specific, actionable calls for the NYC tri-state
              suburbs. &ldquo;The storm will change to rain by midnight in
              Southern Westchester but areas north of 287 could see 4-6
              inches.&rdquo; That kind of detail.
            </p>
            <p>
              He explains <em>why</em> the weather is doing what it&apos;s
              doing. He teaches you about Miller B storms and coastal lows and
              why the NAM model disagrees with the Euro. He owns his misses
              publicly and tracks his accuracy. He&apos;s the real deal.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-4">Lloyd&apos;s Greatest Hits</h3>
            <div className="space-y-4">
              {[
                {
                  quote:
                    "OK everybody. This is a tricky one. Lets dive right in...",
                  context: "Before a complex winter storm — Nov 2019",
                },
                {
                  quote:
                    "Not sure why I fell in love with wintery weather. I seem to have chosen a very challenging part of meteorology to focus on. It's a fickle relationship.",
                  context: "A rare philosophical moment — Jan 2024",
                },
                {
                  quote:
                    "The only regret I have is making a comment that I didn't think there would be much impact to roadways... this was an important comment that for a few hours was inaccurate.",
                  context: "Owning a miss publicly — Jan 2024",
                },
                {
                  quote:
                    "Models are NOT a forecast. They are a tool to make a forecast.",
                  context: "Lloyd being Lloyd",
                },
              ].map((item) => (
                <blockquote
                  key={item.quote}
                  className="bg-slate-50 border-l-4 border-sky-500 pl-4 py-3 rounded-r-lg"
                >
                  <p className="text-slate-700 italic">&ldquo;{item.quote}&rdquo;</p>
                  <p className="text-slate-400 text-xs mt-1">{item.context}</p>
                </blockquote>
              ))}
            </div>

            <h3 className="text-xl font-bold mt-10 mb-4">
              Why People Trust Lloyd
            </h3>
            <ul className="space-y-3">
              {[
                "He's been doing this for years — not days",
                "He reviews his own forecasts and publicly admits when he's wrong",
                "He explains the WHY, not just the what",
                "He knows the micro-differences between Westchester, Long Island, and the Jersey suburbs",
                "He genuinely cares if your kid's soccer game gets rained out",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-sky-500 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
