import React, { useState, useEffect } from 'react'
import { View, Text, Picker, ActivityIndicator } from 'react-native'
import { ScrollView, RectButton } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from '../../axios-config'
import AsyncStorage from '@react-native-community/async-storage'

// Icons
import { Ionicons } from '@expo/vector-icons'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'

// Styles
import styles from './styles'

interface Teacher {
    id: number,
    subject: string,
    cost: number,
    name: 'string',
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
    const [from, setFrom] = useState<{ hours: string, minutes: string } | null>(null)
    const [to, setTo] = useState<{ hours: string, minutes: string } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (function fetchClasses() {
            if (reFetch) {
                setReFetch(false)
                setLoading(true)
                axios.get('/classes')
                    .then(response => {
                        setLoading(false)
                        setTeachers(response.data.search)
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
        const fromParam = from ? `${from.hours}:${from.minutes}` : null
        const toParam = to ? `${to.hours}:${to.minutes}` : null
        axios.get('/classes', {
            params: {
                subject,
                week_day: weekDay,
                from: fromParam,
                to: toParam
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
                setFrom(null)
                setTo(null)
                setReFetch(true)
            })
    }

    return (
        <View style={styles.container}>
            <PageHeader
                onToggleFilters={() => setShowFilters(!showFilters)}
                showingFilters={showFilters}
                title="Proffys Disponíveis"
                filters
            >
                <ScrollView style={[styles.searchForm, !showFilters && { display: 'none' }]}>
                    <Text style={styles.label}>Matéria</Text>
                    <DropDownPicker
                        items={[
                            { label: 'Todas as Matérias', value: null },
                            { value: "Artes", label: "Artes" },
                            { value: "Biologia", label: "Biologia" },
                            { value: "Educação Física", label: "Educação Física" },
                            { value: "Espanhol", label: "Espanhol" },
                            { value: "Física", label: "Física" },
                            { value: "Geografia", label: "Geografia" },
                            { value: "História", label: "História" },
                            { value: "Inglês", label: "Inglês" },
                            { value: "Literatura", label: "Literatura" },
                            { value: "Matemática", label: "Matemática" },
                            { value: "Português", label: "Português" },
                            { value: "Química", label: "Química" }
                        ]}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => setSubject(item.value)}
                    />

                    <Text style={styles.label}>Dia da Semana</Text>
                    <DropDownPicker
                        items={[
                            { label: 'Todos os Dias', value: null },
                            { value: "1", label: "Segunda-feira" },
                            { value: "2", label: "Terça-feira" },
                            { value: "3", label: "Quarta-feira" },
                            { value: "4", label: "Quinta-feira" },
                            { value: "5", label: "Sexta-feira" },
                            { value: "6", label: "Sábado" },
                            { value: "0", label: "Domingo" }
                        ]}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => setWeekDay(item.value)}
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Das</Text>
                            <View style={styles.timeContainer}>
                                <Picker
                                    selectedValue={from ? from.hours : '01'}
                                    prompt="Selecione as horas"
                                    style={styles.timeDisplay}
                                    onValueChange={itemValue =>
                                        setFrom({ ...from, hours: itemValue } as any)
                                    }
                                >
                                    {
                                        fullHours.map(h => (
                                            <Picker.Item
                                                key={h.value}
                                                label={h.label}
                                                value={h.value}
                                            />
                                        ))
                                    }
                                </Picker>
                                <Picker
                                    selectedValue={from ? from.minutes : '00'}
                                    prompt="Selecione os minutos"
                                    style={styles.timeDisplay}
                                    onValueChange={itemValue => setFrom({ ...from, minutes: itemValue } as any)}
                                >
                                    {
                                        fullMinutes.map(m => (
                                            <Picker.Item
                                                key={m.value}
                                                label={m.label}
                                                value={m.value}
                                            />
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Até</Text>
                            <View style={styles.timeContainer}>
                                <Picker
                                    selectedValue={to ? to.hours : '23'}
                                    prompt="Selecione as horas"
                                    style={styles.timeDisplay}
                                    onValueChange={itemValue =>
                                        setTo({ ...to, hours: itemValue } as any)
                                    }
                                >
                                    {
                                        fullHours.map(h => (
                                            <Picker.Item
                                                key={h.value}
                                                label={h.label}
                                                value={h.value}
                                            />
                                        ))
                                    }
                                </Picker>
                                <Picker
                                    selectedValue={to ? to.minutes : '59'}
                                    prompt="Selecione os minutos"
                                    style={styles.timeDisplay}
                                    onValueChange={itemValue => setTo({ ...to, minutes: itemValue } as any)}
                                >
                                    {
                                        fullMinutes.map(h => (
                                            <Picker.Item
                                                key={h.value}
                                                label={h.label}
                                                value={h.value}
                                            />
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <RectButton onPress={applyFilters} style={styles.filterButton}>
                        <Ionicons style={styles.filterButtonIcon} name="ios-search" />
                        <Text style={styles.filterButtonText}>Buscar</Text>
                    </RectButton>
                </ScrollView>
            </PageHeader>
            {
                loading
                    ? <ActivityIndicator size="large" style={styles.spinner} color="#8257E5" />
                    : (
                        <ScrollView
                            style={styles.teacherList}
                            contentContainerStyle={{
                                paddingHorizontal: 16,
                                paddingBottom: 16
                            }}
                        >
                            {
                                teachers.map(teacher => (
                                    <TeacherItem
                                        key={Math.random()}
                                        teacherId={teacher.id}
                                        teacherPhotoURL={teacher.avatar}
                                        teacherName={teacher.name}
                                        teacherSubject={teacher.subject}
                                        teacherBio={teacher.bio}
                                        teacherPrice={teacher.cost}
                                        teacherWhatsapp={teacher.whatsapp}
                                        isFavourited={favourites.includes(teacher.id)}
                                    />
                                ))
                            }
                        </ScrollView>
                    )
            }
        </View>
    )
}

export default TeacherList