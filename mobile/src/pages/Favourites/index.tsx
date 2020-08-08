import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'

// Styles
import styles from './styles'

// Interfaces
import { Teacher } from 'components/TeacherItem'

function Favourites(props: { navigation: any }) {

    const [favourites, setFavourites] = useState<Teacher[]>([])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('favourites')
                .then(response => {
                    if (response) 
                        setFavourites(JSON.parse(response).teachers)
                })
        })

        return unsubscribe
    }, [props.navigation])

    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys Favoritos" filters={false}/>

            <ScrollView
                style={styles.favourites}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {
                    favourites.map(favourite => (
                        <TeacherItem
                            key={Math.random()}
                            teacherId={favourite.teacherId}
                            teacherPhotoURL={favourite.teacherPhotoURL}
                            teacherName={favourite.teacherName}
                            teacherSubject={favourite.teacherSubject}
                            teacherDescriptionHeader={favourite.teacherDescriptionHeader}
                            teacherDescriptionContent={favourite.teacherDescriptionContent}
                            teacherPrice={favourite.teacherPrice}
                            teacherWhatsapp={favourite.teacherWhatsapp}
                            isFavourited={favourite.isFavourited}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Favourites