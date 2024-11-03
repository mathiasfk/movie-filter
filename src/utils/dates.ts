export function generateYears(order: "asc" | "desc" = "desc"): string[] {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)
        .sort((a, b) => order === "asc" ? a - b : b - a)
        .map(y => y.toString())
}
