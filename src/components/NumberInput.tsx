import React from 'react';

interface NumberInputProps {
    label: string;
    value: string | undefined;
    onChange: (value: string | undefined) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange }) => {
    return (
        <label className="filter-label">
            {label}:
            <input
                type="number"
                className="filter-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    );
};

export default NumberInput;
