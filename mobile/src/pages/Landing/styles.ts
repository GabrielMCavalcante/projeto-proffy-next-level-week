import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 40
    },

    banner: {
        width: '100%',
        resizeMode: 'contain'
    },

    title: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 30,
        fontFamily: 'Archivo_400Regular'
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },

    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40
    },

    button: {
        width: '100%',
        height: 80,
        marginBottom: 10,
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 20
    },

    buttonPrimary: {
        backgroundColor: '#9871F5'
    },

    buttonSecondary: {
        backgroundColor: '#04D361'
    },

    totalConnections: {
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        color: '#D4C2FF',
        fontSize: 12,
        lineHeight: 20,
        marginTop: 20
    }
})