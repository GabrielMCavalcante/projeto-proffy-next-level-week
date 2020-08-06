import React from 'react'
import { View, Text, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Images
import landingImg from 'assets/images/landing.png'
import studyImg from 'assets/images/icons/study.png'
import teachImg from 'assets/images/icons/give-classes.png'
import heartImg from 'assets/images/icons/heart.png'

// Styles
import styles from './styles'

function Landing() {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <Image style={styles.banner} source={landingImg} />
            <Text style={styles.title}>
                Seja bem-vindo, {"\n"}
                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={() => navigate("Main")}
                >
                    <Image source={studyImg}/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton 
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigate("GiveClasses")}
                >
                    <Image source={teachImg}/>
                    <Text style={styles.buttonText}>Ensinar</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de 200 conexões já realizadas {' '}
                <Image source={heartImg}/>
            </Text>
        </View>
    )
}

export default Landing