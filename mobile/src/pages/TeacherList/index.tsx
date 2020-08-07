import React, { useState } from 'react'
import { View, Text, Picker } from 'react-native'
import { ScrollView, RectButton } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker'


// Icons
import { Ionicons } from '@expo/vector-icons'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'

// Styles
import styles from './styles'

const fullHours: { label: string, value: string }[] = []
const fullMinutes: { label: string, value: string }[] = []

for (let i = 1; i <= 23; i++)
    fullHours.push({
        label: String(i).padStart(2, '0'),
        value: String(i).padStart(2, '0')
    })
for (let i = 0; i <= 59; i++)
    fullMinutes.push({
        label: String(i).padStart(2, '0'),
        value: String(i).padStart(2, '0')
    })

function TeacherList() {

    const [subject, setSubject] = useState('Artes')
    const [weekDay, setWeekDay] = useState('1')
    const [from, setFrom] = useState({ hours: '23', minutes: '59' })
    const [to, setTo] = useState({ hours: '23', minutes: '59' })

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys Disponíveis">
                <ScrollView style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <DropDownPicker
                        items={[
                            { label: 'Artes', value: 'Artes' },
                            { label: 'Biologia', value: 'Biologia' },
                        ]}
                        defaultValue={subject}
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
                            { label: 'Segunda-feira', value: '1' },
                            { label: 'Terça-feira', value: '2' },
                        ]}
                        defaultValue={weekDay}
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
                                    selectedValue={from.hours}
                                    prompt="Selecione as horas"
                                    style={styles.timeDisplay}
                                    onValueChange={itemValue => 
                                        setFrom({ ...from, hours: itemValue })
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
                                    selectedValue={from.minutes}
                                    prompt="Selecione os minutos"
                                    style={styles.timeDisplay}
                                    onValueChange={itemValue => setFrom({ ...from, minutes: itemValue })}
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
                                    selectedValue={to.hours}
                                    prompt="Selecione as horas"
                                    style={styles.timeDisplay}
                                    onValueChange={itemValue => 
                                        setTo({ ...to, hours: itemValue })
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
                                    selectedValue={to.minutes}
                                    prompt="Selecione os minutos"
                                    style={styles.timeDisplay}
                                    onValueChange={itemValue => setTo({ ...to, minutes: itemValue })}
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

                    <RectButton style={styles.filterButton}>
                        <Ionicons style={styles.filterButtonIcon} name="ios-search" />
                        <Text style={styles.filterButtonText}>Buscar</Text>
                    </RectButton>
                </ScrollView>
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </ScrollView>
        </View>
    )
}

export default TeacherList