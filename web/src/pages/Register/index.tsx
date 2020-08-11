import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// Images
import logo from 'assets/images/logo.svg'

// Pages
import Login from './Login'
import Signup from './Signup'

// CSS styles
import './styles.css'

function Register() {
    return (
        <div id="page-register">
            <div id="page-register-header">
                <img src={logo} alt="Proffy" />
                <h2>Sua plataforma de estudos online.</h2>
            </div>
            <div id="page-register-content">
                <Switch>
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/cadastro" component={Signup} />
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </div>
    )
}

export default Register