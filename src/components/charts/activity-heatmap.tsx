"use client";



// Mock data for the last 52 weeks (approx 1 year)
const days = 365;
const today = new Date();
const data = Array.from({ length: days }).map((_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (days - i - 1));
    // Random intensity 0-4
    const intensity = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0; 
    return { date, intensity };
});

const getColor = (intensity: number) => {
    switch (intensity) {
        case 0: return "bg-slate-100 dark:bg-slate-800";
        case 1: return "bg-green-200 dark:bg-green-900";
        case 2: return "bg-green-400 dark:bg-green-700";
        case 3: return "bg-green-600 dark:bg-green-500";
        case 4: return "bg-green-800 dark:bg-green-300";
        default: return "bg-slate-100 dark:bg-slate-800";
    }
};

export function ActivityHeatmap() {
    return (
        <div className="w-full overflow-x-auto pb-2">
            <div className="flex gap-[3px] min-w-max">
                {/* Simplified visual representation: Columns of 7 days */}
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const dayData = data[weekIndex * 7 + dayIndex];
                            if (!dayData) return null;
                            return (
                                <div 
                                    key={dayIndex} 
                                    className={`w-3 h-3 rounded-sm ${getColor(dayData.intensity)}`}
                                    title={`${dayData.date.toDateString()}: ${dayData.intensity} contributions`}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800" />
                    <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900" />
                    <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
                    <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500" />
                    <div className="w-3 h-3 rounded-sm bg-green-800 dark:bg-green-300" />
                </div>
                <span>More</span>
            </div>
        </div>
    );
}
