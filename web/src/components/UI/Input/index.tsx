import React from 'react'

// CSS styles
import './styles.css'

interface InputProps {
    inputLabel: string,
    inputId: string,
    inputType?: string
}

const Input: React.FC<InputProps> = ({ inputLabel, inputId, inputType }) => {
    return (
        <div id="input">
            <label htmlFor={inputId}>{inputLabel}</label>
            <input type={inputType ? inputType : "text"} id={inputId} />
        </div>
    )
}

export default Input