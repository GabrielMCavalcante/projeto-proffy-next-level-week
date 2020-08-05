import React, { useState } from 'react'

// Components
import PageHeader from 'components/PageHeader'
import Input from 'components/UI/Input'
import Textarea from 'components/UI/Textarea'
import Select from 'components/UI/Select'

// Images
import warningIcon from 'assets/images/icons/warning.svg'

// Icons
import { Icon } from '@iconify/react'
import closeIcon from '@iconify/icons-mdi/close'

// CSS styles
import './styles.css'

interface WeekDay {
    value: string,
    label: string
}

interface ScheduleItem {
    week_day: WeekDay,
    from: string,
    to: string
}

function TeacherForm() {

    const [subject, setSubject] = useState<string | null>(null)
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
        { week_day: { value: '1', label: 'Segunda-feira' }, from: '08:00', to: '12:00' }
    ])

    const [availableDays, setAvailableDays] = useState([
        { value: "0", label: "Domingo" },
        { value: "1", label: "Segunda-feira" },
        { value: "2", label: "Terça-feira" },
        { value: "3", label: "Quarta-feira" },
        { value: "4", label: "Quinta-feira" },
        { value: "5", label: "Sexta-feira" },
        { value: "6", label: "Sábado" }
    ])

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

        if (identifier === "week_day" && newValue) {
            const newAvailableDays = [...availableDays]

            const currentSelectedDay = scheduleItems.filter(
                (_, index) => index === scheduleIndex
            )[0]

            newAvailableDays.push(currentSelectedDay.week_day)

            newAvailableDays.sort((a, b) => {
                if (a.value > b.value) return 1
                if (a.value < b.value) return -1
                else return 0
            })

            const filteredAvailableDays = newAvailableDays
                .filter(day => day.value !== (newValue as WeekDay).value)

            setAvailableDays(filteredAvailableDays)
        }

        setScheduleItems([...schedules])
    }

    function addSchedule() {
        const schedules = [...scheduleItems]
        schedules.push({ week_day: availableDays[0], from: '08:00', to: '12:00' })
        const newAvailableDays = [...availableDays]
        newAvailableDays.shift()
        setAvailableDays(newAvailableDays)
        setScheduleItems(schedules)
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer ensinar."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />

            <main>
                <form>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input inputId="name" inputLabel="Nome completo" />
                        <Input inputId="avatar" inputLabel="Avatar" />
                        <Input inputId="whatsapp" inputLabel="WhatsApp" />
                        <Input inputId="bio-header" inputLabel="Título da biografia" />
                        <Textarea textareaId="bio-content" textareaLabel="Biografia" />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            selectLabel="Matéria"
                            selected={{ value: "Artes", label: "Artes" }}
                            items={[
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
                            onOptionSelect={selected => setSubject(selected.value)}
                        />
                        <Input inputId="cost" inputLabel="Custo da sua aula por hora" />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button
                                type="button"
                                onClick={addSchedule}
                                disabled={availableDays.length === 0}
                            >+ Novo Horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => (
                            <div
                                key={scheduleItem.week_day.value}
                                className="schedule-item"
                            >
                                <Icon icon={closeIcon} />
                                <Select
                                    selectLabel="Dia da Semana"
                                    selected={{
                                        value: scheduleItem.week_day.value,
                                        label: scheduleItem.week_day.label
                                    }}
                                    items={availableDays}
                                    onOptionSelect={selected => updateSchedule(index, "week_day", selected)}
                                />
                                <Input
                                    onChange={e => updateSchedule(index, "from", e.target.value)}
                                    value={scheduleItem.from}
                                    inputId="from"
                                    inputLabel="Das"
                                    type="time"
                                />
                                <Input
                                    onChange={e => updateSchedule(index, "to", e.target.value)}
                                    value={scheduleItem.to}
                                    inputId="to"
                                    inputLabel="Até"
                                    type="time"
                                />
                            </div>
                        ))}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            <div>
                                <p>Importante!</p>
                                <p>Preencha todos os dados</p>
                            </div>
                        </p>

                        <button type="button">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm