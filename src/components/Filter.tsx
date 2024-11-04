import React, { useState } from 'react';
import MultiSelect from './MultiSelect';
import SingleSelect from './SingleSelect';
import NumberInput from './NumberInput';
import { DiscoverMovieParams } from '../api/types';
import './Filter.css';
import { generateYears } from '../utils/dates';
import { genres } from '../utils/genre';

interface FilterProps {
    onFilterChange: (filters: DiscoverMovieParams) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [minYear, setMinYear] = useState<string | undefined>();
    const [maxYear, setMaxYear] = useState<string | undefined>();
    const [includeGenres, setIncludeGenres] = useState<string[]>([]);
    const [excludeGenres, setExcludeGenres] = useState<string[]>([]);
    const [minVoteAverage, setMinVoteAverage] = useState<string | undefined>();
    const [sortBy, setSortBy] = useState<string | undefined>("popularity.desc");

    const handleFilterChange = () => {
        onFilterChange({
            primary_release_date_gte: minYear,
            primary_release_date_lte: maxYear,
            with_genres: includeGenres.join(','),
            without_genres: excludeGenres.join(','),
            vote_average_gte: minVoteAverage,
            sort_by: sortBy,
        });
    };

    const yearOptions: {value: string, label: string}[] = ["", ...generateYears("desc")].map((year: string) => ({value: year, label: year}));
    const genreOptions: {value: string, label: string}[] = Object.entries(genres).map(([key, value]) => ({value: key, label: value}));
    const popularityOptions: {value: string, label: string}[] = [
        { value: "popularity.desc", label: "Popularidade (desc)" },
        { value: "popularity.asc", label: "Popularidade (asc)" },
        { value: "vote_average.desc", label: "Nota (desc)" },
        { value: "vote_average.asc", label: "Nota (asc)" },
        { value: "original_title.asc", label: "Título original (asc)" },
        { value: "original_title.desc", label: "Título original (desc)" },
        { value: "revenue.asc", label: "Receita (asc)" },
        { value: "revenue.desc", label: "Receita (desc)" },
        { value: "primary_release_date.asc", label: "Lançamento (asc)" },
        { value: "primary_release_date.desc", label: "Lançamento (desc)" },
        { value: "title.asc", label: "Título (asc)" },
        { value: "title.desc", label: "Título (desc)" },
        { value: "vote_count.asc", label: "Votos (asc)" },
        { value: "vote_count.desc", label: "Votos (desc)" },
    ]

    return (
        <div className="filter-container">
            <SingleSelect
                label="Ano Mínimo"
                onChange={setMinYear}
                options={yearOptions}
            />
            <SingleSelect
                label="Ano Máximo"
                onChange={setMaxYear}
                options={yearOptions}
            />
            <MultiSelect
                label="Gêneros a Incluir"
                onChange={setIncludeGenres}
                options={genreOptions}
            />
            <MultiSelect
                label="Gêneros a Excluir"
                onChange={setExcludeGenres}
                options={genreOptions}
            />
            <NumberInput
                label="Nota Mínima"
                value={minVoteAverage}
                onChange={setMinVoteAverage}
            />
            <SingleSelect
                label="Ordenar por"
                onChange={setSortBy}
                options={popularityOptions}
            />
            <button onClick={handleFilterChange} className="filter-button">
                Filtrar
            </button>
        </div>
    );
};

export default Filter;
