import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#6842C2'
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        fontFamily: 'Archivo_400Regular',
        color: '#fff',
        fontSize: 15,
    },

    logo: {
        position: 'relative',
        top: 2.5,
        transform: [{ scale: 1.5 }]
    }
})