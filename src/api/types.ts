export interface Movie {
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
    primary_release_date_gte?: number;
    primary_release_date_lte?: number;
    sort_by?: string;
    vote_average_gte?: number;
    vote_count_gte?: number;
    with_genres?: number;
    without_genres?: number;
    with_original_language?: string;
}