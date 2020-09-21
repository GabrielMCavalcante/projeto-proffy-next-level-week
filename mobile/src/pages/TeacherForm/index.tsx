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
import { useNavigation } from '@react-navigation/native'

// Components
import PageHeader from 'components/PageHeader'

// Contexts
import { useAuth } from 'contexts/auth'

// Images
import warningImg from 'assets/images/icons/warning.png'

// Utils
import { formatFetchedPhone, formatCurrentPhone } from 'utils/format'
import { weekdays, defaultSchedule } from 'utils/schedule'
import { subjects } from 'utils/subjects'

// CSS styles
import styles from './styles'

// Interfaces
import { ScheduleItem, FormFields, ProfileData, WeekDay } from '../../interfaces'

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
    const [feedback, setFeedback] = useState('')

    const authContext = useAuth()
    const navigation = useNavigation()

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

    useEffect(() => {
        setFormValid(verifyIfFormIsValid()[0])
    }, [scheduleItems])

    function verifyIfFormIsValid(inputIdentifier?: string, newInputValue?: string) {
        const allFields = Object.keys(fields)
        let isFormValid = true
        const isInputValid = (inputIdentifier && newInputValue )
            ? fields[inputIdentifier].validation.test(newInputValue)
            : true

        if (isInputValid) {
            allFields.forEach(field => {
                if (isFormValid)
                    if (!inputIdentifier || field !== inputIdentifier)
                        isFormValid = fields[field].validation.test(fields[field].value)
            })
        } else isFormValid = false

        if(isFormValid) {
            scheduleItems.forEach(scheduleItem => {
                isFormValid = scheduleItem.week_day !== null
            })

            if(isFormValid) {
                for(let c = 0; c < scheduleItems.length; c++) {
                    const currDay = scheduleItems[c].week_day!.value
                    for(let C = 0; C < scheduleItems.length; C++) {
                        isFormValid = !(scheduleItems[C].week_day!.value === currDay && C !== c)
                        if(!isFormValid) break
                    }
                    if(!isFormValid) break
                }
            }
        }

        return [isFormValid, isInputValid]
    }

    function onInputValueChange(inputIdentifier: string, newText: string) {
        let newInputValue = newText

        if (inputIdentifier === "whatsapp")
            newInputValue = formatCurrentPhone(newInputValue)

        const [isFormValid, isInputValid] = verifyIfFormIsValid(inputIdentifier, newInputValue)

        if (isFormValid !== formValid)
            setFormValid(isFormValid)

        if (feedback) setFeedback('')

        setFields({
            ...fields,
            [inputIdentifier]: {
                ...fields[inputIdentifier],
                value: newInputValue,
                touched: true,
                valid: isInputValid
            }
        })
    }

    function updateSchedule(
        scheduleIndex: number,
        identifier: "week_day" | "from" | "to",
        newValue: string | WeekDay
    ) {
        const schedules = scheduleItems.map((scheduleItem, index) => {
            if (index !== scheduleIndex) return scheduleItem
            else {
                return {
                    ...scheduleItem,
                    [identifier]: newValue
                }
            }
        })
        
        setScheduleItems([...schedules])
    }

    function addSchedule() {
        if (scheduleItems.length < 7) {
            const schedules = [...scheduleItems]
            schedules.push({ week_day: null, from: '08:00', to: '12:00' })
            setScheduleItems(schedules)
            setFormValid(false)
        }
    }

    function removeSchedule(scheduleIndex: number) {
        const schedules = [...scheduleItems].filter((_, index) => index !== scheduleIndex)
        setScheduleItems([...schedules])
        setFormValid(verifyIfFormIsValid()[0])
    }

    function registerClass() {
        setLoading(true)
        axios.post('/classes', {
            whatsapp: fields.whatsapp.value.replace(/[)(\s-]/g, ""),
            bio: fields.bio.value,
            subject,
            cost: fields.cost.value,
            schedule: [...scheduleItems]
        }, {
            headers: {
                authorization: "Bearer " + authContext.token,
                userid: authContext.user?.__id
            }
        })
            .then(() => {
                setLoading(false)
                navigation.navigate("class-registered")
            })
            .catch(() => {
                setLoading(false)
                setFeedback('Erro ao realizar cadastro. Por favor tente novamente mais tarde.')
            })
    }

    function getFieldInputStyles(inputIdentifier: string) {
        return [
            styles.fieldInput,
            !fields[inputIdentifier].valid
            && fields[inputIdentifier].touched
            && styles.invalidFieldInput
        ]
    }

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
                    style={getFieldInputStyles("whatsapp")}
                    placeholder="(12) 93456-7890"
                    value={fields.whatsapp.value}
                    onChangeText={text => onInputValueChange("whatsapp", text)}
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.fieldLabel}>
                    Biografia
                </Text>
                <TextInput
                    multiline
                    style={[...getFieldInputStyles("bio"), styles.fieldTextarea]}
                    placeholder="Escreva sobre você e sua aula!"
                    underlineColorAndroid="transparent"
                    numberOfLines={10}
                    maxLength={300}
                    value={fields.bio.value}
                    onChangeText={text => onInputValueChange("bio", text)}
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
                    Custo da sua hora por aula
                </Text>
                <TextInput
                    style={getFieldInputStyles("cost")}
                    placeholder="R$ 49.99"
                    keyboardType="number-pad"
                    value={fields.cost.value}
                    onChangeText={text => onInputValueChange("cost", text)}
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

                <RectButton
                    enabled={scheduleItems.length < 7}
                    onPress={addSchedule}
                    style={styles.addScheduleBtn}
                >
                    <Text style={[
                        styles.addScheduleBtnText,
                        scheduleItems.length >= 7 && styles.addScheduleBtnTextDisabled
                    ]}>
                        + Novo
                    </Text>
                </RectButton>
            </View>

            {scheduleItems.map((scheduleItem, index) => (
                <View key={index} >
                    <View>
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
                                defaultValue={scheduleItem.week_day?.value}
                                activeLabelStyle={{ fontFamily: 'Poppins_600SemiBold' }}
                                placeholder="Selecione um dia da semana"
                                dropDownStyle={styles.dropdownList}
                                onChangeItem={item => updateSchedule(index, "week_day", item)}
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
                                    onChangeText={text => updateSchedule(index, "from", text)}
                                />
                            </View>

                            <View style={styles.field}>
                                <Text style={styles.fieldLabel}>
                                    Até
                                </Text>
                                <TextInput
                                    style={styles.fieldInput}
                                    placeholder="12:00"
                                    value={scheduleItem.to}
                                    onChangeText={text => updateSchedule(index, "to", text)}
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
                                onPress={() => removeSchedule(index)}
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
                onPress={registerClass}
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
                                            {formBottomContent}
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