import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios-config'

// Contexts
import { useAuth } from 'contexts/auth'

// Images
import logo from 'assets/images/logo.svg'
import menu from 'assets/images/landing.svg'
import studyIcon from 'assets/images/icons/study.svg'
import giveClassesIcon from 'assets/images/icons/give-classes.svg'
import purpleHeartIcon from 'assets/images/icons/purple-heart.svg'
import signoutIcon from 'assets/images/icons/signout.svg';

// CSS styles
import './styles.css'

function Menu() {
    const [feedback, setFeedback] = useState('Carregando conexões...')
    const [error, setError] = useState(true)
    const authContext = useAuth()

    useEffect(() => {
        (function fetchConnections() {
            axios.get('/connections', {
                headers: { authorization: 'Bearer ' + authContext.token }
            }).then(response => {
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
    }, []) // eslint-disable-line

    return (
        <div id="page-menu">
            <div id="page-menu-top">
                <div id="page-menu-header">
                    <div id="user-avatar">
                        <img src={authContext.user!.avatar!} alt="User Avatar" />
                        <p>{authContext.user?.name}</p>
                    </div>

                    <img id="user-signout" src={signoutIcon} alt="Signout" />
                </div>

                <div id="page-menu-logo">
                    <div className="logo-container">
                        <img src={logo} alt="Proffy" />
                        <h2>Sua plataforma de estudos online.</h2>
                    </div>

                    <img src={menu} alt="Plataforma de estudos" className="hero-image" />
                </div>
            </div>

            <div id="page-menu-bottom">
                <div id="welcome-text">
                    <p>Seja bem-vindo.</p>
                    <p id="what-todo">O que deseja fazer?</p>
                </div>
                <div id="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/teach" className="teach">
                        <img src={giveClassesIcon} alt="Ensinar" />
                        Ensinar
                    </Link>
                </div>

                <span id="total-connections">
                    {feedback}
                    {!error && <img src={purpleHeartIcon} alt="Coração roxo" />}
                </span>
            </div>
        </div>
    )
}

export default Menu