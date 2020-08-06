import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Images
import backgroundImg from 'assets/images/give-classes-background.png'

// Styles
import styles from './styles'

function GiveClasses() {

    const { goBack } = useNavigation()

    return (
        <View style={styles.container}>
            <ImageBackground 
                resizeMode="contain" 
                style={styles.background} 
                source={backgroundImg}
            >
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>
            <RectButton style={styles.okButton} onPress={goBack}>
                <Text style={styles.okButtonText}>Entendi</Text>
            </RectButton>
        </View>
    )
}

export default GiveClasses