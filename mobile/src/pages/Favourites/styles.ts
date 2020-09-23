import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    },

    header: {
        backgroundColor: '#8257E5',
        minHeight: 150
    },

    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
    },

    headerContentTextContent: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 24,
        color: '#fff'
    },

    proffyFoundWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    proffyEmoji: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },

    proffyFoundText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#fff',
        marginLeft: 10,
        marginTop: 3
    },

    teacherList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        zIndex: 100,
        top: -50
    },

    spinner: {
        transform: [{ scale: 2 }],
        flex: 1
    },

    allResults: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#6A6180',
        alignSelf: 'center'
    },

    noResultsFound: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 330
    },

    noResultsFoundText: {
        textAlign: 'center',
        fontFamily: 'Archivo_700Bold',
        fontSize: 18,
        color: '#32264D'
    },

    noResultsFoundIcon: {
        resizeMode: 'contain',
        tintColor: '#6842C2'
    }
})