import React, { useState } from 'react';
import FilterField from './FilterField';
import { DiscoverMovieParams } from '../api/types';
import './Filter.css';
import { generateYears } from '../utils/dates';

interface FilterProps {
    onFilterChange: (filters: DiscoverMovieParams) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [minYear, setMinYear] = useState<string | undefined>();
    const [maxYear, setMaxYear] = useState<string | undefined>();
    const [includeGenre, setIncludeGenre] = useState<string | undefined>();
    const [excludeGenre, setExcludeGenre] = useState<string | undefined>();
    const [minVoteAverage, setMinVoteAverage] = useState<string | undefined>();
    const [sortBy, setSortBy] = useState<string | undefined>("popularity.desc");

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
        <div className="filter-container">
            <FilterField
                label="Ano Mínimo"
                type="select"
                value={minYear}
                onChange={setMinYear}
                options={["", ...generateYears("desc")]}
            />
            <FilterField
                label="Ano Máximo"
                type="select"
                value={maxYear}
                onChange={setMaxYear}
                options={["", ...generateYears("desc")]}
            />
            <FilterField
                label="Gênero a Incluir"
                type="select"
                value={includeGenre}
                onChange={setIncludeGenre}
                options={[
                    { key: "", value: "" },
                    { key: "28", value: "Ação" },
                    { key: "12", value: "Aventura" },
                    { key: "16", value: "Animação" },
                    { key: "35", value: "Comédia" },
                    { key: "80", value: "Crime" },
                    { key: "99", value: "Documentário" },
                    { key: "18", value: "Drama" },
                    { key: "10751", value: "Família" },
                    { key: "14", value: "Fantasia" },
                    { key: "36", value: "História" },
                    { key: "27", value: "Terror" },
                    { key: "10402", value: "Música" },
                    { key: "9648", value: "Mistério" },
                    { key: "10749", value: "Romance" },
                    { key: "878", value: "Ficção científica" },
                    { key: "10770", value: "Cinema TV" },
                    { key: "53", value: "Thriller" },
                    { key: "10752", value: "Guerra" },
                    { key: "37", value: "Faroeste" }
                ]}
            />
            <FilterField
                label="Gênero a Excluir"
                type="select"
                value={excludeGenre}
                onChange={setExcludeGenre}
                options={[
                    { key: "", value: "" },
                    { key: "28", value: "Ação" },
                    { key: "12", value: "Aventura" },
                    { key: "16", value: "Animação" },
                    { key: "35", value: "Comédia" },
                    { key: "80", value: "Crime" },
                    { key: "99", value: "Documentário" },
                    { key: "18", value: "Drama" },
                    { key: "10751", value: "Família" },
                    { key: "14", value: "Fantasia" },
                    { key: "36", value: "História" },
                    { key: "27", value: "Terror" },
                    { key: "10402", value: "Música" },
                    { key: "9648", value: "Mistério" },
                    { key: "10749", value: "Romance" },
                    { key: "878", value: "Ficção científica" },
                    { key: "10770", value: "Cinema TV" },
                    { key: "53", value: "Thriller" },
                    { key: "10752", value: "Guerra" },
                    { key: "37", value: "Faroeste" }
                ]}
            />
            <FilterField
                label="Nota Mínima"
                type="number"
                value={minVoteAverage}
                onChange={setMinVoteAverage}
            />
            <FilterField
                label="Ordenar por"
                type="select"
                value={sortBy}
                onChange={setSortBy}
                options={[
                    { key: "popularity.desc", value: "Popularidade (desc)" },
                    { key: "popularity.asc", value: "Popularidade (asc)" },
                    { key: "vote_average.desc", value: "Nota (desc)" },
                    { key: "vote_average.asc", value: "Nota (asc)" },
                    { key: "original_title.asc", value: "Título original (asc)" },
                    { key: "original_title.desc", value: "Título original (desc)" },
                    { key: "revenue.asc", value: "Receita (asc)" },
                    { key: "revenue.desc", value: "Receita (desc)" },
                    { key: "primary_release_date.asc", value: "Lançamento (asc)" },
                    { key: "primary_release_date.desc", value: "Lançamento (desc)" },
                    { key: "title.asc", value: "Título (asc)" },
                    { key: "title.desc", value: "Título (desc)" },
                    { key: "vote_count.asc", value: "Votos (asc)" },
                    { key: "vote_count.desc", value: "Votos (desc)" },
                ]}
            />
            <button onClick={handleFilterChange} className="filter-button">
                Filtrar
            </button>
        </div>
    );
};

export default Filter;
