import {
    streamText,
    convertToModelMessages,
    tool,
} from "ai";
import { groq } from "@ai-sdk/groq";
import { auth } from "@/lib/auth";
import { z } from "zod";

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { messages } = await req.json();
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
        model: groq("llama-3.1-8b-instant"),

        system: `
You are a helpful assistant.

Rules:
- Use getWeather for weather-related questions.
- Use getF1Matches for Formula 1 or race schedule questions.
- Use getStockPrice for stock price inquiries.
- Always summarize the result in plain English.
`,

        messages: modelMessages,

        tools: {
            getWeather: tool({
                description: "Get current weather for a city",
                inputSchema: z.object({
                    city: z.string().describe("City name, e.g. London"),
                }),

                execute: async ({ city }: { city: string }) => {
                    try {
                        // 1️⃣ Geocode city → lat/lon
                        const geoRes = await fetch(
                            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                                city
                            )}&count=1`
                        );
                        const geo = await geoRes.json();
                        if (!geo.results?.length) {
                            return {
                                error: `Could not find location: ${city}`,
                            };
                        }

                        const { latitude, longitude, name, country } = geo.results[0];

                        // 2️⃣ Fetch weather
                        const weatherRes = await fetch(
                            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                        );
                        const weather = await weatherRes.json();
                        if (!weather.current_weather) {
                            return {
                                error: `Could not fetch weather for: ${city}`,
                            };
                        }

                        const current = weather.current_weather;
                        return {
                            location: `${name}, ${country}`,
                            temperature: `${current.temperature}°C`,
                            windSpeed: `${current.windspeed} km/h`,
                            weatherCode: current.weathercode,
                        };
                    } catch (error) {
                        console.error("Error in getWeather tool:", error);
                        return {
                            error: "An error occurred while fetching weather data. Please try again later."
                        };
                    }
                },
            }),
            getF1Matches: tool({
                description: "Get the next Formula 1 race",
                inputSchema: z.object({}),

                execute: async () => {
                    const res = await fetch(
                        "https://api.jolpi.ca/ergast/f1/current/next.json"
                    );

                    if (!res.ok) {
                        return { error: "Failed to fetch F1 race data" };
                    }

                    const data = await res.json();
                    const race = data?.MRData?.RaceTable?.Races?.[0];

                    if (!race) {
                        return { error: "No upcoming F1 race found" };
                    }

                    return {
                        raceName: race.raceName,
                        circuit: race.Circuit.circuitName,
                        location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
                        date: race.date,
                        time: race.time ?? null,
                    };
                },
            }),
            getStockPrice: tool({
                description: "Get the latest stock price for a company",
                inputSchema: z.object({
                    symbol: z
                        .string()
                        .describe("Stock symbol, e.g. AAPL, TSLA, MSFT"),
                }),

                execute: async ({ symbol }) => {
                    try {
                        const res = await fetch(
                            `https://stooq.com/q/l/?s=${symbol.toUpperCase()}.US&f=sd2t2ohlcv&h&e=json`
                        );

                        if (!res.ok) {
                            return { error: "Failed to fetch stock price" };
                        }

                        const data = await res.json();
                        const stock = data?.symbols?.[0];

                        if (!stock || stock.close == null) {
                            return { error: "Stock symbol not found or unavailable" };
                        }

                        return {
                            symbol: stock.symbol,
                            price: stock.close,
                            open: stock.open,
                            high: stock.high,
                            low: stock.low,
                            volume: stock.volume,
                            date: stock.date,
                            time: stock.time,
                        };
                    } catch (error) {
                        return { error: "Unable to fetch stock data" };
                    }
                },
            }),
        },
    });

    return result.toUIMessageStreamResponse();
}