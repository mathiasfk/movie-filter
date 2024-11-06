import React, { useEffect, useState } from 'react';
import { discoverMovies } from '../api/movies';
import { DiscoverMovieParams, Movie } from '../api/types';
import MovieList from '../components/MovieList';
import Filter from '../components/Filter';
import MovieDetailsPage from './MovieDetailsPage';
import { useNavigate } from 'react-router-dom';

const MovieListPage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [filters, setFilters] = useState<DiscoverMovieParams | null>(null);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<number>(0);

    const loadMovies = async (currentFilters: DiscoverMovieParams, currentPage: number = 1) => {
        if (loading) return;
        try {
            setLoading(true);
            const moviesData = await discoverMovies({ ...currentFilters, page: currentPage });
            setHasMore(moviesData.length > 0);
            setMovies(prevMovies => (currentPage === 1 ? moviesData : [...prevMovies, ...moviesData]));
        } catch (error) {
            setError("Não foi possível carregar a lista de filmes.");
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            2 * window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight + 300 &&
            !loading
        ) {
            if(hasMore)
                setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    useEffect(() => {
        if (filters) {
            loadMovies(filters, page);
        }
    }, [page, filters]);

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

    const onClickMovie = (id: number) => {
        setShowDetail(true);
        setMovieId(id);
        window.history.pushState(null, '', `/movie/${id}`);
    }

    const navigate = useNavigate();

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            setShowDetail(false);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    return (
        <div style={{ padding: '20px' }}>
            {!showDetail && <h1>Lista de Filmes</h1>}
            {!showDetail && filters && <Filter filters={filters} onFilterChange={handleFilterChange} />}
            {(!showDetail && loading) && <p>Carregando filmes...</p>}
            {(!showDetail && error) && <p>{error}</p>}

            {!showDetail ? (
                <MovieList movies={movies} onClickMovie={onClickMovie} />
            ) : (
                <MovieDetailsPage id={movieId.toString()} />
            )}
        </div>
    );
};

export default MovieListPage;
