export const sortByDictionary: { [key: string]: string } = {
    "popularity.desc": "Popularidade ▼",
    "popularity.asc": "Popularidade ▲",
    "vote_average.desc": "Nota ▼",
    "vote_average.asc": "Nota ▲",
    "vote_count.desc": "Votos ▼",
    "vote_count.asc": "Votos ▲",
    "title.asc": "Título ▲",
    "title.desc": "Título ▼",
    "original_title.asc": "Título original ▲",
    "original_title.desc": "Título original ▼",
    "revenue.asc": "Receita ▲",
    "revenue.desc": "Receita ▼",
    "primary_release_date.asc": "Lançamento ▲",
    "primary_release_date.desc": "Lançamento ▼"
};

export function getSortByLabel(sortBy: string): string {
    sortByDictionary[sortBy] ?? console.warn(`Unknown sort criteria: ${sortBy}`);
    return sortByDictionary[sortBy] || "Opção desconhecida";
}

export function getSortBySelectedOption(selectedValue: string|undefined){
    if(selectedValue === undefined || selectedValue === ""){
        return undefined;
    }
    return ({value: selectedValue, label: getSortByLabel(selectedValue)});
}