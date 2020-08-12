import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// Icons
import { Icon } from '@iconify/react'
import showPasswordIcon from '@iconify/icons-mdi/eye'
import hidePasswordIcon from '@iconify/icons-mdi/eye-off'

// Images
import goBackImg from 'assets/images/icons/back.svg'

// CSS styles
import './styles.css'

function Signup() {

    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false)

    function signupUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

    }

    return (
        <div id="page-register-signup">
            <img 
                onClick={() => history.replace('/auth/login')} 
                src={goBackImg} 
                alt="Go back arrow-left"
            />
            <h2>Cadastro</h2>
            <p>Preencha os dados abaixo para começar.</p>
            <form onSubmit={signupUser}>
                <div className="input-group">
                    <input type="text" id="name" placeholder="Nome" />
                </div>

                <div className="input-group">
                    <input type="text" id="surname" placeholder="Sobrenome" />
                </div>

                <div className="input-group">
                    <input type="email" id="email" placeholder="E-mail" />
                </div>

                <div className="input-group">
                <input 
                        maxLength={30} 
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        placeholder="Senha" 
                    />
                    <div 
                        style={{cursor: 'pointer'}} 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <Icon 
                            color={showPassword ? '#8257E5' : '#6A6180'} 
                            icon={showPassword ? hidePasswordIcon : showPasswordIcon} 
                        />
                    </div>
                </div>

                <button type="submit">Concluir cadastro</button>
            </form>
        </div>
    )
}

export default Signup