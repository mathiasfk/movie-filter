import { Movie, DiscoverMovieParams } from "./types";

const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const discoverMovies = async (filters: Partial<DiscoverMovieParams>): Promise<Movie[]> => {
    const url = new URL(API_BASE_URL);

    if (filters.primary_release_date_gte) url.searchParams.append("primary_release_date.gte", filters.primary_release_date_gte.toString() + '-01-01');
    if (filters.primary_release_date_lte) url.searchParams.append("primary_release_date.lte", filters.primary_release_date_lte.toString() + '-12-31');
    
    if (filters.with_genres && filters.with_genres !== "") url.searchParams.append("with_genres", filters.with_genres.toString());
    if (filters.without_genres && filters.with_genres !== "") url.searchParams.append("without_genres", filters.without_genres.toString());

    if (filters.vote_average_gte) url.searchParams.append("vote_average.gte", filters.vote_average_gte.toString());

    if (filters.sort_by) url.searchParams.append("sort_by", filters.sort_by.toString());

    if(filters.page) url.searchParams.append("page", filters.page.toString());

    // Fixed filters
    url.searchParams.append("vote_count.gte", "50");
    url.searchParams.append("include_adult", "false");
    url.searchParams.append("include_video", "false");
    url.searchParams.append("language", "pt-BR")

    try {
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: Não foi possível carregar a lista de filmes.`);
        }

        const data = await response.json();
        return data.results as Movie[];
    } catch (error) {
        console.error("Erro ao carregar a lista de filmes: ", error);
        return [];
    }
};
