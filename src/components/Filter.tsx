import React, { useState } from 'react';
import FilterField from './FilterField';
import { DiscoverMovieParams } from '../api/types';
import './Filter.css';
import { generateYears } from '../utils/dates';

interface FilterProps {
    onFilterChange: (filters: DiscoverMovieParams) => void; // Função para passar os filtros
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
                label="Gênero a Incluir (ID)"
                type="number"
                value={includeGenre}
                onChange={setIncludeGenre}
            />
            <FilterField
                label="Gênero a Excluir (ID)"
                type="number"
                value={excludeGenre}
                onChange={setExcludeGenre}
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
