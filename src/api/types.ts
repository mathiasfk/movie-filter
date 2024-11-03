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
    primary_release_date_gte?: string;
    primary_release_date_lte?: string;
    sort_by?: string;
    vote_average_gte?: string;
    vote_count_gte?: string;
    with_genres?: string;
    without_genres?: string;
    with_original_language?: string;
}