import React from 'react'
import { View, Text } from 'react-native'

// Components
import PageHeader from 'components/PageHeader'

// Styles
import styles from './styles'

function TeacherList() {
    return (
        <View style={styles.container}>
            <PageHeader title="Proffys Disponíveis"/>
            <Text>Teacher List</Text>
        </View>
    )
}

export default TeacherList