import React from 'react';
import { Movie } from '../api/types';
import './MovieCard.css';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="card">
            <img src={'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path} alt={movie.title}/>
            <h2>{movie.title}</h2>
            <p>{movie.overview.length > 300 ? movie.overview.substring(0,300) + '...' : movie.overview}</p>
            <p><strong>Lançamento:</strong> {movie.release_date}</p>
            <p><strong>Nota:</strong> {movie.vote_average.toFixed(1)}</p>
            <p><strong>Votos:</strong> {movie.vote_count}</p>
            <p><strong>Gênero:</strong> {movie.genre_ids.join(', ')}</p>
        </div>
    );
};

export default MovieCard;
