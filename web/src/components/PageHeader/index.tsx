import React from 'react'
import { Link } from 'react-router-dom'

// Images
import logoImg from 'assets/images/logo.svg'
import backIcon from 'assets/images/icons/back.svg'

// CSS styles
import './styles.css'

interface PageHeaderProps {
    title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Logo" />
            </div>

            <div className="header-content">
                <strong>{title}</strong>

                { children } 
            </div>
        </header>
    )
}

export default PageHeader