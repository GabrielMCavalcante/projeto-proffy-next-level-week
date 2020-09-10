import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    processFinished: {
        flex: 1,
        backgroundColor: '#A380F6',
        justifyContent: 'center',
        alignItems: 'center'
    },

    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        marginVertical: 20
    },

    title: {
        textAlign: 'center',
        fontFamily: 'Archivo_700Bold',
        fontSize: 30, 
        color: '#fff'
    },

    description: {
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
        color: '#fff'
    },

    button: {
        width: '90%',
        height: 60,
        backgroundColor: '#04D361',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 60
    },

    buttonText: { 
        fontFamily: 'Archivo_700Bold',
        color: '#fff'
    }
})