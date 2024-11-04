import React, { useEffect, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { discoverMovies } from './api/movies';
import { DiscoverMovieParams, Movie } from './api/types';
import MovieList from './components/MovieList';
import Filter from './components/Filter';

const App: React.FC = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [filters, setFilters] = useState<DiscoverMovieParams>({});

    const loadMovies = async (filters: DiscoverMovieParams, page: number = 1) => {
        if(loading) return;
        try {
            setLoading(true);
            const moviesData = await discoverMovies({...filters, page});
            setMovies(prevMovies => page === 1 ? moviesData : [...prevMovies, ...moviesData]);
        } catch (error) {
            setError("Não foi possível carregar a lista de filmes.");
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            2 * window.innerHeight + document.documentElement.scrollTop 
            >= document.documentElement.offsetHeight + 300 && !loading
        ) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    useEffect(() => {
        loadMovies(filters, page);
    }, [page, filters]);

    const handleFilterChange = (newFilters: DiscoverMovieParams) => {
        setFilters(newFilters);
        setPage(1);
        setMovies([]);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Lista de Filmes</h1>
            <Filter onFilterChange={handleFilterChange} />
            {loading && <p>Carregando filmes...</p>}
            {error && <p>{error}</p>}

            <MovieList movies={movies} />
            <SpeedInsights />
            <Analytics />
        </div>
    );
};

export default App;
