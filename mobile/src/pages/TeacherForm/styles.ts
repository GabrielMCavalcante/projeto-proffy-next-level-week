import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    teacherForm: {
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

    headerTitle: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 22
    },

    headerDescription: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
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
        alignItems: 'center'
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
    },



    formWarning: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    formWarningText: {
        marginLeft: 5
    },

    formWarningTitle: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#8257E5'
    },

    formWarningSubtitle: {
        fontFamily: 'Poppins_400Regular',
        marginTop: -5
    }
})