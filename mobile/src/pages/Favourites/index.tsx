import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import axios from 'axios-config'

// Contexts
import { useAuth } from 'contexts/auth'

// Images
import favouriteEmojiImg from 'assets/images/icons/favourite-emoji.png'
import noFavouritesImg from 'assets/images/icons/no-favourites.png'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'

// Styles
import styles from './styles'

// Interfaces
import { Teacher } from 'pages/TeacherList'

type FavouriteData = [Teacher[], number | null, number]

function Favourites(props: { navigation: any }) {
    const [favourites, setFavourites] = useState<Teacher[]>([])
    const [loading, setLoading] = useState(true)
    const [pageNumber, setPageNumber] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadingFeedback, setLoadingFeedback] = useState('')
    const [totalProffys, setTotalProffys] = useState(0)
    const authContext = useAuth()

    async function fetchFavourites() {
        const response = await axios.get("/classes/favourites", {
            headers: {
                authorization: "Bearer " + authContext.token,
                userid: authContext.user?.__id
            },
            params: {
                page: pageNumber
            }
        })

        const data = response.data.resultsInfo
        const resData: FavouriteData = [data.results, data.next, data.total]
        return resData
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setLoading(true)
            fetchFavourites().then(response => {
                const [favs, next, total] = response
                setLoading(false)
                setTotalProffys(total)
                setHasMore(!!next)
                if(!!!next)
                    setLoadingFeedback("Estes são todos os favoritos.")
                setFavourites([...favs])
            }).catch(() => setLoadingFeedback("Ocorreu um erro ao buscar os favoritos. Tente novamente mais tarde."))
        })

        return unsubscribe
    }, [props.navigation])

    useEffect(() => {
        if (hasMore && !loadingMore) {
            setLoadingMore(true)
            fetchFavourites().then(response => {
                const [favs, next] = response
                setLoadingMore(false)
                setHasMore(!!next)
                setFavourites([...favourites, ...favs])
            })
        }
    }, [pageNumber])

    const renderTeacherCard = useCallback(({ item }: any) => {
        return (
            <TeacherItem
                key={item.id}
                teacherId={item.id}
                teacherPhotoURL={item.avatar}
                teacherName={item.name}
                teacherSubject={item.subject}
                teacherSchedule={item.schedule}
                teacherBio={item.bio}
                teacherPrice={item.cost}
                teacherWhatsapp={item.whatsapp}
                isFavourited={favourites.map(f => f.id).includes(item.id)}
            />
        )
    }, [favourites])

    function renderFooterComponent() {
        return hasMore
            ? (loadingMore ? <ActivityIndicator /> : null)
            : <Text style={styles.allResults}>{loadingFeedback}</Text>
    }

    console.log(favourites.length)

    return (
        <View style={styles.container}>
            <PageHeader
                title="Estudar"
                returnTo="landing"
            />
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.headerContentTextContent}>Meus Proffys</Text>
                        <Text style={styles.headerContentTextContent}>Favoritos</Text>
                    </View>

                    <View style={styles.proffyFoundWrapper}>
                        <Image style={styles.proffyEmoji} source={favouriteEmojiImg} />
                        <Text style={styles.proffyFoundText}>
                            {totalProffys} {totalProffys !== 1 ? 'favoritos' : 'favorito'}
                        </Text>
                    </View>
                </View>
            </View>

            {
                loading
                    ? <ActivityIndicator
                        size="large"
                        style={styles.spinner}
                        color="#8257E5"
                    />
                    : (
                        favourites.length > 0
                            ? (
                                <FlatList
                                    onEndReachedThreshold={0.5}
                                    onEndReached={() => {
                                        if (!loadingMore)
                                            setPageNumber(pageNumber + 1)
                                    }}
                                    style={styles.teacherList}
                                    data={favourites}
                                    renderItem={renderTeacherCard}
                                    keyExtractor={item => String(item.id)}
                                    ListFooterComponent={renderFooterComponent}
                                />
                            )
                            : (
                                <View style={styles.noResultsFound}>
                                    <Text style={styles.noResultsFoundText}>
                                        Você não possui favoritos! Favorite alguns Proffys
                                        e eles aparecerão aqui.
                                    </Text>

                                    <Image
                                        style={styles.noResultsFoundIcon}
                                        source={noFavouritesImg}
                                    />
                                </View>
                            )
                    )
            }
        </View>
    )
}

export default Favourites