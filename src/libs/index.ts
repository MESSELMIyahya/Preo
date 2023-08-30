


// get color with num 

export function getColor(n:number):[string,string]{
    const colorsList: [string, string][] = [
        ["#06b6d4", "#3b82f6"],
        ["#22c55e", "#10b981"],
        ["#f9a8d4", "#c084fc"],
        ["#cbd5e1", "#64748b"],
        ["#404040", "#171717"],
        ["#fb923c", "#f87171"]
    ]
    return colorsList[n];
}