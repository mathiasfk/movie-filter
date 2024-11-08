import React from 'react';
import Select, { MultiValue } from 'react-select';
import { isMobile } from '../utils/user';

interface MultiSelectProps {
    label: string;
    value: { value: string; label: string }[]
    onChange: (value: string[]) => void;
    options: { value: string; label: string }[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ label, value, onChange, options }) => {
    
    const handleChange = ((newValues: MultiValue<{
        value: string;
        label: string;
    }>,) => {
        const values = newValues ? newValues.map((option: any) => option.value) : [];
        onChange(values);
    });

    return (
        <label className="filter-label">
            {label}:
            <Select
                isMulti
                options={options}
                value={value}
                onChange={handleChange}
                className="filter-select"
                isSearchable={!isMobile()}
            />
        </label>
    );
};

export default MultiSelect;
