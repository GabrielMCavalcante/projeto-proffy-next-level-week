import React from 'react'

// CSS styles
import './styles.css'

interface InputInfoProps {
    info: string,
    show?: boolean
}

const InputInfo: React.FC<InputInfoProps> = ({ info, show }) => {
    return (
        <div className={["input-info", show ? 'show' : 'hide'].join(' ')}>
            <p className="input-info-text">{ info }</p>
        </div>
    )
}

export default InputInfo