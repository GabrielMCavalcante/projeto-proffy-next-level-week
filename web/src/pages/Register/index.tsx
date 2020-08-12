import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'

// Images
import logo from 'assets/images/logo.svg'

// Pages
import Login from './Login'
import Signup from './Signup'
import SignupComplete from './Signup/SignupComplete'

// CSS styles
import './styles.css'

function Register() {

    const history = useHistory()
    const [registerMethod, setRegisterMethod] = useState('login')

    useEffect(() => {
        if(history.location.pathname === '/auth/login' || history.location.pathname === '/auth')
            setRegisterMethod('login')
        else if(history.location.pathname === '/auth/cadastro') setRegisterMethod('signup')
        else if(history.location.pathname === '/auth/cadastro/sucesso') setRegisterMethod('success')
    }, [history.location.pathname])

    return (
        <div id="page-register" className={registerMethod === 'signup' ? 'invert' : ''}>
            {
                registerMethod !== 'success' && 
                
                <div id="page-register-header">
                    <img src={logo} alt="Proffy" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
            }
            <div id="page-register-content">
                <Switch>
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/cadastro/sucesso" component={SignupComplete} />
                    <Route path="/auth/cadastro" component={Signup} />
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </div>
    )
}

export default Register