import React from 'react';
import Select, { SingleValue } from 'react-select';

interface SelectProps {
    label: string;
    onChange: (value: string | undefined) => void;
    options: { value: string; label: string }[];
}

const SingleSelect: React.FC<SelectProps> = ({ label, onChange, options }) => {

    const handleChange = (newValue: SingleValue<{label: string, value: string}>, ) => {
        onChange(newValue?.value);
    };

    return (
        <label className="filter-label">
            {label}:
            <Select
                options={options}
                onChange={handleChange}
                className="filter-select"
            />
        </label>
    );
};

export default SingleSelect;
