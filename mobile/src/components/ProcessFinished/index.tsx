import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Images
import backgroundImg from '../../assets/images/give-classes-background.png'

// CSS styles
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'

// Interfaces
interface ProcessFinishedProps {
    title: string,
    description: string,
    redirectTo: "login" | "signup" | "forgot-password",
    actionLabel: string
}

const ProcessFinished: React.FC<ProcessFinishedProps> = ({
    title,
    description,
    redirectTo,
    actionLabel
}) => {

    const navigation = useNavigation()

    return (
        <View style={styles.processFinished}>
            <ImageBackground
                style={styles.main}
                resizeMode="contain"
                source={backgroundImg}
            >
                <Icon name="check-circle" size={100} color="#04D361" />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </ImageBackground>

            <RectButton style={styles.button} onPress={() => navigation.navigate(redirectTo)}>
                <Text style={styles.buttonText}>{ actionLabel }</Text>
            </RectButton>
        </View>
    )
}

export default ProcessFinished