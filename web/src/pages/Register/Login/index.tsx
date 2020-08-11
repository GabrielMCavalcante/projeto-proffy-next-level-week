import React from 'react'
import { Link } from 'react-router-dom'

// Images
import purpleHeartImg from 'assets/images/icons/purple-heart.svg'

// Icons
import { Icon } from '@iconify/react'
import showPasswordIcon from '@iconify/icons-mdi/eye'
// import hidePasswordIcon from '@iconify/icons-mdi/eye-off'

// CSS styles
import './styles.css'

function Login() {
    return (
        <div id="page-register-login">
            <h2>Fazer login</h2>
            <form>
                <div className="input-group">
                    <input type="email" id="email" placeholder="E-mail" />
                </div>

                <div className="input-group">
                    <input maxLength={30} type="password" id="password" placeholder="Senha" />
                    <Icon icon={showPasswordIcon} />
                </div>
            </form>

            <div id="user-actions">

                <label htmlFor="rememberMe">
                    <input type="checkbox" id="rememberMe" />
                    <span id="checkmark"></span>
                    Lembrar-me
                </label>

                <a id="forgot-password" href="/auth/login">Esqueci minha senha</a>

                <button>Entrar</button>

                <div id="no-account">
                    Não tem conta? <br />
                    <Link to="/auth/cadastro">Cadastre-se</Link>
                </div>

                <p>É de graça <img src={purpleHeartImg} alt="Coração roxo" /></p>
            </div>
        </div>
    )
}

export default Login