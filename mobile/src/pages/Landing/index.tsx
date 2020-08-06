import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

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
                <TouchableOpacity 
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={() => navigate("TeacherList")}
                >
                    <Image source={studyImg}/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigate("GiveClasses")}
                >
                    <Image source={teachImg}/>
                    <Text style={styles.buttonText}>Ensinar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.totalConnections}>
                Total de 200 conexões já realizadas {' '}
                <Image source={heartImg}/>
            </Text>
        </View>
    )
}

export default Landing