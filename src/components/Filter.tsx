import React, { useState } from 'react';
import { DiscoverMovieParams } from '../api/types';

interface FilterProps {
    onFilterChange: (filters: DiscoverMovieParams) => void; // Função para passar os filtros
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [minYear, setMinYear] = useState<number | undefined>();
    const [maxYear, setMaxYear] = useState<number | undefined>();
    const [includeGenre, setIncludeGenre] = useState<number | undefined>();
    const [excludeGenre, setExcludeGenre] = useState<number | undefined>();
    const [minVoteAverage, setMinVoteAverage] = useState<number | undefined>();
    const [sortBy, setSortBy] = useState<string>("popularity.desc");

    const handleFilterChange = () => {
        onFilterChange({
            primary_release_date_gte: minYear,
            primary_release_date_lte: maxYear,
            with_genres: includeGenre,
            without_genres: excludeGenre,
            vote_average_gte: minVoteAverage,
            sort_by: sortBy,
        });
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <label>
                Ano Mínimo:
                <input
                    type="number"
                    value={minYear}
                    onChange={(e) => setMinYear(Number(e.target.value) || undefined)}
                />
            </label>
            <label>
                Ano Máximo:
                <input
                    type="number"
                    value={maxYear}
                    onChange={(e) => setMaxYear(Number(e.target.value) || undefined)}
                />
            </label>
            <label style={{ marginLeft: '10px' }}>
                Gênero a Incluir (ID):
                <input
                    type="number"
                    value={includeGenre}
                    onChange={(e) => setIncludeGenre(Number(e.target.value) || undefined)}
                />
            </label>
            <label style={{ marginLeft: '10px' }}>
                Gênero a Excluir (ID):
                <input
                    type="number"
                    value={excludeGenre}
                    onChange={(e) => setExcludeGenre(Number(e.target.value) || undefined)}
                />
            </label>
            <label style={{ marginLeft: '10px' }}>
                Média de Votos Mínima:
                <input
                    type="number"
                    value={minVoteAverage}
                    onChange={(e) => setMinVoteAverage(Number(e.target.value) || undefined)}
                />
            </label>
            <label style={{ marginLeft: '10px' }}>
                Ordernar por:
                <input
                    type="string"
                    value={minVoteAverage}
                    onChange={(e) => setMinVoteAverage(Number(e.target.value) || undefined)}
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="original_title.asc">original_title.asc</option>
                    <option value="original_title.desc">original_title.desc</option>
                    <option value="popularity.asc">popularity.asc</option>
                    <option value="popularity.desc">popularity.desc</option>
                    <option value="revenue.asc">revenue.asc</option>
                    <option value="revenue.desc">revenue.desc</option>
                    <option value="primary_release_date.asc">primary_release_date.asc</option>
                    <option value="title.asc">title.asc</option>
                    <option value="title.desc">title.desc</option>
                    <option value="primary_release_date.desc">primary_release_date.desc</option>
                    <option value="vote_average.asc">vote_average.asc</option>
                    <option value="vote_average.desc">vote_average.desc</option>
                    <option value="vote_count.asc">vote_count.asc</option>
                    <option value="vote_count.desc">vote_count.desc</option>
                </select>
            </label>
            <button onClick={handleFilterChange} style={{ marginLeft: '10px' }}>
                Filtrar
            </button>
        </div>
    );
};

export default Filter;
