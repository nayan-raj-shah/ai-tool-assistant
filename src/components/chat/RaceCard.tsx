type RaceCardProps = {
    raceName: string;
    circuit: string;
    location: string;
    date: string;
    time?: string | null;
};

export default function RaceCard({
    raceName,
    circuit,
    location,
    date,
    time,
}: RaceCardProps) {
    return (
        <div className="w-full max-w-sm mb-4 rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-lg font-semibold">🏁 {raceName}</div>

            <div className="mt-1 text-sm text-gray-600">
                {circuit}
            </div>

            <div className="text-sm text-gray-500">
                {location}
            </div>

            <div className="mt-2 text-sm">
                📅 {date}
                {time && <> · ⏰ {time.replace("Z", " UTC")}</>}
            </div>
        </div>
    );
}