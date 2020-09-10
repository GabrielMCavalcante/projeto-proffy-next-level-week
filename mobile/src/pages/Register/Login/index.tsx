import React, { useState } from 'react'
import {
    KeyboardAvoidingView,
    View,
    Text,
    Image,
    TextInput,
    Platform,
    SafeAreaView
} from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

// Components
import Checkbox from 'components/UI/Checkbox'

// Images
import backgroundImg from 'assets/images/login-background.png'
import showPasswordImg from 'assets/images/icons/see-password.png'
import hidePasswordImg from 'assets/images/icons/hide-password.png'

// CSS styles
import styles from './styles'

function Login() {

    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

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
                            <BorderlessButton>
                                <Text style={styles.createAccountBtnText}>
                                    Criar uma conta
                                </Text>
                            </BorderlessButton>
                        </View>

                        <View style={styles.formFields}>
                            <View style={styles.formFieldGroup}>
                                <TextInput
                                    style={[styles.formField, styles.firstField]}
                                    placeholder="E-mail"
                                />
                            </View>

                            <View style={styles.formFieldGroup}>
                                <TextInput
                                    secureTextEntry={!showPassword}
                                    style={[styles.formField, styles.lastField]}
                                    placeholder="Senha"
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
                                    active={rememberMe} 
                                    onChange={() => setRememberMe(!rememberMe)} 
                                />
                                <Text style={styles.rememberUserText}>Lembrar-me</Text>
                            </View>

                            <BorderlessButton>
                                <Text style={styles.forgotPasswordBtnText}>
                                    Esqueci minha senha
                                </Text>
                            </BorderlessButton>
                        </View>

                        <RectButton
                            style={[styles.submitLoginBtn, styles.submitLoginBtnActive]}
                        >
                            <Text
                                style={[
                                    styles.submitLoginBtnText,
                                    styles.submitLoginBtnTextActive
                                ]}
                            >Entrar</Text>
                        </RectButton>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Login