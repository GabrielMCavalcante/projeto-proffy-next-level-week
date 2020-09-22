import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    teacherScheduleItem: {
        width: '100%',
        borderRadius: 8,
        borderColor: '#E6E6F0',
        backgroundColor: '#F0F0F0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 40,
        marginVertical: 5
    },

    containerDisabled: {
        borderColor: '#F0F0F0',
        backgroundColor: '#FAFAFC'
    },

    textDisabled: {
        color: '#rgba(106,97,128,0.5)'
    },

    text: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 14,
        color: '#6A6180',
        flex: 1
    },

    period: {
        marginLeft: 10
    }
})