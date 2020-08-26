import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios-config'

// Components
import PageHeader from 'components/PageHeader'
import Input from 'components/UI/Input'
import Select from 'components/UI/Select'
import Spinner from 'components/UI/Spinner'

// Images
import warningIcon from 'assets/images/icons/warning.svg'

// Icons
import { Icon } from '@iconify/react'
import closeIcon from '@iconify/icons-mdi/close'

// CSS styles
import './styles.css'

// Interfaces
import { FormFields, WeekDay, ScheduleItem } from 'interfaces/forms'

const initialFields: FormFields = {
    whatsapp: {
        value: '',
        validation: /^\([0-9]{2}\)\s9{0,1}[0-9]{4}-[0-9]{4}$/,
        valid: false,
        info: 'O número de telefone deve estar no formato adequado. Ex.: (92) 8121-0742',
        showInfo: "initial",
        touched: false
    },
    bio: {
        value: '',
        validation: /^[\d\w\sà-ú,.!-]{50,300}$/,
        valid: false,
        info: 'A biografia precisa conter de 50 a 300 caracteres.',
        showInfo: "initial",
        touched: false
    },
    cost: {
        value: '',
        validation: /^([0-9]+\.|[1-9])[0-9]*$/,
        valid: false,
        info: 'O custo deve estar no formato adequado. Ex.: 10.50',
        showInfo: "initial",
        touched: false
    }
}

function TeacherForm() {
    const [fields, setFields] = useState<FormFields>(initialFields)
    const [formValid, setFormValid] = useState(false)
    const [loading, setLoading] = useState(false)
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

    function onInputValueChange(e: React.ChangeEvent<any>) {
        const inputIdentifier = e.target.id
        const newInputValue = e.target.value

        const allFields = Object.keys(fields)

        let isFormValid = true
        const isInputValid = fields[inputIdentifier].validation.test(newInputValue)

        if (isInputValid) {
            allFields.forEach(field => {
                if (isFormValid)
                    if (field !== inputIdentifier)
                        isFormValid = fields[field].validation.test(fields[field].value)
            })
        } else isFormValid = false

        if (isFormValid !== formValid)
            setFormValid(isFormValid)

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

    function registerClass(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        axios.post('/classes', {
            whatsapp: fields.whatsapp,
            bio: fields.bio,
            subject,
            cost: fields.cost,
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
                            value={fields.whatsapp.value}
                            onChange={onInputValueChange}
                            inputId="whatsapp"
                            inputLabel="WhatsApp"
                            placeholder="(00) 91234-5678"
                            inputType="input"
                            inputContentType="tel"
                            fields={fields}
                            setFields={setFields}
                            formValid={formValid}
                            setFormValid={setFormValid}
                            hasInfo
                        />
                        <Input
                            value={fields.bio.value}
                            onChange={onInputValueChange}
                            inputId="bio"
                            inputLabel="Biografia (max 300 caracteres)"
                            inputType="textarea"
                            inputContentType="text"
                            fields={fields}
                            setFields={setFields}
                            formValid={formValid}
                            setFormValid={setFormValid}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <div id="subject-cost">
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
                                value={fields.cost.value}
                                onChange={onInputValueChange}
                                inputId="cost"
                                inputLabel="Custo da sua aula por hora"
                                placeholder="50,25"
                                inputType="input"
                                inputContentType="tel"
                                fields={fields}
                                setFields={setFields}
                                formValid={formValid}
                                setFormValid={setFormValid}
                                hasInfo
                            />
                        </div>
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
                                <div className="schedule-input-group">
                                    <label htmlFor="from">Das</label>
                                    <input
                                        onChange={e => updateSchedule(index, "from", e.target.value)}
                                        value={scheduleItem.from}
                                        id="from"
                                        type="time"
                                    />
                                </div>
                                <div className="schedule-input-group">
                                    <label htmlFor="to">Até</label>
                                    <input
                                        onChange={e => updateSchedule(index, "to", e.target.value)}
                                        value={scheduleItem.to}
                                        id="to"
                                        type="time"
                                    />
                                </div>
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