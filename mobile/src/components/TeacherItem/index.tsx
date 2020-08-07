import React from 'react'
import { View, Text, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

// Images
import favouriteHeartImg from 'assets/images/icons/heart-outline.png'
import unfavouriteHeartImg from 'assets/images/icons/unfavourite.png'
import whatsappImg from 'assets/images/icons/whatsapp.png'

// Styles
import styles from './styles'

function TeacherItem() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.profileHeader}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: `https://github.com/gabrielmcavalcante.png` }}
                    />

                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>Gabriel Cavalcante</Text>
                        <Text style={styles.subject}>Programação</Text>
                    </View>
                </View>

                <Text style={styles.bioHeader}>Entusiasta das melhores tecnologias de programação</Text>
                <Text style={styles.bioContent}>Apaixonado por programar e resolver problemas do dia-a-dia com o poder da tecnologia</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ 20,00</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={styles.favouriteButton}>
                        <Image source={favouriteHeartImg}/>
                    </RectButton>

                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappImg}/>
                        <Text style={styles.contactButtonText}>
                            Entrar em contato
                        </Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem