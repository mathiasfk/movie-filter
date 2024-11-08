import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { discoverMovies, movieDetails } from '../api/movies';
import { DiscoverMovieParams,IMovie, IMovieDetails } from '../api/types';
import MovieDetails from '../components/MovieDetails';
import MovieList from '../components/MovieList';

const SinglePage: React.FC = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<IMovieDetails | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<DiscoverMovieParams | null>(null);
    const [showDetail, setShowDetail] = useState(false);

    const loadMovies = async (currentFilters: DiscoverMovieParams, currentPage = 1) => {
        if (loading) return;
        setLoading(true);
        try {
            const moviesData = await discoverMovies({ ...currentFilters, page: currentPage });
            setHasMore(moviesData.length > 0);
            setMovies(prev => currentPage === 1 ? moviesData : [...prev, ...moviesData]);
        } catch (err) {
            setError("Não foi possível carregar a lista de filmes.");
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (2 * window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight + 300 
            && hasMore && !loading && !showDetail) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    useEffect(() => {
        if (filters) loadMovies(filters, page);
    }, [filters, page]);

    const updateURLWithFilters = (currentFilters: DiscoverMovieParams) => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams();

        // Add filters to URL
        Object.entries(currentFilters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value.toString());
            }
        });

        // Updates URL without reloading
        window.history.replaceState({}, '', `${url.pathname}?${params.toString()}`);
    };

    const handleFilterChange = (newFilters: DiscoverMovieParams) => {
        setFilters(newFilters);
        setPage(1);
        setMovies([]);
        updateURLWithFilters(newFilters);
    };

    // Loads filters from URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const initialFilters: DiscoverMovieParams = {};

        urlParams.forEach((value: string, key: string) => {
            initialFilters[key as keyof DiscoverMovieParams] = value as any;
        });

        setFilters(initialFilters);
        setPage(1);
    }, []);

    const handleMovieSelect = async (movieId: number) => {
        setLoading(true);
        try {
            const movieData = await movieDetails(movieId);
            setSelectedMovie(movieData);
            setShowDetail(true);
            window.history.pushState(null, '', `/movie/${movieId}`);

            window.scrollTo(0, 0);
        } catch {
            setError("Não foi possível carregar os detalhes do filme.");
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const handlePopState = () => {
            setShowDetail(false);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    return (
        <div style={{ padding: '20px' }}>
            {!showDetail ? (
                <MovieList movies={movies} filters={filters || {}} onClickMovie={handleMovieSelect} onFilterChange={handleFilterChange} />
            ) : (
                selectedMovie && <MovieDetails movie={selectedMovie} />
            )}
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default SinglePage;
