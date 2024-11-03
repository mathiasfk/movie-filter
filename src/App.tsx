import React, { useEffect, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { discoverMovies, Movie } from './api/movies';

const App: React.FC = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);
                const moviesData = await discoverMovies({});
                setMovies(moviesData);
            } catch (error) {
                setError("Não foi possível carregar a lista de filmes.");
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Lista de Filmes</h1>

            {loading && <p>Carregando filmes...</p>}
            {error && <p>{error}</p>}

            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
            <SpeedInsights />
            <Analytics />
        </div>
    );
};

export default App;
