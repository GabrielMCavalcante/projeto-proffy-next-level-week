import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    checkbox: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },

    active: {
        backgroundColor: '#04D361',
        borderColor: '#04D361'
    },

    unactive: {
        backgroundColor: '#DCDCE5',
        borderColor: '#DCDCE5'
    }
})