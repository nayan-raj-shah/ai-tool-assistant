type StockCardProps = {
    symbol: string;
    price: number;
    open: number;
    high: number;
    low: number;
    volume: number;
    date: string;
    time: string;
};

export function StockCard({
    symbol,
    price,
    open,
    high,
    low,
    volume,
    date,
    time,
}: StockCardProps) {
    return (
        <div className="w-full max-w-sm mb-4 rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-lg font-semibold">📈 {symbol}</div>

            <div className="mt-2 text-3xl font-bold">
                ${price.toFixed(2)}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>Open: ${open.toFixed(2)}</div>
                <div>High: ${high.toFixed(2)}</div>
                <div>Low: ${low.toFixed(2)}</div>
                <div>Volume: {volume.toLocaleString()}</div>
            </div>

            <div className="mt-2 text-xs text-gray-500">
                {date} · {time}
            </div>
        </div>
    );
}