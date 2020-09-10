import React from 'react'
import {
    KeyboardAvoidingView,
    View,
    Text,
    Image,
    TextInput,
    Platform,
    SafeAreaView
} from 'react-native'

// Images
import backgroundImg from 'assets/images/login-background.png'
import GoBackImg from 'assets/images/icons/grey-back.png'

// CSS styles
import styles from './styles'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

function ForgotPassword() {
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
                        <BorderlessButton>
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
                            style={styles.formField}
                            placeholder="E-mail"
                        />

                        <RectButton
                            style={[styles.submitforgotPasswordBtn, styles.submitforgotPasswordBtnActive]}
                        >
                            <Text
                                style={[
                                    styles.submitforgotPasswordBtnText,
                                    styles.submitforgotPasswordBtnTextActive
                                ]}
                            >Enviar</Text>
                        </RectButton>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword