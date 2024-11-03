import React from 'react';
import { Movie } from '../api/types';
import MovieCard from './MovieCard';
import './MovieList.css';

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <div className="container">
            {movies.length === 0 ? (
                <p>Nenhum filme encontrado.</p>
            ) : (
                movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            )}
        </div>
    );
};

export default MovieList;
