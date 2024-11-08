export interface IMovie {
    id: number;
    title: string;
    adult: boolean;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface DiscoverMovieParams {
    include_adult?: boolean;
    include_video?: boolean;
    language?: string;
    page?: number;
    primary_release_date_gte?: string;
    primary_release_date_lte?: string;
    sort_by?: string;
    vote_average_gte?: string;
    vote_count_gte?: string;
    with_genres?: string;
    without_genres?: string;
    with_original_language?: string;
}

export interface IMovieDetails {
    id: number;
    title: string;
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any[];
    budget: number;
    genres: {id: number, name: string}[];
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {id: number, logo_path: string, name: string, origin_country: string}[]
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {english_name: string, iso_639_1: string, name: string}[];
    status: string;
    tagline: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}