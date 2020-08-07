import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'

// Styles
import styles from './styles'

function Favourites() {
    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys Favoritos"/>
            
            <ScrollView 
                style={styles.favourites}
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

export default Favourites