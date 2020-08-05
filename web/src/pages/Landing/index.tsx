import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios-config'

// Images
import logo from 'assets/images/logo.svg'
import landing from 'assets/images/landing.svg'
import studyIcon from 'assets/images/icons/study.svg'
import giveClassesIcon from 'assets/images/icons/give-classes.svg'
import purpleHeartIcon from 'assets/images/icons/purple-heart.svg'

// CSS styles
import './styles.css'

function Landing() {
    const [feedback, setFeedback] = useState('Carregando conexões...')
    const [error, setError] = useState(true)

    useEffect(() => {
        (function fetchConnections() {
            axios.get('/connections').then(response => {
                const totalConnections = response.data.total
                setError(false)
                setFeedback(`
                    Total de ${totalConnections}
                    ${totalConnections === 1 ? "conexão" : "conexões"} já
                    ${totalConnections === 1 ? "realizada" : "realizadas"}
                `)
            }).catch(() => {
                setError(true)
                setFeedback('Não foi possível recuperar o total de conexões :(')
            })
        })()
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logo} alt="Proffy" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img src={landing} alt="Plataforma de estudos" className="hero-image" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/teach" className="teach">
                        <img src={giveClassesIcon} alt="Ensinar" />
                        Ensinar
                    </Link>
                </div>

                <span className="total-connections">
                    {feedback}
                    {!error && <img src={purpleHeartIcon} alt="Coração roxo" />}
                </span>
            </div>
        </div>
    )
}

export default Landing