import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Components
import InputInfo from 'components/InputInfo'

// Images
import purpleHeartImg from 'assets/images/icons/purple-heart.svg'

// Icons
import { Icon } from '@iconify/react'
import showPasswordIcon from '@iconify/icons-mdi/eye'
import hidePasswordIcon from '@iconify/icons-mdi/eye-off'
import infoIcon from '@iconify/icons-mdi/information-outline'

// CSS styles
import './styles.css'

// Interfaces
import { FormFields } from 'interfaces/forms'

const initialFields = {
    email: {
        value: '',
        validation: /^[a-z-_\d.]{3,}@[a-z]{3,}(\.com|\.br|\.com\.br)$/i,
        valid: false,
        info: 'O email precisa estar no formato adequado: exemplo@dominio.com',
        showInfo: "initial",
        touched: false
    },
    password: {
        value: '',
        validation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
        valid: false,
        info: 'A senha precisa conter entre 8 a 30 caracteres',
        showInfo: "initial",
        touched: false
    }
}

function Login() {

    const [showPassword, setShowPassword] = useState(false)
    const [fields, setFields] = useState<FormFields>(initialFields as FormFields)
    const [formValid, setFormValid] = useState(false)

    function onInputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputIdentifier = e.target.id
        const newInputValue = e.target.value

        const allFields = Object.keys(fields)

        let isFormValid = true
        const isInputValid = fields[inputIdentifier].validation.test(newInputValue)

        if (isInputValid) {
            allFields.forEach(field => {
                if (isFormValid)
                    if (field !== inputIdentifier)
                        isFormValid = fields[field].validation.test(fields[field].value)
            })
        } else isFormValid = false

        if (isFormValid !== formValid)
            setFormValid(isFormValid) 

        setFields({
            ...fields,
            [inputIdentifier]: {
                ...fields[inputIdentifier],
                value: newInputValue,
                touched: true,
                valid: isInputValid
            }
        })
    }

    function onInfoHover(inputIdentifier: string) {
        setFields({
            ...fields,
            [inputIdentifier]: {
                ...fields[inputIdentifier],
                showInfo: "show"
            }
        })
    }

    function onInfoLeave(inputIdentifier: string) {
        setFields({
            ...fields,
            [inputIdentifier]: {
                ...fields[inputIdentifier],
                showInfo: "hide"
            }
        })
    }

    function setInputClasses(inputIdentifier: string) {
        return ["input-group", !fields[inputIdentifier].valid && fields[inputIdentifier].touched ? 'invalid' : ''].join(' ')
    }

    return (
        <div id="page-register-login">
            <h2>Fazer login</h2>
            <form>
                <div className={setInputClasses('email')}>
                    <input 
                        value={fields.email.value}
                        onChange={onInputValueChange}
                        type="email" 
                        id="email" 
                        placeholder="E-mail" 
                    />
                    <div
                        onMouseEnter={() => onInfoHover('email')}
                        onMouseLeave={() => onInfoLeave('email')}
                    ><Icon icon={infoIcon} /></div>
                    <InputInfo show={fields.email.showInfo} info={fields.email.info} />
                </div>

                <div className={setInputClasses('password')}>
                    <input
                        value={fields.password.value}
                        onChange={onInputValueChange}
                        maxLength={30}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Senha"
                    />
                    <div 
                        style={{cursor: 'pointer'}} 
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseEnter={() => onInfoHover('password')}
                        onMouseLeave={() => onInfoLeave('password')}
                    >
                        <Icon 
                            color={showPassword ? '#8257E5' : '#6A6180'} 
                            icon={showPassword ? hidePasswordIcon : showPasswordIcon} 
                        />
                    </div>
                    <InputInfo show={fields.password.showInfo} info={fields.password.info} />
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
            </div>

            <footer> 
                <div id="no-account">
                    Não tem conta? <br />
                    <Link to="/auth/cadastro">Cadastre-se</Link>
                </div>

                <p>É de graça <img src={purpleHeartImg} alt="Coração roxo" /></p>
            </footer>
        </div>
    )
}

export default Login