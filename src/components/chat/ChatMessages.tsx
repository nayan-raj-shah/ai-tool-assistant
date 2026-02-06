import MessageBubble from "./MessageBubble";
import type { UIMessage } from "ai";
import WeatherCard from "./WeatherCard";
import RaceCard from "./RaceCard";
import { StockCard } from "./StockCard";

export default function ChatMessages({
    messages,
    isLoading,
}: {
    messages: UIMessage[];
    isLoading: boolean;
}) {
    console.log("messages:", messages,);
    return (
        <div className="flex-1 overflow-y-auto px-28 py-4 space-y-4 bg-muted/40">
            {messages.map((msg) => {
                const text = msg.parts
                    .filter((p) => p.type === "text")
                    .map((p) => p.text)
                    .join("");

                let weatherOutput:
                    | {
                        location: string;
                        temperature: string;
                        windSpeed: string;
                        weatherCode?: number;
                    }
                    | null = null;

                let f1Output:
                    | {
                        raceName: string;
                        circuit: string;
                        location: string;
                        date: string;
                        time?: string | null;
                    }
                    | null = null;
                
                let stockOutput:
                    | {
                        symbol: string;
                        price: number;
                        open: number;
                        high: number;
                        low: number;
                        volume: number;
                        date: string;
                        time: string;
                    }
                    | null = null;
                
                let error = null;
                for (const part of msg.parts) {
                    if (
                        part.type === "tool-getWeather" &&
                        part.state === "output-available"
                    ) {
                        weatherOutput = part.output as {
                            location: string;
                            temperature: string;
                            windSpeed: string;
                            weatherCode?: number;
                        };
                        break;
                    }

                    if (
                        part.type === "tool-getF1Matches" &&
                        part.state === "output-available"
                    ) {
                        f1Output = part.output as {
                            raceName: string;
                            circuit: string;
                            location: string;
                            date: string;
                            time?: string | null;
                        };
                        break;
                    }

                    if (
                        part.type === "tool-getStockPrice" &&
                        part.state === "output-available"
                    ) {
                        stockOutput = part.output as {
                            symbol: string;
                            price: number;
                            open: number;
                            high: number;
                            low: number;
                            volume: number;
                            date: string;
                            time: string;
                        };
                        break;
                    }

                    if (part.type === "tool-getStockPrice" && part.state === "output-error") {
                        error = "Unable to fetch stock data, please give clear stock symbol like AAPL, TSLA, MSFT etc.";
                        break;
                    }

                    if (part.type === "tool-getF1Matches" && part.state === "output-error") {
                        error = "Unable to fetch race data, please enter next F1 race";
                        break;
                    }

                    if (part.type === "tool-getWeather" && part.state === "output-error") {
                        error = "Unable to fetch weather data, please enter next city name";
                        break;
                    }
                }

                return (
                    <div key={msg.id} className="mb-3">
                        {text && (
                            <MessageBubble
                                role={msg.role}
                                content={text}
                            />
                        )}
                        {error && (
                            <div className="w-full max-w-sm text-red-500 border border-red-500 rounded p-2">
                                {error}
                            </div>
                        )}

                        {weatherOutput && (
                            <WeatherCard
                                location={weatherOutput.location}
                                temperature={weatherOutput.temperature}
                                windSpeed={weatherOutput.windSpeed}
                                weatherCode={weatherOutput.weatherCode}
                            />
                        )}

                        {f1Output && (
                            <RaceCard
                                raceName={f1Output.raceName}
                                circuit={f1Output.circuit}
                                location={f1Output.location}
                                date={f1Output.date}
                                time={f1Output.time}
                            />
                        )}

                        {stockOutput && (
                            <StockCard 
                                symbol={stockOutput.symbol}
                                price={stockOutput.price}
                                open={stockOutput.open}
                                high={stockOutput.high}
                                low={stockOutput.low}
                                volume={stockOutput.volume}
                                date={stockOutput.date}
                                time={stockOutput.time}
                            />
                        )}
                    </div>
                );
            })}

            {isLoading && (
                <MessageBubble
                    role="assistant"
                    content="Thinking…"
                />
            )}
        </div>
    );
}