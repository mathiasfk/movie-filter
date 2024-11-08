import React from 'react';

import { IMovieDetails } from '../api/types';

interface MovieDetailsProps {
    movie: IMovieDetails;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {

    const showOriginalTitle = movie.title !== movie.original_title;

    return (
    <div style={{ padding: '20px' }}>
        <h1>{movie.title}</h1>
        {showOriginalTitle && <h2>{movie.original_title}</h2>}
        <p><strong>Lançamento:</strong> {movie.release_date}</p>
        <p><strong>Gênero:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
        <p><strong>Nota:</strong> {movie.vote_average.toFixed(1)}</p>
        <p><strong>Votos:</strong> {movie.vote_count}</p>
        <p>{movie.overview}</p>
        <img src={'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path} alt={movie.title} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
)};

export default MovieDetails;
