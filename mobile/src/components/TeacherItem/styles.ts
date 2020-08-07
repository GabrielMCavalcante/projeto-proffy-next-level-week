import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E6E6E0',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden'
    },

    profile: {
        alignItems: 'flex-start',
        padding: 20
    },

    profileHeader: {
        flexDirection: 'row'
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#eee'
    },

    profileInfo: {
        marginLeft: 16
    },

    name: {
        fontFamily: 'Archivo_700Bold',
        color: '#32264D',
        fontSize: 20
    },

    subject: {
        fontFamily: 'Poppins_400Regular',
        color: '#6A6180',
        fontSize: 15,
        marginTop: 4
    },

    bioHeader: {
        marginHorizontal: 10,
        marginVertical: 20,
        fontSize: 14,
        lineHeight: 24,
        color: '#6A6180',
        fontFamily: 'Poppins_600SemiBold'
    },

    bioContent: {
        marginHorizontal: 10,
        marginTop: 0,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        lineHeight: 24,
        color: '#6A6180'
    },

    footer: {
        backgroundColor: '#FAFAFC',
        padding: 24,
        alignItems: 'center'
    },

    price: {
        fontFamily: 'Poppins_400Regular',
        color: '#6A6180',
        fontSize: 14
    },

    priceValue: {
        fontFamily: 'Archivo_700Bold',
        color: '#8257E5',
        fontSize: 16
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 16
    },

    favouriteButton: {
        backgroundColor: '#8257E5',
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 56,
        borderRadius: 8,
        marginRight: 8
    },

    favourited: {
        backgroundColor: '#E33D3D'
    },

    contactButton: {
        backgroundColor: '#04D361',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 8,
        marginRight: 8
    },

    contactButtonText: {
        color: '#fff',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16
    }
})