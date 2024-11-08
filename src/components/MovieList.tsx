import React from 'react';
import { IMovie } from '../api/types';
import MovieCard from './MovieCard';
import './MovieList.css';

interface MovieListProps {
    movies: IMovie[];
    onClickMovie: (id: number) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onClickMovie }) => {
    return (
        <div className="container">
            {movies.length === 0 ? (
                <p>Nenhum filme encontrado.</p>
            ) : (
                movies.map((movie) => <MovieCard key={movie.id} movie={movie} onClick={onClickMovie}/>)
            )}
        </div>
    );
};

export default MovieList;
