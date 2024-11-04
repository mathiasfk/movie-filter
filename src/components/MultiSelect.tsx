import React from 'react';
import Select, { MultiValue } from 'react-select';

interface MultiSelectProps {
    label: string;
    onChange: (value: string[]) => void;
    options: { value: string; label: string }[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ label, onChange, options }) => {
    
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
                onChange={handleChange}
                className="filter-select"
            />
        </label>
    );
};

export default MultiSelect;
