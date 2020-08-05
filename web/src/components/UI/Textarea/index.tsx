import React, { TextareaHTMLAttributes } from 'react'

// CSS styles
import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    textareaLabel: string,
    textareaId: string
}

const Input: React.FC<TextareaProps> = ({ textareaLabel, textareaId, ...inputProps }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={textareaId}>{textareaLabel}</label>
            <textarea {...inputProps} id={textareaId} />
        </div>
    )
}

export default Input