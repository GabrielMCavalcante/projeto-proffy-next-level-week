import React, { InputHTMLAttributes } from 'react'

// CSS styles
import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputLabel: string,
    inputId: string
}

const Input: React.FC<InputProps> = ({ inputLabel, inputId, ...inputProps }) => {
    return (
        <div className="input-block">
            <label htmlFor={inputId}>{inputLabel}</label>
            <input {...inputProps} id={inputId} />
        </div>
    )
}

export default Input