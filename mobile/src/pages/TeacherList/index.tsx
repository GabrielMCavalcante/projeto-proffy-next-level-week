import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import { RectButton, TextInput } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from '../../axios-config'
import AsyncStorage from '@react-native-community/async-storage'

// Contexts
import { useAuth } from 'contexts/auth'

// Icons
import { Ionicons } from '@expo/vector-icons'
import proffyEmojiImg from 'assets/images/icons/proffy-emoji.png'
import filterIconImg from 'assets/images/icons/filter-icon.png'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'

// Utils
import { weekdays } from 'utils/schedule'
import { subjects } from 'utils/subjects'

// Styles
import styles from './styles'

interface Teacher {
    id: number,
    subject: string,
    cost: number,
    name: string,
    avatar: string,
    whatsapp: number,
    bio: string
}

function TeacherList(props: { navigation: any }) {

    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [favourites, setFavourites] = useState<number[]>([])
    const [reFetch, setReFetch] = useState(true)
    const [showFilters, setShowFilters] = useState(false)
    const [subject, setSubject] = useState<string | null>(null)
    const [weekDay, setWeekDay] = useState<string | null>(null)
    const [from, setFrom] = useState<string>('')
    const [to, setTo] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const authContext = useAuth()

    useEffect(() => {
        (function fetchClasses() {
            if (reFetch) {
                setReFetch(false)
                setLoading(true)
                axios.get("/classes", {
                    headers: {
                        authorization: "Bearer " + authContext.token,
                    }
                })
                    .then(response => {
                        setLoading(false)
                        setTeachers([...teachers, ...response.data.resultsInfo.results])
                    })
                    .catch(() => {
                        setLoading(false)
                    })
            }
        })()
    }, [reFetch]) // eslint-disable-line

    useEffect(() => {
        return props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('favourites')
                .then(response => {
                    if (response) {
                        const fetchedFavourites: { teacherId: number }[] =
                            JSON.parse(response).teachers

                        setFavourites([
                            ...fetchedFavourites.map(
                                fetchedFavourite => fetchedFavourite.teacherId
                            )
                        ])
                    }
                })
        })
    }, [props.navigation])

    function applyFilters() {
        setShowFilters(false)
        setLoading(true)
        axios.get('/classes', {
            params: {
                subject,
                week_day: weekDay,
                from, to
            }
        })
            .then(response => {
                setLoading(false)
                setTeachers(response.data.search)
            })
            .catch(() => {
                setLoading(false)
                setSubject(null)
                setWeekDay(null)
                setFrom('')
                setTo('')
                setReFetch(true)
            })
    }

    function renderTeacherCard({ item }: any) {
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
                isFavourited={favourites.includes(item.id)}
            />
        )
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Estudar"
                returnTo="landing"
            />
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.headerContentTextContent}>Proffys</Text>
                        <Text style={styles.headerContentTextContent}>Disponíveis</Text>
                    </View>

                    <View style={styles.proffyFoundWrapper}>
                        <Image style={styles.proffyEmoji} source={proffyEmojiImg} />
                        <Text style={styles.proffyFoundText}>
                            {teachers.length} proffys
                        </Text>
                    </View>
                </View>

                <RectButton onPress={() => setShowFilters(!showFilters)} style={styles.filterBtn}>
                    <Image source={filterIconImg}/>
                    <Text style={styles.filterBtnText}>
                        Filtrar por dia, hora e matéria
                    </Text>
                </RectButton>

                <View style={[styles.searchForm, !showFilters && { display: 'none' }]}>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>
                            Matéria
                        </Text>
                        <DropDownPicker
                            items={subjects}
                            containerStyle={{ height: 40 }}
                            style={styles.dropdown}
                            itemStyle={styles.dropdownItem}
                            activeItemStyle={styles.dropdownActiveItem}
                            labelStyle={{ fontFamily: 'Poppins_400Regular' }}
                            activeLabelStyle={{ fontFamily: 'Poppins_600SemiBold' }}
                            placeholder="Selecione uma matéria"
                            defaultValue={subject}
                            dropDownStyle={styles.dropdownList}
                            onChangeItem={item => setSubject(item.value)}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>
                            Dia da Semana
                        </Text>
                        <DropDownPicker
                            items={weekdays}
                            containerStyle={{ height: 40 }}
                            style={styles.dropdown}
                            itemStyle={styles.dropdownItem}
                            activeItemStyle={styles.dropdownActiveItem}
                            labelStyle={{ fontFamily: 'Poppins_400Regular' }}
                            defaultValue={null}
                            activeLabelStyle={{ fontFamily: 'Poppins_600SemiBold' }}
                            placeholder="Selecione um dia da semana"
                            dropDownStyle={styles.dropdownList}
                            onChangeItem={item => setWeekDay(item.value)}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <View style={[styles.field, styles.spacedField]}>
                            <Text style={styles.fieldLabel}>
                                Das
                            </Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="08:00"
                                value={from}
                                onChangeText={text => setFrom(text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>
                                Até
                            </Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="12:00"
                                value={to}
                                onChangeText={text => setTo(text)}
                            />
                        </View>
                    </View>

                    <RectButton onPress={applyFilters} style={styles.filterButton}>
                        <Ionicons style={styles.filterButtonIcon} name="ios-search" />
                        <Text style={styles.filterButtonText}>Buscar</Text>
                    </RectButton>
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
                        <FlatList
                            style={styles.teacherList}
                            data={teachers}
                            renderItem={renderTeacherCard}
                            keyExtractor={item => String(item.id)}
                        />
                    )
            }
        </View>
    )
}

export default TeacherList