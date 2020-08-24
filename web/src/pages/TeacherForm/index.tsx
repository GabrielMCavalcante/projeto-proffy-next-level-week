import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios-config'

// Components
import PageHeader from 'components/PageHeader'
import Input from 'components/UI/Input'
import Textarea from 'components/UI/Textarea'
import Select from 'components/UI/Select'
import Spinner from 'components/UI/Spinner'

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

    const [formValid, setFormValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [cost, setCost] = useState('')

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

    const history = useHistory()

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

    function removeSchedule(scheduleIndex: number) {
        const removedDay = scheduleItems[scheduleIndex].week_day
        const schedules = scheduleItems.filter((_, index) => index !== scheduleIndex)

        const newAvailableDays = [...availableDays]
        newAvailableDays.push(removedDay)

        newAvailableDays.sort((a, b) => {
            if (a.value > b.value) return 1
            if (a.value < b.value) return -1
            else return 0
        })

        setAvailableDays(newAvailableDays)
        setScheduleItems(schedules)
    }

    useEffect(() => {
        const fields = [name, avatar, whatsapp, bio, cost]

        let valid = true

        fields.forEach(field => {
            if (valid) valid = field ? true : false
        })

        if (valid)
            valid = (!isNaN(Number(cost)) && Number(cost) >= 10 && Number(cost) <= 9999)

        if (valid !== formValid) setFormValid(valid)
    }, [name, avatar, whatsapp, bio, cost]) // eslint-disable-line

    function registerClass(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        axios.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule: scheduleItems
        })
        .then(() => {
            setLoading(false)
            alert('Cadastro realizado com sucesso!')
            history.replace('/menu')
        })
        .catch(() => {
            setLoading(false)
            alert('Erro ao realizar cadastro. Por favor tente novamente mais tarde.')
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer ensinar."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />

            <main>
                <form onSubmit={e => registerClass(e)}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            inputId="name"
                            inputLabel="Nome completo"
                        />
                        <Input
                            value={avatar}
                            onChange={e => setAvatar(e.target.value)}
                            inputId="avatar"
                            inputLabel="Avatar"
                        />
                        <Input
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                            inputId="whatsapp"
                            inputLabel="WhatsApp"
                        />
                        <Textarea
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                            textareaId="bio"
                            textareaLabel="Biografia"
                        />
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
                        <Input
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                            inputId="cost"
                            type="number"
                            min="10"
                            max="9999"
                            inputLabel="Custo da sua aula por hora"
                        />
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
                                {scheduleItems.length > 1 && <div
                                    className="remove-schedule"
                                    onClick={() => removeSchedule(index)}
                                >
                                    <Icon icon={closeIcon} />
                                </div>}
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
                            <span>
                                Importante! <br />
                                Preencha todos os dados
                            </span>
                        </p>

                        <button type="submit" disabled={!formValid || loading}>
                            {loading ? <div className="spinner-resizer"><Spinner /></div> : "Salvar cadastro"}
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm