import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'

// Styles
import styles from './styles'

function TeacherList() {
    return (
        <View style={styles.container}>
            <PageHeader title="Proffys Disponíveis" />
            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </ScrollView>
        </View>
    )
}

export default TeacherList