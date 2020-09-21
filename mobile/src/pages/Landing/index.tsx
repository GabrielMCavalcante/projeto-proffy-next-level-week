import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import axios from '../../axios-config'
import AsyncStorage from '@react-native-community/async-storage'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Contexts
import { useAuth } from 'contexts/auth'

// Images
import landingImg from 'assets/images/landing.png'
import studyImg from 'assets/images/icons/study.png'
import teachImg from 'assets/images/icons/give-classes.png'
import heartImg from 'assets/images/icons/heart.png'
import noAvatarImg from 'assets/images/no-avatar.png'
import logoutImg from 'assets/images/icons/logout.png'

// Styles
import styles from './styles'

function Landing() {

    const { navigate } = useNavigation()

    const [feedback, setFeedback] = useState('Carregando conexões...')

    const authContext = useAuth()

    useEffect(() => {
        (function fetchConnections() {
            AsyncStorage.getItem('favourites')
                .then(response => {
                    if (!response)
                        AsyncStorage.setItem('favourites', JSON.stringify({ teachers: [] }))
                })

            axios.get('/connections', {
                headers: {
                    authorization: "Bearer " + authContext.token
                }
            }).then(response => {
                const totalConnections = response.data.total
                setFeedback(`Total de ${totalConnections} ${totalConnections === 1 ? "conexão" : "conexões"} já ${totalConnections === 1 ? "realizada" : "realizadas"}`)
            }).catch(() => {
                setFeedback('Não foi possível recuperar o total de conexões :(')
            })
        })()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <RectButton style={styles.profileCard} onPress={() => navigate("profile")}>
                        <Image
                            style={styles.profileCardImg}
                            source={
                                authContext.user?.avatar !== null
                                    ? { uri: String(authContext.user?.avatar) }
                                    : noAvatarImg
                            }
                        />
                        <Text style={styles.profileCardText}>{authContext.user?.name}</Text>
                    </RectButton>

                    <RectButton style={styles.logout} onPress={authContext.signOut}>
                        <Image style={styles.logoutImg} source={logoutImg} />
                    </RectButton>
                </View>
                <Image style={styles.banner} source={landingImg} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>
                    Seja bem-vindo, {"\n"}
                    <Text style={styles.titleBold}>
                        O que deseja fazer?
                </Text>
                </Text>

                {/* <RectButton onPress={async () => {
                    await AsyncStorage.removeItem('proffy:app:alreadyopened')
                }}>
                    <Text>
                        Reset Storage
                </Text>
                </RectButton>
                <RectButton onPress={authContext.signOut}>
                    <Text>
                        Logout
                </Text>
                </RectButton> */}

                <View style={styles.buttonsContainer}>
                    <RectButton
                        style={[styles.button, styles.buttonPrimary]}
                        onPress={() => navigate("main")}
                    >
                        <Image source={studyImg} />
                        <Text style={styles.buttonText}>Estudar</Text>
                    </RectButton>

                    <RectButton
                        style={[styles.button, styles.buttonSecondary]}
                        onPress={() => navigate("teacher-form")}
                    >
                        <Image source={teachImg} />
                        <Text style={styles.buttonText}>Ensinar</Text>
                    </RectButton>
                </View>

                <Text style={styles.totalConnections}>
                    {feedback} <Image source={heartImg} />
                </Text>
            </View>
        </View>
    )
}

export default Landing