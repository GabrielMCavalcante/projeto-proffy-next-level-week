import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    },

    header: {
        backgroundColor: '#8257E5',
        minHeight: 180
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

    filterBtn: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 250,
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: -5
    },

    filterBtnText: {
        marginLeft: 10,
        fontFamily: 'Archivo_400Regular',
        fontSize: 16,
        color: '#fff'
    },

    teacherList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        zIndex: 100,
        top: -25
    },

    searchForm: {
        marginTop: 10,
        marginBottom: 24,
        width: '100%',
        paddingHorizontal: 20
    },

    field: {
        flex: 1,
        marginBottom: 70
    },

    spacedField: {
        marginRight: 10
    },

    fieldLabel: {
        color: '#D4C2FF',
        fontFamily: 'Poppins_400Regular',
        fontSize: 14
    },

    fieldInput: {
        width: '100%',
        height: 50,
        backgroundColor: '#FAFAFC',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E6E6F0',
        padding: 10
    },

    invalidFieldInput: {
        borderColor: '#E33D3D'
    },

    fieldTextarea: {
        height: 150,
        textAlignVertical: "top"
    },

    fieldGroup: {
        flexDirection: 'row', 
        width: '100%',
        justifyContent: 'space-between'
    },

    dropdown: {
        backgroundColor: '#F8F8FC',
        height: '100%',
    },

    dropdownItem: {
        justifyContent: 'flex-start',
        height: 40,
        width: '100%',
        padding: 10
    },

    dropdownActiveItem: {
        backgroundColor: '#EBEBF5',
        borderLeftColor: '#8257E5',
        borderLeftWidth: 2
    },

    dropdownList: { 
        backgroundColor: '#F8F8FC', 
        paddingHorizontal: 0
    },

    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#04D361',
        borderRadius: 8,
        marginTop: -55,
        marginBottom: 10
    },

    filterButtonIcon: {
        fontSize: 26,
        color: '#F0F0F4',
        marginRight: 16
    },

    filterButtonText: {
        color: '#F0F0F4',
        fontFamily: 'Archivo_700Bold'
    },

    spinner: {
        transform: [{ scale: 2 }],
        flex: 1
    }
})