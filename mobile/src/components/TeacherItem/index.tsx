import React, { useState, useEffect } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { SvgUri } from 'react-native-svg'
import AsyncStorage from '@react-native-community/async-storage'
import axios from '../../axios-config'

// Images
import favouriteHeartImg from 'assets/images/icons/heart-outline.png'
import unfavouriteHeartImg from 'assets/images/icons/unfavorite.png'
import whatsappImg from 'assets/images/icons/whatsapp.png'

// Styles
import styles from './styles'

export interface Teacher {
    teacherId: number,
    teacherPhotoURL: string,
    teacherName: string,
    teacherSubject: string,
    teacherDescriptionHeader: string,
    teacherDescriptionContent: string,
    teacherPrice: number,
    teacherWhatsapp: number,
    isFavourited: boolean
}

const TeacherItem: React.FC<Teacher> = props => {

    const {
        teacherId,
        teacherName,
        teacherSubject,
        teacherPhotoURL,
        teacherDescriptionHeader,
        teacherDescriptionContent,
        teacherWhatsapp,
        teacherPrice
    } = props

    const [isFavourited, setIsFavourited] = useState(props.isFavourited)

    useEffect(() => {
        setIsFavourited(props.isFavourited)
    }, [props.isFavourited])

    function openWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacherWhatsapp}`)
        axios.post('/connections', { user_id: teacherId })
    }

    function toggleFavourite() {
        AsyncStorage.getItem('favourites')
            .then(response => {
                if (response) {
                    const favouritedTeachers: Teacher[] = JSON.parse(response).teachers
                    let parsedTeachers: Teacher[] = []
                    if (isFavourited) {
                        parsedTeachers = favouritedTeachers
                            .filter(teacher => teacher.teacherId !== teacherId)
                    } else {
                        parsedTeachers = [...favouritedTeachers, {
                            teacherId,
                            teacherName,
                            teacherSubject,
                            teacherPhotoURL,
                            teacherDescriptionHeader,
                            teacherDescriptionContent,
                            teacherWhatsapp,
                            teacherPrice,
                            isFavourited: true
                        }]
                    }
                    AsyncStorage.setItem('favourites', JSON.stringify({ teachers: parsedTeachers }))
                        .then(() => setIsFavourited(!isFavourited))
                }
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.profileHeader}>
                    {
                        teacherPhotoURL.endsWith('.png')
                            ? (
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: teacherPhotoURL }}
                                />
                            )
                            : (
                                <SvgUri
                                    style={styles.avatar}
                                    uri={teacherPhotoURL}
                                />
                            )
                    }

                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{teacherName}</Text>
                        <Text style={styles.subject}>{teacherSubject}</Text>
                    </View>
                </View>

                <Text style={styles.bioHeader}>{teacherDescriptionHeader}</Text>
                <Text style={styles.bioContent}>{teacherDescriptionContent}</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {
                        teacherPrice.toFixed(2).replace('.', ',')
                    }</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={toggleFavourite}
                        style={[styles.favouriteButton, isFavourited && styles.favourited]}
                    >
                        <Image
                            source={
                                isFavourited
                                    ? unfavouriteHeartImg
                                    : favouriteHeartImg
                            }
                        />
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