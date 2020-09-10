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

// Images
import BackImg from 'assets/images/icons/back.png'
import showPasswordImg from 'assets/images/icons/see-password.png'
import hidePasswordImg from 'assets/images/icons/hide-password.png'

// CSS styles
import styles from './styles'

function Signup() {

    const [showPassword, setShowPassword] = useState(false)
    const fieldRef = useRef<TextInput|null>(null)

    useEffect(() => {
        if(!fieldRef.current!.isFocused()) {
            fieldRef.current!.focus()
        }
    }, [showPassword])

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
                        <BorderlessButton>
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
                                <TextInput style={[styles.formField, styles.firstField]} placeholder="Nome" />
                                <TextInput style={[styles.formField, styles.lastField]} placeholder="Sobrenome" />
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formGroupTitle}>02.  Email e Senha</Text>
                            <View style={styles.formGroupFields}>
                                <TextInput
                                    style={[styles.formField, styles.firstField]}
                                    placeholder="E-mail"
                                />

                                <View style={styles.formFieldGroup}>
                                    <TextInput
                                        secureTextEntry={!showPassword}
                                        style={[styles.formField, styles.lastField]}
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
                            style={[styles.submitSignupBtn, styles.submitSignupBtnActive]}
                        >
                            <Text
                                style={[
                                    styles.submitSignupBtnText,
                                    styles.submitSignupBtnTextActive
                                ]}
                            >Entrar</Text>
                        </RectButton>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Signup