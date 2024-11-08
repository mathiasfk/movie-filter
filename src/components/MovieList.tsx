import React from 'react';
import { DiscoverMovieParams, IMovie } from '../api/types';
import MovieCard from './MovieCard';
import './MovieList.css';
import Filter from './Filter';

interface MovieListProps {
    movies: IMovie[];
    filters: DiscoverMovieParams;
    onClickMovie: (id: number) => void;
    onFilterChange: (newFilters: DiscoverMovieParams) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, filters, onClickMovie, onFilterChange }) => {
    return (
        <div>
            <h1>Lista de Filmes</h1>
            <Filter filters={filters || {}} onFilterChange={onFilterChange} />
            <div className="container">
            {movies.length === 0 ? (
                <p>Nenhum filme encontrado.</p>
            ) : (
                movies.map((movie) => <MovieCard key={movie.id} movie={movie} onClick={onClickMovie}/>)
            )}
            </div>
        </div>
    );
};

export default MovieList;
