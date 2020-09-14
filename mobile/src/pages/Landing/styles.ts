import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },

    header: {
        backgroundColor: '#8257E5',
        flex: 1,
        padding: 20
    },

    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    profileCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },

    profileCardImg: {
        backgroundColor: '#ccc',
        width: 35,
        height: 35,
        borderRadius: 30
    },

    profileCardText: {
        marginLeft: 10,
        marginTop: 3,
        color: '#D4C2FF',
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold'
    },

    logout: {
        backgroundColor: '#774DD6',
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },

    logoutImg: {
        width: '100%',
        resizeMode: 'contain'
    },

    content: {
        backgroundColor: '#F0F0F0',
        flex: 1.25,
        padding: 30
    },

    banner: {
        width: '100%',
        resizeMode: 'contain'
    },

    title: {
        color: '#6A6180',
        fontSize: 20,
        lineHeight: 25,
        fontFamily: 'Archivo_400Regular'
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },

    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
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
        marginTop: 10
    }
})