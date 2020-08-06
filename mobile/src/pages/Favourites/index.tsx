import React from 'react'
import { View, Text } from 'react-native'

// Components
import PageHeader from 'components/PageHeader'

// Styles
import styles from './styles'

function Favourites() {
    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys Favoritos"/>
            <Text>Favourites</Text>
        </View>
    )
}

export default Favourites