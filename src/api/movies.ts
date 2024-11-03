import { Movie, DiscoverMovieParams } from "./types";

const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const discoverMovies = async (filters: Partial<DiscoverMovieParams>): Promise<Movie[]> => {
    const url = new URL(API_BASE_URL);


    if (filters.primary_release_date_gte) url.searchParams.append("primary_release_date.gte", filters.primary_release_date_gte.toString());
    if (filters.without_genres) url.searchParams.append("genre", filters.without_genres.toString());

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
