import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios-config'

// Utils
import { formatFetchedPhone } from 'utils/format'
import { weekdays, defaultSchedule } from 'utils/shedule'

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

// Contexts
import { useAuth } from 'contexts/auth'

// CSS styles
import './styles.css'

// Interfaces
import { FormFields, WeekDay, ScheduleItem, ProfileData } from 'interfaces/forms'
import FeedbackModal from 'components/FeedbackModal'

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
    const [subject, setSubject] = useState<string>("Artes")
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(defaultSchedule)
    const [availableDays, setAvailableDays] = useState(weekdays)
    const [hasClass, setHasClass] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const history = useHistory()
    const authContext = useAuth()

    useEffect(() => {
        axios.get("/get-profile", {
            headers: {
                authorization: "Bearer " + authContext.token,
                userid: authContext.user?.__id
            }
        })
            .then(response => {
                const userData: ProfileData = response.data
                if (userData.subject) {
                    setHasClass(true)
                    setShowModal(true)
                    return
                }

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
                        value: userData.bio
                    }
                })

            }).catch(err => console.log(err))
    }, []) // eslint-disable-line

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

    function registerClass(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
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
                setShowModal(true)
            })
            .catch(() => {
                setLoading(false)
                alert('Erro ao realizar cadastro. Por favor tente novamente mais tarde.')
            })
    }

    const errorModal = (
        <FeedbackModal
            status="error"
            message="Você já cadastrou uma aula!"
            onCloseModal={() => history.replace("/menu")}
        />
    )

    const successModal = (
        <FeedbackModal
            status="success"
            message="Aula cadastrada com sucesso! 
            Você pode editar informações sobre a aula no seu perfil."
            onCloseModal={() => history.replace("/menu")}
        />
    )

    const mainContent = (
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

    return (
        <>
            {
                hasClass
                    ? showModal && errorModal
                    : showModal 
                        ? successModal
                        : mainContent
            }
        </>
    )
}

export default TeacherForm