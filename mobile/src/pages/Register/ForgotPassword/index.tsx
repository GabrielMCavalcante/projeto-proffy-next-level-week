import React, { useState, useEffect } from 'react'
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

// Navigation
import { useNavigation } from '@react-navigation/native'

// Contexts
import { useAuth } from 'contexts/auth'

// Images
import backgroundImg from 'assets/images/login-background.png'
import GoBackImg from 'assets/images/icons/grey-back.png'

// CSS styles
import styles from './styles'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

// Interfaces
import { Fields } from 'interfaces/index'

const initialFields: Fields = {
    email: {
        value: '',
        validation: /^[a-z-_\d.]{3,}@[a-z]{3,}(\.com|\.br|\.com\.br)$/i,
        valid: false,
        touched: false
    }
}

function ForgotPassword() {

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

    async function sendPasswordResetEmail() {
        if (feedback) setFeedback('')

        const response = await authContext.requestPasswordResetEmail(fields.email.value)
        if (typeof response === 'string') setFeedback(response)
        else navigation.navigate("password-recovery-email-sent")
    }

    return (
        <KeyboardAvoidingView
            style={styles.forgotPassword}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.inner}>
                    <View style={styles.forgotPasswordImageWrapper}>
                        <Image style={styles.forgotPasswordImage} source={backgroundImg} />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingHorizontal: 25,
                        paddingTop: 8
                    }} >
                        <BorderlessButton onPress={() => {
                            if(!authContext.loading)
                                navigation.navigate("login")
                        }}>
                            <Image source={GoBackImg} />
                        </BorderlessButton>
                    </View>

                    <View style={styles.forgotPasswordForm}>
                        <View style={styles.formHeader}>
                            <Text style={styles.formHeaderTitle}>Esqueceu sua senha?</Text>
                            <Text style={styles.formHeaderDescription}>Não esquenta,</Text>
                            <Text style={styles.formHeaderDescription}>vamos dar um jeito nisso.</Text>
                        </View>

                        <TextInput
                            style={setInputClasses("email")}
                            placeholder="E-mail"
                            value={fields.email.value}
                            onChangeText={text => onInputValueChange(text, "email")}
                        />

                        <Text style={styles.feedbackText}>
                            {feedback}
                        </Text>

                        <RectButton
                            style={[
                                styles.submitforgotPasswordBtn,
                                formValid && !authContext.loading
                                    ? styles.submitforgotPasswordBtnActive
                                    : styles.submitforgotPasswordBtnUnactive
                            ]}
                            enabled={formValid && !authContext.loading}
                            onPress={sendPasswordResetEmail}
                        >
                            {
                                !authContext.loading
                                    ? (
                                        <Text
                                            style={[
                                                styles.submitforgotPasswordBtnText,
                                                formValid
                                                    ? styles.submitforgotPasswordBtnTextActive
                                                    : styles.submitforgotPasswordBtnTextUnactive
                                            ]}
                                        >Enviar</Text>
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

export default ForgotPassword