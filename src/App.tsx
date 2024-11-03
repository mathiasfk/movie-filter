import React, { useEffect, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { discoverMovies } from './api/movies';
import { DiscoverMovieParams, Movie } from './api/types';
import MovieList from './components/MovieList';
import Filter from './components/Filter';

const App: React.FC = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadMovies = async (filters: DiscoverMovieParams) => {
        try {
            setLoading(true);
            const moviesData = await discoverMovies(filters); // Passa os filtros para a função
            setMovies(moviesData);
        } catch (error) {
            setError("Não foi possível carregar a lista de filmes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies({}); // Carrega todos os filmes na montagem do componente
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Lista de Filmes</h1>
            <Filter onFilterChange={loadMovies} />
            {loading && <p>Carregando filmes...</p>}
            {error && <p>{error}</p>}

            <MovieList movies={movies} />
            <SpeedInsights />
            <Analytics />
        </div>
    );
};

export default App;
