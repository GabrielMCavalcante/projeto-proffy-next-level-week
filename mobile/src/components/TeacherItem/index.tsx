import React, { useState, useEffect } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import axios from '../../axios-config'

// Contexts
import { useAuth } from 'contexts/auth'

// Images
import favouriteHeartImg from 'assets/images/icons/heart-outline.png'
import unfavouriteHeartImg from 'assets/images/icons/unfavorite.png'
import whatsappImg from 'assets/images/icons/whatsapp.png'

// Components
import TeacherScheduleContainer from 'components/TeacherItem/TeacherScheduleContainer'

// Styles
import styles from './styles'

// Interfaces
import { Teacher } from 'interfaces/index'

const TeacherItem: React.FC<Teacher> = props => {

    const {
        teacherId,
        teacherName,
        teacherSubject,
        teacherPhotoURL,
        teacherSchedule,
        teacherBio,
        teacherWhatsapp,
        teacherPrice
    } = props


    const [isFavourited, setIsFavourited] = useState(props.isFavourited)

    const authContext = useAuth()

    useEffect(() => {
        setIsFavourited(props.isFavourited)
    }, [props.isFavourited])

    function openWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacherWhatsapp}`)
        axios.post('/connections', { user_id: teacherId })
    }

    function toggleFavourite() {
        const config = {
            headers: {
                authorization: "Bearer " + authContext.token,
                userid: authContext.user?.__id,
                teacherid: teacherId
            }
        }

        if (isFavourited) {
            axios.delete("/classes/favourites", config)
                .then(() => setIsFavourited(!isFavourited))
        } else {
            axios.post("/classes/favourites", null, config)
                .then(() => setIsFavourited(!isFavourited))
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.profileHeader}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: teacherPhotoURL }}
                    />

                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{teacherName}</Text>
                        <Text style={styles.subject}>{teacherSubject}</Text>
                    </View>
                </View>

                <Text style={styles.bio}>{teacherBio}</Text>
            </View>

            <TeacherScheduleContainer schedule={teacherSchedule} />

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço da minha hora: {'   '}
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