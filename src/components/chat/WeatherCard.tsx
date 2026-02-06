type WeatherCardProps = {
    location: string;
    temperature: string;
    windSpeed: string;
    weatherCode?: number;
};

function getWeatherEmoji(code?: number) {
    if (code === undefined) return "🌡️";
    if (code < 3) return "☀️";
    if (code < 50) return "⛅";
    if (code < 70) return "🌧️";
    return "🌨️";
}

export default function WeatherCard({
    location,
    temperature,
    windSpeed,
    weatherCode,
}: WeatherCardProps) {
    return (
        <div className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-sm">
            <div className="text-sm text-muted-foreground">Current Weather</div>

            <div className="mt-1 text-lg font-semibold">{location}</div>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-4xl">
                        {getWeatherEmoji(weatherCode)}
                    </div>
                    <div className="text-4xl font-bold">
                        {temperature}
                    </div>
                </div>

                <div className="text-right text-sm text-muted-foreground">
                    <div>Wind</div>
                    <div>{windSpeed}</div>
                </div>
            </div>
        </div>
    );
}