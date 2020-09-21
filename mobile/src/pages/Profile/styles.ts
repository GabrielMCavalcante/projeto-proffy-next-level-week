import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    profile: {
        flex: 1
    },

    header: {
        backgroundColor: '#8257E5',
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 50,
        alignItems: "center",
        justifyContent: "center"
    },

    headerProfile: {
        flex: 1, 
        width: '100%',
        height: '100%' 
    },

    profileImgWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },

    profileImg: {
        borderRadius: 100,
        height: 150,
        width: 150
    },

    changeImgBtn: {
        borderRadius: 20,
        width: 40, 
        height: 40,
        backgroundColor: '#04D361',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 90
    },

    changeImgBtnIcon: {
        height: 24,
        width: 24
    },

    profileUser: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    profileName: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 24
    },

    profileSubject: {
        fontFamily: 'Poppins_400Regular',
        color: '#D4C2FF',
        fontSize: 16
    },

    content: {
        flex: 2,
        backgroundColor: '#f0f0f0',
        alignItems: 'center'
    },

    formCard: {
        width: '90%',
        position: 'relative',
        top: -30,
        borderColor: '#E6E6F0',
        borderWidth: 1,
        borderRadius: 16
    },

    mainFormContent: {
        backgroundColor: '#fff',
        padding: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6F0'
    },

    fieldset: {
        marginBottom: 20
    },

    fieldsetHeader: {
        borderBottomColor: '#E6E6F0',
        borderBottomWidth: 1,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    fieldsetHeaderTitle: {
        color: '#32264D',
        fontFamily: 'Archivo_700Bold',
        fontSize: 20
    },

    field: {
        marginTop: 10,
        flex: 1
    },

    spacedField: {
        marginRight: 10
    },

    fieldLabel: {
        color: '#9C98A6',
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

    removeClassBtn: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    removeClassBtnText: {
        color: '#E33D3D',
        fontFamily: 'Archivo_700Bold',
        fontSize: 14
    },

    addScheduleBtn: {
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    addScheduleBtnText: {
        color: '#8257E5',
        fontFamily: 'Archivo_700Bold',
        fontSize: 14
    },

    addScheduleBtnTextDisabled: {
        color: 'grey'
    },

    removeScheduleBtn: {
        marginHorizontal: 10
    },

    removeScheduleBtnText: { 
        color: '#E33D3D',
        fontFamily: 'Archivo_700Bold',
        fontSize: 12 
    },

    scheduleSeparator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        marginTop: 10
    },

    lineSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#E6E6F0'
    },

    bottomFormContent: {
        backgroundColor: '#FAFAFC',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        padding: 15,
        alignItems: 'center',
        zIndex: -1
    },

    formSubmitButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 8,
        marginBottom: 26
    },

    formSubmitButtonUnactive: {
        backgroundColor: '#DCDCE5'
    },

    formSubmitButtonActive: {
        backgroundColor: '#04D361'
    },

    formSubmitButtonText: {
        fontFamily: 'Archivo_700Bold'
    },

    formSubmitButtonTextUnactive: {
        color: '#9C98A6'
    },

    formSubmitButtonTextActive: {
        color: '#fff'
    }
})