import React from 'react';

import { IMovieDetails } from '../api/types';

interface MovieDetailsProps {
    movie: IMovieDetails;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => (
    <div style={{ padding: '20px' }}>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <img src={'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path} alt={movie.title} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
);

export default MovieDetails;
