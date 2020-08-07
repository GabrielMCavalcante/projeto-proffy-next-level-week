import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    },

    teacherList: {
        marginTop: -40
    },

    searchForm: {
        marginTop: 10,
        marginBottom: 24,
        width: '100%',
        height: 250
    },

    label: {
        marginTop: 12,
        color: '#D4C2FF',
        fontFamily: 'Poppins_400Regular'
    },

    input: {
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16
    },

    inputGroup: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    inputBlock: {
        width: '100%',
    },

    timeContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        flexDirection: 'row'
    },

    timeDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        height: 50
    },

    filterButton: {
        // display: 'none',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#04D361',
        borderRadius: 8,
        marginTop: 15
    },

    filterButtonIcon: {
        fontSize: 26,
        color: '#F0F0F4',
        marginRight: 16
    },

    filterButtonText: {
        color: '#F0F0F4',
        fontFamily: 'Archivo_700Bold'
    }
})