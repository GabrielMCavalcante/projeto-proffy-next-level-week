import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    onboardingScreen: {
        flex: 1
    },

    onboardingImage: {
        flex: 1.3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    onboardingBackground: {
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    primary: {
        backgroundColor: '#A380F6',
    },

    secondary: {
        backgroundColor: '#04D361',
    },

    onboardingIcon: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },

    content: {
        flex: 1.25,
        padding: 20
    },

    screenNumber: {
        fontFamily: 'Archivo_400Regular',
        fontWeight: '700',
        color: '#6A618040',
        fontSize: 40
    },

    screenText: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#6A6180',
        fontSize: 30
    },

    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 26
    },

    dotIndicators: {
        flexDirection: 'row'
    },

    dotIndicator: {
        width: 10,
        height: 10,
        marginHorizontal: 2,
        borderRadius: 3
    },

    current: {
        backgroundColor: '#A380F6'
    },

    other: {
        backgroundColor: '#A380F650'
    },

    actionBtn: {
        width: 50,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    nextBtn: {
        transform: [{rotate: '180deg'}],
        margin: 0
    },

    okBtn: {
        fontFamily: 'Archivo_700Bold',
        margin: 0,
        color: '#A380F6'
    }
})