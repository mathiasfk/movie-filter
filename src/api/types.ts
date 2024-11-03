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
    page?: number;
    primary_release_date_gte?: number;
    sort_by?: string;
    without_genres: number;
    vote_average_gte: number;
    vote_counter_gte: number;
}