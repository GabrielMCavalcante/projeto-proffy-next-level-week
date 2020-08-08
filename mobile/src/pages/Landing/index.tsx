import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import axios from '../../axios-config'
import AsyncStorage from '@react-native-community/async-storage'

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

    const [feedback, setFeedback] = useState('Carregando conexões...')

    useEffect(() => {
        (function fetchConnections() {
            AsyncStorage.getItem('favourites')
                .then(response => {
                    if (!response)
                        AsyncStorage.setItem('favourites', JSON.stringify({ teachers: [] }))
                })

            axios.get('/connections').then(response => {
                const totalConnections = response.data.total
                setFeedback(`Total de ${totalConnections} ${totalConnections === 1 ? "conexão" : "conexões"} já ${totalConnections === 1 ? "realizada" : "realizadas"}`)
            }).catch(() => {
                setFeedback('Não foi possível recuperar o total de conexões :(')
            })
        })()
    }, [])

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
                    <Image source={studyImg} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigate("GiveClasses")}
                >
                    <Image source={teachImg} />
                    <Text style={styles.buttonText}>Ensinar</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                {feedback} <Image source={heartImg} />
            </Text>
        </View>
    )
}

export default Landing