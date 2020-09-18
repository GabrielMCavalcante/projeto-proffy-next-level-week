import React, { useEffect, useState } from 'react'
import {
    KeyboardAvoidingView,
    View,
    Text,
    Image,
    TextInput,
    Platform,
    SafeAreaView,
    ActivityIndicator
} from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Components
import Checkbox from 'components/UI/Checkbox'

// Contexts
import { useAuth } from 'contexts/auth'

// Images
import backgroundImg from 'assets/images/login-background.png'
import showPasswordImg from 'assets/images/icons/see-password.png'
import hidePasswordImg from 'assets/images/icons/hide-password.png'

// CSS styles
import styles from './styles'

// Interfaces
import { Fields } from 'interfaces/index'

const initialFields: Fields = {
    email: {
        value: '',
        validation: /^[a-z-_\d.]{3,}@[a-z]{3,}(\.com|\.br|\.com\.br)$/i,
        valid: false,
        touched: false
    },

    password: {
        value: '',
        validation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
        valid: false,
        touched: false
    }
}

function Login() {

    const [showPassword, setShowPassword] = useState(false)
    const [rememberUser, setRememberUser] = useState(false)
    const [fields, setFields] = useState(initialFields)
    const [formValid, setFormValid] = useState(false)
    const [feedback, setFeedback] = useState('')

    const authContext = useAuth()

    const navigation = useNavigation()

    useEffect(() => {
        navigation.addListener('focus', () => {
            setFields(initialFields)
            setFormValid(false)
        })
    }, [navigation])

    function onInputValueChange(newInputValue: string, inputIdentifier: string) {
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

        if (feedback) setFeedback('')

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

    function setInputClasses(inputIdentifier: string) {
        return [styles.formField, !fields[inputIdentifier].valid && fields[inputIdentifier].touched && styles.invalid]
    }

    async function login() {
        if (feedback) setFeedback('')
        const userAccount = {
            email: fields.email.value,
            password: fields.password.value,
            rememberUser
        }

        const response = await authContext.signIn(userAccount)
        if (typeof response === 'string') setFeedback(response)
    }

    return (
        <KeyboardAvoidingView
            style={styles.login}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.inner}>
                    <View style={styles.loginImageWrapper}>
                        <Image style={styles.loginImage} source={backgroundImg} />
                    </View>

                    <View style={styles.loginForm}>
                        <View style={styles.formHeader}>
                            <Text style={styles.formHeaderTitle}>Fazer login</Text>
                            <BorderlessButton onPress={() => {
                                if(!authContext.loading)
                                    navigation.navigate("signup")
                            }}>
                                <Text style={styles.createAccountBtnText}>
                                    Criar uma conta
                                </Text>
                            </BorderlessButton>
                        </View>

                        <View style={styles.formFields}>
                            <View style={styles.formFieldGroup}>
                                <TextInput
                                    style={[...setInputClasses("email"), styles.firstField]}
                                    placeholder="E-mail"
                                    onChangeText={text => onInputValueChange(text, "email")}
                                    value={fields.email.value}
                                />
                            </View>

                            <View style={styles.formFieldGroup}>
                                <TextInput
                                    secureTextEntry={!showPassword}
                                    style={[...setInputClasses("password"), styles.lastField]}
                                    placeholder="Senha"
                                    onChangeText={text => onInputValueChange(text, "password")}
                                    value={fields.password.value}
                                />
                                <BorderlessButton
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.inputIcon}
                                >
                                    <Image
                                        source={
                                            !showPassword
                                                ? showPasswordImg
                                                : hidePasswordImg
                                        }
                                    />
                                </BorderlessButton>
                            </View>
                        </View>

                        <View style={styles.loginActions}>
                            <View style={styles.rememberUser}>
                                <Checkbox
                                    active={rememberUser}
                                    onChange={() => setRememberUser(!rememberUser)}
                                />
                                <Text style={styles.rememberUserText}>Lembrar-me</Text>
                            </View>

                            <BorderlessButton onPress={() => {
                                if(!authContext.loading)
                                    navigation.navigate("forgot-password")
                            }}>
                                <Text style={styles.forgotPasswordBtnText}>
                                    Esqueci minha senha
                                </Text>
                            </BorderlessButton>
                        </View>

                        <Text style={styles.feedbackText}>
                            {feedback}
                        </Text>

                        <RectButton
                            style={[
                                styles.submitLoginBtn,
                                formValid && !authContext.loading
                                    ? styles.submitLoginBtnActive
                                    : styles.submitLoginBtnUnactive
                            ]}
                            enabled={formValid && !authContext.loading}
                            onPress={login}
                        >
                            {
                                !authContext.loading
                                    ? (
                                        <Text
                                            style={[
                                                styles.submitLoginBtnText,
                                                formValid
                                                    ? styles.submitLoginBtnTextActive
                                                    : styles.submitLoginBtnTextUnactive
                                            ]}
                                        >Entrar</Text>
                                    )
                                    : <ActivityIndicator />
                            }
                        </RectButton>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Login