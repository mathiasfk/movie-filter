import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieDetails } from '../api/movies';
import { MovieDetails } from '../api/types';

const MovieDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieData = await movieDetails(id ? parseInt(id) : 0);
                setMovie(movieData);
            } catch (err) {
                setError("Não foi possível carregar os detalhes do filme.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) return <p>Carregando detalhes do filme...</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return <p>Filme não encontrado.</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{movie?.title}</h1>
            <p>{movie?.overview}</p>
            {loading && <p>Carregando filmes...</p>}
            {error && <p>{error}</p>}
            <img src={'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path} alt={movie.title} style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
    );
};

export default MovieDetailsPage;
