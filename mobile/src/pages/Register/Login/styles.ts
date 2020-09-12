import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    login: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },

    inner: {
        flex: 1,
        justifyContent: "flex-end"
    },

    loginImageWrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A380F6'
    },

    loginImage: {
        resizeMode: 'contain',
        height: '100%'
    },

    loginForm: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },

    formHeader: {
        flexDirection: 'row',
        width: '80%',
        marginTop: 20,
        marginBottom: 35,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    formHeaderTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 23
    },

    createAccountBtnText: {
        color: '#8257E5',
        fontSize: 13
    },

    formFields: {
        width: '80%'
    },

    formFieldGroup: {
        width: '100%',
        height: 60,
        position: 'relative',
        marginBottom: -1.5
    },

    formField: {
        width: '100%',
        height: '100%',
        borderColor: '#E6E6F0',
        borderWidth: 2,
        paddingHorizontal: 16,
        backgroundColor: '#fff'
    },

    firstField: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    lastField: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },

    invalid: {
        borderColor: 'crimson'
    },

    inputIcon: {
        position: 'absolute',
        right: 10,
        top: '30%'
    },

    loginActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginTop: 25
    },

    rememberUser: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    rememberUserText: {
        color: '#9C98A6',
        marginLeft: 10
    },

    forgotPasswordBtnText: {
        color: '#9C98A6'
    },

    feedbackText: {
        color: 'crimson',
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        marginTop: 26,
        textAlign: 'center'
    },

    submitLoginBtn: {
        width: '80%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginBottom: 26
    },

    submitLoginBtnUnactive: {
        backgroundColor: '#DCDCE5'
    },

    submitLoginBtnActive: {
        backgroundColor: '#04D361'
    },

    submitLoginBtnText: {
        fontFamily: 'Archivo_700Bold'
    },

    submitLoginBtnTextUnactive: {
        color: '#9C98A6'
    },

    submitLoginBtnTextActive: {
        color: '#fff'
    },
})