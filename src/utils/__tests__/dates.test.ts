import { generateYears, localizeDate } from '../dates';

describe("generateYears", () => {
    it("should return years in descending order by default", () => {
        const years = generateYears();

        expect(years[0]).toBe(new Date().getFullYear().toString());
        expect(parseInt(years[1])).toBeLessThan(parseInt(years[0]));
    });

    it("should return years in ascending order when specified", () => {
        const years = generateYears("asc");

        expect(years[0]).toBe("1900");
        expect(parseInt(years[1])).toBeGreaterThan(parseInt(years[0]));
    });
});

describe("localizeDate", () => {
    it("should return a localized date string", () => {
        const isoDate = "2023-01-01";
        const localizedDate = localizeDate(isoDate);
        
        expect(localizedDate).toBe(new Date(isoDate).toLocaleDateString());
    });
});
