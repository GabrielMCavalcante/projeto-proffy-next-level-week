import React, { useState } from 'react'
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Image
} from 'react-native'
import { RectButton, TextInput } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker'

// Components
import PageHeader from 'components/PageHeader'

// Images
import warningImg from 'assets/images/icons/warning.png'

// Utils
import { weekdays, defaultSchedule } from '../../utils/schedule'

// CSS styles
import styles from './styles'

// Interfaces
import { ScheduleItem } from '../../interfaces'

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

function TeacherForm() {
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(defaultSchedule)
    const [availableDays, setAvailableDays] = useState(weekdays)

    return (
        <KeyboardAvoidingView
            style={styles.teacherForm}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <PageHeader title="Dar aulas" returnTo="landing"/>
                <ScrollView
                    contentContainerStyle={{ justifyContent: 'flex-end' }}
                    style={{ flex: 1 }}
                >
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Que incrível que você quer dar aulas!
                        </Text>
                        <Text style={styles.headerDescription}>
                            O primeiro passo é preencher este formulário de inscrição.
                        </Text>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.formCard}>
                            <View style={styles.mainFormContent}>
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
                                        />
                                    </View>
                                </View>

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
                                            defaultValue="Artes"
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
                                        />
                                    </View>
                                </View>

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
                                                        <Text style={styles.removeScheduleBtnText}>Excluir horário</Text>
                                                    </RectButton>

                                                    <View style={styles.lineSeparator} />
                                                </View>
                                            }
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.bottomFormContent}>
                                <RectButton style={[styles.formSubmitButton, styles.formSubmitButtonActive]}>
                                    <Text style={[styles.formSubmitButtonText, styles.formSubmitButtonTextActive]}>Salvar cadastro</Text>
                                </RectButton>

                                <View style={styles.formWarning}>
                                    <Image source={warningImg}/>
                                    <View style={styles.formWarningText}>
                                        <Text style={styles.formWarningTitle}>Importante!</Text>
                                        <Text style={styles.formWarningSubtitle}>Preencha todos os dados</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default TeacherForm