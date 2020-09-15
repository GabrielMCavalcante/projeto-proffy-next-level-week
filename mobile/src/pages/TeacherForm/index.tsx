import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Image, ActivityIndicator
} from 'react-native'
import { RectButton, TextInput } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios-config'

// Components
import PageHeader from 'components/PageHeader'

// Contexts
import { useAuth } from 'contexts/auth'

// Images
import warningImg from 'assets/images/icons/warning.png'

// Utils
import { formatFetchedPhone } from 'utils/format'
import { weekdays, defaultSchedule } from 'utils/schedule'

// CSS styles
import styles from './styles'

// Interfaces
import { ScheduleItem, FormFields, ProfileData } from '../../interfaces'

const availableSubjects = [
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
]

const initialFields: FormFields = {
    whatsapp: {
        value: '',
        validation: /^\([0-9]{2}\)\s9{0,1}[0-9]{4}-[0-9]{4}$/,
        valid: false,
        touched: false
    },
    bio: {
        value: '',
        validation: /^[\d\w\sà-ú,.!-]{50,300}$/,
        valid: false,
        touched: false
    },
    cost: {
        value: '',
        validation: /^([0-9]+\.|[1-9])[0-9]*$/,
        valid: false,
        touched: false
    }
}

function TeacherForm() {
    const [fields, setFields] = useState<FormFields>(initialFields)
    const [formValid, setFormValid] = useState(false)
    const [loadingData, setLoadingData] = useState(true)
    const [loading, setLoading] = useState(false)
    const [subject, setSubject] = useState<string>("Artes")
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(defaultSchedule)
    const [availableDays, setAvailableDays] = useState(weekdays)

    const authContext = useAuth()

    useEffect(() => {
        setLoadingData(true)
        axios.get("/get-profile", {
            headers: {
                authorization: "Bearer " + authContext.token,
                userid: authContext.user?.__id
            }
        })
            .then(response => {
                setLoadingData(false)
                const userData: ProfileData = response.data
                // if (userData.subject) {
                //     setHasClass(true)
                //     setShowModal(true)
                //     return
                // }

                setFields({
                    ...fields,
                    whatsapp: {
                        ...fields.whatsapp,
                        value: userData.whatsapp ? formatFetchedPhone(userData.whatsapp) : ''
                    },
                    cost: {
                        ...fields.cost,
                        value: userData.cost ? String(userData.cost) : ''
                    },
                    bio: {
                        ...fields.bio,
                        value: userData.bio ? String(userData.bio) : ''
                    }
                })

            }).catch(err => {
                setLoadingData(false)
                console.log(err)
            })
    }, []) // eslint-disable-line

    const header = (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                Que incrível que você quer dar aulas!
                                    </Text>
            <Text style={styles.headerDescription}>
                O primeiro passo é preencher este formulário de inscrição.
                                    </Text>
        </View>
    )

    const userFieldset = (
        <View style={styles.fieldset}>
            <View style={styles.fieldsetHeader}>
                <Text style={styles.fieldsetHeaderTitle}>
                    Seus dados
                </Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.fieldLabel}>
                    Whatsapp
                </Text>
                <TextInput
                    style={styles.fieldInput}
                    placeholder="(12) 93456-7890"
                    value={fields.whatsapp.value}
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.fieldLabel}>
                    Biografia
                </Text>
                <TextInput
                    multiline
                    style={[styles.fieldInput, styles.fieldTextarea]}
                    placeholder="Escreva sobre você e sua aula!"
                    underlineColorAndroid="transparent"
                    numberOfLines={10}
                    maxLength={300}
                    value={fields.bio.value}
                />
            </View>
        </View>
    )

    const classFieldset = (
        <View style={styles.fieldset}>
            <View style={styles.fieldsetHeader}>
                <Text style={styles.fieldsetHeaderTitle}>
                    Sobre a aula
                </Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.fieldLabel}>
                    Matéria
                </Text>
                <DropDownPicker
                    items={availableSubjects}
                    containerStyle={{ height: 40 }}
                    style={styles.dropdown}
                    itemStyle={styles.dropdownItem}
                    activeItemStyle={styles.dropdownActiveItem}
                    labelStyle={{ fontFamily: 'Poppins_400Regular' }}
                    activeLabelStyle={{ fontFamily: 'Poppins_600SemiBold' }}
                    placeholder="Selecione uma matéria"
                    defaultValue={subject}
                    dropDownStyle={styles.dropdownList}
                // onChangeItem={item => setSubject(item.value)}
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.fieldLabel}>
                    Custo da sua hora por aula
                </Text>
                <TextInput
                    style={styles.fieldInput}
                    placeholder="R$ 49,99"
                    keyboardType="number-pad"
                    value={fields.cost.value}
                />
            </View>
        </View>
    )

    const scheduleFieldset = (
        <View style={styles.fieldset}>
            <View style={styles.fieldsetHeader}>
                <Text style={styles.fieldsetHeaderTitle}>
                    Horários disponíveis
                </Text>

                <RectButton style={styles.addScheduleBtn}>
                    <Text style={styles.addScheduleBtnText}>
                        + Novo
                    </Text>
                </RectButton>
            </View>

            {scheduleItems.map((scheduleItem, i) => (
                <View key={i} >
                    <View>
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>
                                Dia da Semana
                            </Text>
                            <DropDownPicker
                                items={availableDays}
                                containerStyle={{ height: 40 }}
                                style={styles.dropdown}
                                itemStyle={styles.dropdownItem}
                                activeItemStyle={styles.dropdownActiveItem}
                                labelStyle={{ fontFamily: 'Poppins_400Regular' }}
                                activeLabelStyle={{ fontFamily: 'Poppins_600SemiBold' }}
                                placeholder="Selecione um dia da semana"
                                defaultValue={scheduleItem.week_day.value}
                                dropDownStyle={styles.dropdownList}
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
                                    value={scheduleItem.from}
                                    keyboardType="number-pad"
                                />
                            </View>

                            <View style={styles.field}>
                                <Text style={styles.fieldLabel}>
                                    Até
                                </Text>
                                <TextInput
                                    style={styles.fieldInput}
                                    placeholder="12:00"
                                    value="12:00"
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>
                    </View>

                    {
                        scheduleItems.length > 1
                        &&
                        <View style={styles.scheduleSeparator}>
                            <View style={styles.lineSeparator} />

                            <RectButton
                                style={styles.removeScheduleBtn}
                            // onClick={() => removeSchedule(index)}
                            >
                                <Text
                                    style={styles.removeScheduleBtnText}
                                >Excluir horário</Text>
                            </RectButton>

                            <View style={styles.lineSeparator} />
                        </View>
                    }
                </View>
            ))}
        </View>
    )

    const formBottomContent = (
        <>
            <RectButton
                enabled={formValid && !loading}
                style={[
                    styles.formSubmitButton,
                    formValid && !loading
                        ? styles.formSubmitButtonActive
                        : styles.formSubmitButtonUnactive
                ]}>
                {
                    !loading
                        ? (
                            <Text
                                style={[
                                    styles.formSubmitButtonText,
                                    formValid
                                        ? styles.formSubmitButtonTextActive
                                        : styles.formSubmitButtonTextUnactive
                                ]}>Salvar cadastro</Text>
                        ) : <ActivityIndicator />
                }
            </RectButton>

            <View style={styles.formWarning}>
                <Image source={warningImg} />
                <View style={styles.formWarningText}>
                    <Text style={styles.formWarningTitle}>Importante!</Text>
                    <Text 
                        style={styles.formWarningSubtitle}
                    >Preencha todos os dados</Text>
                </View>
            </View>
        </>
    )

    return (
        <KeyboardAvoidingView
            style={styles.teacherForm}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <PageHeader title="Dar aulas" returnTo="landing" />
                {
                    loadingData
                        ? <ActivityIndicator
                            size={50}
                            style={{ position: 'absolute', top: '50%', left: '42%' }}
                        />
                        : (
                            <ScrollView
                                contentContainerStyle={{ justifyContent: 'flex-end' }}
                                style={{ flex: 1 }}
                            >
                                { header}
                                <View style={styles.content}>
                                    <View style={styles.formCard}>
                                        <View style={styles.mainFormContent}>
                                            {userFieldset}

                                            {classFieldset}

                                            {scheduleFieldset}
                                        </View>

                                        <View style={styles.bottomFormContent}>
                                            { formBottomContent }
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        )
                }
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default TeacherForm