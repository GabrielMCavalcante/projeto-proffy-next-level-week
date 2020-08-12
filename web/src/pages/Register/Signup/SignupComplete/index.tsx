import React from 'react'
import { useHistory } from 'react-router-dom'

// Images
import checkInBoxImg from 'assets/images/icons/success-check-icon.svg'

// CSS styles
import './styles.css'

function SignupComplete() {

    const history = useHistory()

    return (
        <div id="signup-complete">
            <img src={checkInBoxImg} alt="Success Icon" />
            <h1>Cadastro concluído</h1>
            <p>
                Agora você faz parte da plataforma da Proffy.
                Tenha uma ótima experiência.
            </p>
            <button onClick={() => history.replace('/auth/login')}>Fazer login</button>
        </div>
    )
}

export default SignupComplete