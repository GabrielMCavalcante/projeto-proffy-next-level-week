import React from 'react'
import { View, Text, Image } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Images
import goBackImg from 'assets/images/icons/back.png'
import logoImg from 'assets/images/logo.png'

// Styles
import styles from './styles'

interface PageHeaderProps {
    title: string,
    description?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={() => navigate("Landing")}>
                    <Image source={goBackImg} resizeMode="contain" />
                </BorderlessButton>

                <Image source={logoImg} resizeMode="contain" />
            </View>

            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}

export default PageHeader