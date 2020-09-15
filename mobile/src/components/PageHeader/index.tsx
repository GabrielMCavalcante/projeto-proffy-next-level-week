import React from 'react'
import { View, Text, Image } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

// Icons
import { Ionicons } from '@expo/vector-icons'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Images
import goBackImg from 'assets/images/icons/back.png'
import logoImg from 'assets/images/logo.png'

// Styles
import styles from './styles'

interface PageHeaderProps {
    title: string,
    returnTo: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, returnTo }) => {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton 
                    style={{ width: 30, height: 30 }} 
                    onPress={() => navigate(returnTo)}
                >
                    <Image 
                        style={{ width: 30, height: 30 }} 
                        source={goBackImg} 
                        resizeMode="contain" 
                    />
                </BorderlessButton>

                <Text style={styles.title}>{ title }</Text>

                <Image source={logoImg} style={styles.logo} resizeMode="contain" />
            </View>
        </View>
    )
}

export default PageHeader