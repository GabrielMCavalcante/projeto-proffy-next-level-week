import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    KeyboardAvoidingView,
    Text,
    Platform,
    Image,
    TextInput,
    SafeAreaView,
    ScrollView,
} from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Images
import BackImg from 'assets/images/icons/grey-back.png'
import showPasswordImg from 'assets/images/icons/see-password.png'
import hidePasswordImg from 'assets/images/icons/hide-password.png'

// CSS styles
import styles from './styles'

// Interfaces
import { Fields } from 'interfaces/index'

const initialFields: Fields = {
    name: {
        value: '',
        validation: /^[a-zà-ú]{3,20}$/i,
        valid: false,
        touched: false
    },
    surname: {
        value: '',
        validation: /^[a-zà-ú]{5,30}$/i,
        valid: false,
        touched: false
    },
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

function Signup() {

    const [fields, setFields] = useState(initialFields)
    const [formValid, setFormValid] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const fieldRef = useRef<TextInput | null>(null)

    const navigation = useNavigation()

    useEffect(() => {
        navigation.addListener('focus', () => {
            setFields(initialFields)
            setFormValid(false)
        })
    }, [navigation])

    useEffect(() => {
        if (!fieldRef.current!.isFocused()) {
            fieldRef.current!.focus()
        }
    }, [showPassword])

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
        return [styles.formField, !fields[inputIdentifier]?.valid && fields[inputIdentifier]?.touched && styles.invalid]
    }

    return (
        <KeyboardAvoidingView
            style={styles.signup}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ justifyContent: 'flex-end' }}
                    style={{ flex: 1 }}
                >
                    <View style={styles.header}>
                        <BorderlessButton onPress={() => navigation.navigate("login")}>
                            <Image source={BackImg} />
                        </BorderlessButton>
                    </View>

                    <View style={styles.heading}>
                        <Text style={styles.headingTitle}>Crie sua</Text>
                        <Text style={styles.headingTitle}>conta gratuita</Text>
                        <Text style={styles.headingDescription}>
                            Basta preencher esses dados e você estará conosco.
                        </Text>
                    </View>

                    <View style={styles.signupFormContainer}>
                        <View style={styles.formGroup}>
                            <Text style={styles.formGroupTitle}>01.  Quem é você?</Text>
                            <View style={styles.formGroupFields}>
                                <TextInput
                                    value={fields.name.value}
                                    onChangeText={text => onInputValueChange(text, "name")}
                                    style={[...setInputClasses("name"), styles.firstField]}
                                    placeholder="Nome"
                                />
                                <TextInput
                                    value={fields.surname.value}
                                    onChangeText={text => onInputValueChange(text, "surname")}
                                    style={[...setInputClasses("surname"), styles.lastField]}
                                    placeholder="Sobrenome"
                                />
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formGroupTitle}>02.  Email e Senha</Text>
                            <View style={styles.formGroupFields}>
                                <TextInput
                                    value={fields.email.value}
                                    onChangeText={text => onInputValueChange(text, "email")}
                                    style={[...setInputClasses("email"), styles.firstField]}
                                    placeholder="E-mail"
                                />

                                <View style={styles.formFieldGroup}>
                                    <TextInput
                                        value={fields.password.value}
                                        onChangeText={text => onInputValueChange(text, "password")}
                                        secureTextEntry={!showPassword}
                                        style={[...setInputClasses("password"), styles.lastField]}
                                        placeholder="Senha"
                                        ref={fieldRef}
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
                        </View>

                        <RectButton
                            style={[
                                styles.submitSignupBtn,
                                formValid
                                    ? styles.submitSignupBtnActive
                                    : styles.submitSignupBtnUnactive
                            ]}
                            enabled={formValid}
                        >
                            <Text
                                style={[
                                    styles.submitSignupBtnText,
                                    formValid
                                        ? styles.submitSignupBtnTextActive
                                        : styles.submitSignupBtnTextUnactive
                                ]}
                            >Concluir Cadastro</Text>
                        </RectButton>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Signup