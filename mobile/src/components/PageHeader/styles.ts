import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        padding: 40,
        backgroundColor: '#8257E5'
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 24,
        marginVertical: 30
    },

    filtersContainer: {
        alignItems: 'center',
        marginBottom: 16
    },

    toggleFiltersButtonWrapper: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: 'rgba(0,0,0,0.15)',
        borderWidth: 1.5,
        borderStyle: 'dashed'
    },

    toggleFiltersButton: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },

    toggleFiltersButtonText: {
        color: '#F0F0F4'
    },

    filtersInput: {
        width: '100%',
        flexDirection: 'row'
    }
})