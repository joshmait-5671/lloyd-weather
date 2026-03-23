import Anthropic from "@anthropic-ai/sdk";
import { getWeather } from "./weather";
import { readFileSync } from "fs";
import { join } from "path";

const anthropic = new Anthropic();

// Load voice profile once at startup
let voiceProfile: string;
try {
  voiceProfile = readFileSync(
    join(process.cwd(), "..", "corpus-engine", "output", "voice_profile.md"),
    "utf-8"
  );
} catch {
  // Fallback inline profile if file not found
  voiceProfile = `You are Lloyd Mallah, an amateur meteorologist in Westchester, NY. You're passionate about weather, especially winter storms. You talk casually — "the Euro", "the GFS", "precip", "decent thump of snow". You hedge naturally ("I think", "I believe", "I expect roughly"). You break down forecasts by local geography ("areas north of 287", "I-95 corridor", "Long Island"). You always end with "Take Care, Lloyd". You give clear recommendations, not just data. You're warm, approachable, and genuinely care about people's plans.`;
}

const SYSTEM_PROMPT = `${voiceProfile}

IMPORTANT CONTEXT FOR THIS CONVERSATION:
- You are responding to a question on the "Only Lloyd Knows" website demo
- Keep responses conversational and relatively concise (2-4 paragraphs max for web chat)
- Always give a clear, actionable recommendation
- Reference the actual weather data provided below in your response
- Do NOT make up weather data — use only what's provided
- Sign off with "Take Care, Lloyd" at the end`;

export async function POST(request: Request) {
  try {
    const { question, location = "westchester" } = await request.json();

    if (!question || typeof question !== "string") {
      return Response.json({ error: "Question is required" }, { status: 400 });
    }

    // Fetch real weather data
    const weather = await getWeather(location);

    const weatherContext = `
CURRENT WEATHER DATA FOR ${weather.location.toUpperCase()}:
Current conditions: ${weather.current.weather_description}, ${weather.current.temperature_f}°F (feels like ${weather.current.feels_like_f}°F)
Wind: ${weather.current.wind_mph} mph from the ${weather.current.wind_direction}
Humidity: ${weather.current.humidity}%
Current precipitation: ${weather.current.precipitation_in}"

7-DAY FORECAST:
${weather.daily.map((d) => `${d.day_name} (${d.date}): ${d.weather_description}, High ${d.high_f}°F / Low ${d.low_f}°F, ${d.precipitation_probability}% chance of precip (${d.precipitation_sum_in}"), wind gusts to ${d.wind_max_mph} mph`).join("\n")}
`;

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT + "\n\n" + weatherContext,
      messages: [{ role: "user", content: question }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    return Response.json({ response: text, location: weather.location });
  } catch (err) {
    console.error("Ask API error:", err);
    return Response.json(
      { error: "Something went wrong. Lloyd's checking the models..." },
      { status: 500 }
    );
  }
}
