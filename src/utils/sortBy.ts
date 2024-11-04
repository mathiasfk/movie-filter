export const sortByDictionary: { [key: string]: string } = {
    "popularity.desc": "Popularidade (desc)",
    "popularity.asc": "Popularidade (asc)",
    "vote_average.desc": "Nota (desc)",
    "vote_average.asc": "Nota (asc)",
    "original_title.asc": "Título original (asc)",
    "original_title.desc": "Título original (desc)",
    "revenue.asc": "Receita (asc)",
    "revenue.desc": "Receita (desc)",
    "primary_release_date.asc": "Lançamento (asc)",
    "primary_release_date.desc": "Lançamento (desc)",
    "title.asc": "Título (asc)",
    "title.desc": "Título (desc)",
    "vote_count.asc": "Votos (asc)",
    "vote_count.desc": "Votos (desc)"
};

export function getSortByLabel(sortBy: string): string {
    sortByDictionary[sortBy] ?? console.warn(`Unknown sort criteria: ${sortBy}`);
    return sortByDictionary[sortBy] || "Opção desconhecida";
}