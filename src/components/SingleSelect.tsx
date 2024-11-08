import React from 'react';
import Select, { SingleValue } from 'react-select';

import { isMobile } from '../utils/user';

interface SelectProps {
    label: string;
    value: {label: string, value: string} | undefined;
    onChange: (value: string | undefined) => void;
    options: { value: string; label: string }[];
}

const SingleSelect: React.FC<SelectProps> = ({ label, value, onChange, options }) => {

    const handleChange = (newValue: SingleValue<{label: string, value: string}>, ) => {
        onChange(newValue?.value);
    };

    return (
        <label className="filter-label">
            {label}:
            <Select
                options={options}
                value={value}
                onChange={handleChange}
                className="filter-select"
                isClearable
                isSearchable={!isMobile()}
            />
        </label>
    );
};

export default SingleSelect;
