import React from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { SvgUri } from 'react-native-svg'
import axios from '../../axios-config'

// Images
import favouriteHeartImg from 'assets/images/icons/heart-outline.png'
import unfavouriteHeartImg from 'assets/images/icons/unfavorite.png'
import whatsappImg from 'assets/images/icons/whatsapp.png'

// Styles
import styles from './styles'

interface TeacherItemProps {
    teacherId: number,
    teacherPhotoURL: string,
    teacherName: string,
    teacherSubject: string,
    teacherDescriptionHeader: string,
    teacherDescriptionContent: string,
    teacherPrice: number,
    teacherWhatsapp: number
}

const TeacherItem: React.FC<TeacherItemProps> = props => {
    function openWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${props.teacherWhatsapp}`)
        axios.post('/connections', { user_id: props.teacherId })
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.profileHeader}>
                    {
                        props.teacherPhotoURL.endsWith('.png')
                            ? (
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: props.teacherPhotoURL }}
                                />
                            ) 
                            : (
                                <SvgUri
                                    style={styles.avatar}
                                    uri={props.teacherPhotoURL}
                                />
                            )
                    }

                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{props.teacherName}</Text>
                        <Text style={styles.subject}>{props.teacherSubject}</Text>
                    </View>
                </View>

                <Text style={styles.bioHeader}>{props.teacherDescriptionHeader}</Text>
                <Text style={styles.bioContent}>{props.teacherDescriptionContent}</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {
                        props.teacherPrice.toFixed(2).replace('.', ',')
                    }</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favouriteButton, styles.favourited]}>
                        {/* <Image source={favouriteHeartImg}/> */}
                        <Image source={unfavouriteHeartImg} />
                    </RectButton>

                    <RectButton onPress={openWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappImg} />
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