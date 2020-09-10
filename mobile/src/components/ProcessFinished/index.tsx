import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Images
import backgroundImg from '../../assets/images/give-classes-background.png'

// CSS styles
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'

// Interfaces
interface ProcessFinishedProps {
    title?: string,
    description?: string,
    onAction?: () => void
}

const ProcessFinished: React.FC<ProcessFinishedProps> = ({
    title,
    description,
    onAction
}) => {
    return (
        <View style={styles.processFinished}>
            <ImageBackground 
                style={styles.main} 
                resizeMode="contain" 
                source={backgroundImg}
            >
                <Icon name="check-circle" size={100} color="#04D361" />
                <Text style={styles.title}>Redefinição enviada!</Text>
                <Text style={styles.description}>
                    Boa, agora é só checar o e-mail que foi
                    enviado para você redefinir sua senha
                    e aproveitar os estudos.
                </Text>
            </ImageBackground>

            <RectButton style={styles.button} onPress={onAction}>
                <Text style={styles.buttonText}>Voltar ao login</Text>
            </RectButton>
        </View>
    )
}

export default ProcessFinished