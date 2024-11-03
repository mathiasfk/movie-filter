import React from 'react';
import './Filter.css';

interface FilterFieldProps {
    label: string;
    type: string;
    value: string | undefined;
    onChange: (value: string | undefined) => void;
    options?: string[] | {key:string, value: string}[];
}

const FilterField: React.FC<FilterFieldProps> = ({ label, type, value, onChange, options }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    const kvOptions: {key: string, value: string}[] | undefined = Array.isArray(options) && typeof options[0] === 'string'
        ? (options as string[]).map((o) => ({ key: o, value: o }))
        : (options as {key: string, value: string}[]);

    return (
        <label className="filter-label">
            {label}:
            {type === 'select' ? (
                <select className="filter-select" value={value} onChange={handleChange}>
                    {kvOptions?.map((option: {key:string, value: string}) => (
                        <option key={option.key} value={option.key}>{option.value}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    className="filter-input"
                    value={value}
                    onChange={handleChange}
                />
            )}
        </label>
    );
};

export default FilterField;
