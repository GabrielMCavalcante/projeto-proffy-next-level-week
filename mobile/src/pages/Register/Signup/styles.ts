import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    signup: {
        flex: 1,
        backgroundColor: '#F0F0F7',
        padding: 16
    },

    header: { 
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'flex-start', 
        alignItems: 'center'
    },

    heading: {
        marginTop: 50
    },

    headingTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 30,
        maxWidth: 300,
        marginTop: -15,
        color: '#32264D'
    },

    headingDescription: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 18,
        maxWidth: 280
    },

    signupFormContainer: {
        flex: 1,
        alignItems: 'center'
    },

    formGroup: {
        width: '100%',
        marginVertical: 35
    },

    formGroupTitle: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#32264D',
        fontSize: 24
    },

    formGroupFields: {
        width: '100%',
        height: 60,
        position: 'relative',
        marginBottom: 1
    },

    formField: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderColor: '#E6E6F0',
        borderWidth: 2,
        paddingHorizontal: 16
    },

    formFieldGroup: {
        width: '100%',
        height: 60,
        position: 'relative',
        marginBottom: -1.5
    },

    firstField: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    lastField: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },

    inputIcon: {
        position: 'absolute',
        right: 10,
        top: '30%'
    },

    submitSignupBtn: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 50,
        marginBottom: 26
    },

    submitSignupBtnUnactive: {
        backgroundColor: '#DCDCE5'
    },

    submitSignupBtnActive: {
        backgroundColor: '#04D361'
    },

    submitSignupBtnText: {
        fontFamily: 'Archivo_700Bold'
    },

    submitSignupBtnTextUnactive: {
        color: '#9C98A6'
    },

    submitSignupBtnTextActive: {
        color: '#fff'
    },
})