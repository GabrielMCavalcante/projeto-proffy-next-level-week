import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    forgotPassword: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },

    inner: {
        flex: 1,
        justifyContent: "flex-end",
    },

    forgotPasswordImageWrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A380F6'
    },

    forgotPasswordImage: {
        resizeMode: 'contain',
        height: '100%'
    },

    forgotPasswordForm: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },

    formHeader: {
        width: '80%',
        marginTop: 20,
        marginBottom: 35,
        justifyContent: 'space-between',
    },

    formHeaderTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 26,
        marginTop: -15,
        color: '#32264D'
    },

    formHeaderDescription: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 18,
        maxWidth: 280
    },

    formField: {
        width: '80%',
        height: 60,
        borderColor: '#E6E6F0',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 16,
        backgroundColor: '#fff'
    },

    invalid: {
        borderColor: 'crimson'
    },

    feedbackText: {
        color: 'crimson',
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        marginTop: 26,
        textAlign: 'center'
    },

    submitforgotPasswordBtn: {
        width: '80%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginBottom: 26
    },

    submitforgotPasswordBtnUnactive: {
        backgroundColor: '#DCDCE5'
    },

    submitforgotPasswordBtnActive: {
        backgroundColor: '#04D361'
    },

    submitforgotPasswordBtnText: {
        fontFamily: 'Archivo_700Bold'
    },

    submitforgotPasswordBtnTextUnactive: {
        color: '#9C98A6'
    },

    submitforgotPasswordBtnTextActive: {
        color: '#fff'
    },
})