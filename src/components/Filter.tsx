import React from 'react';
import MultiSelect from './MultiSelect';
import SingleSelect from './SingleSelect';
import NumberInput from './NumberInput';
import { DiscoverMovieParams } from '../api/types';
import './Filter.css';
import { generateYears } from '../utils/dates';
import { genreDictionary, getGenreSelectedOptions } from '../utils/genre';
import { sortByDictionary } from '../utils/sortBy';

interface FilterProps {
    filters: DiscoverMovieParams;
    onFilterChange: (filters: DiscoverMovieParams) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, onFilterChange }) => {

    const handleFilterChange = (key: keyof DiscoverMovieParams, value: any) => {
        onFilterChange({
            ...filters,
            [key]: value
        });
    };

    const yearOptions = ["", ...generateYears("desc")].map(year => ({ value: year, label: year }));
    const genreOptions = Object.entries(genreDictionary).map(([key, value]) => ({ value: key, label: value }));
    const sortByOptions = Object.entries(sortByDictionary).map(([key, value]) => ({ value: key, label: value }));

    const optionOrUndefined = (value: string|undefined, label: string|undefined = undefined) => value !== undefined ? {value: value, label: label ?? value} : undefined

    return (
        <div className="filter-container">
            <SingleSelect
                label="Ano Mínimo"
                value={optionOrUndefined(filters.primary_release_date_gte)}
                onChange={(value) => handleFilterChange('primary_release_date_gte', value)}
                options={yearOptions}
            />
            <SingleSelect
                label="Ano Máximo"
                value={optionOrUndefined(filters.primary_release_date_lte)}
                onChange={(value) => handleFilterChange('primary_release_date_lte', value)}
                options={yearOptions}
            />
            <MultiSelect
                label="Gêneros a Incluir"
                value={getGenreSelectedOptions(filters.with_genres)}
                onChange={(value) => handleFilterChange('with_genres', value.join(','))}
                options={genreOptions}
            />
            <MultiSelect
                label="Gêneros a Excluir"
                value={getGenreSelectedOptions(filters.without_genres)}
                onChange={(value) => handleFilterChange('without_genres', value.join(','))}
                options={genreOptions}
            />
            <NumberInput
                label="Nota Mínima"
                value={filters.vote_average_gte || ''}
                onChange={(value) => handleFilterChange('vote_average_gte', value)}
            />
            <SingleSelect
                label="Ordenar por"
                value={optionOrUndefined(filters.sort_by)}
                onChange={(value) => handleFilterChange('sort_by', value)}
                options={sortByOptions}
            />
            <button onClick={() => onFilterChange(filters)} className="filter-button">
                Filtrar
            </button>
        </div>
    );
};

export default Filter;
