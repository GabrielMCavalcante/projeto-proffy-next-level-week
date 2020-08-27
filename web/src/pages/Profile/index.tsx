import React, { useState, useEffect } from 'react'
import axios from 'axios-config'

// Icons
import { Icon } from '@iconify/react'
import closeIcon from '@iconify/icons-mdi/close'
import cameraIcon from '@iconify/icons-mdi/camera'

// Images
import noAvatarImg from 'assets/images/sem-avatar.svg'

// Components
import PageHeader from 'components/PageHeader'
import Input from 'components/UI/Input'
import Select from 'components/UI/Select'
import Spinner from 'components/UI/Spinner'

// Contexts
import { useAuth } from 'contexts/auth'

// Interfaces
import { FormFields, WeekDay, ScheduleItem } from 'interfaces/forms'

// CSS styles
import './styles.css'
import { useHistory } from 'react-router-dom'

const initialFields: FormFields = {
    whatsapp: {
        value: '',
        validation: /^\([0-9]{2}\)\s9?[0-9]{4}-[0-9]{4}$/,
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

interface ProfileData {
    name: string,
    email: string,
    avatar: string,
    whatsapp: string,
    bio: string,
    subject: string,
    cost: number,
    schedule: ScheduleItem[]
}

function Profile() {

    const authContext = useAuth()
    const history = useHistory()
    const [fields, setFields] = useState(initialFields)
    const [formValid, setFormValid] = useState(false)
    const [avatar, setAvatar] = useState<string>('')
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
        { week_day: { value: '1', label: 'Segunda-feira' }, from: '08:00', to: '12:00' }
    ])

    useEffect(() => {
        (function fetchProfileData() {
            setLoading(true)
            axios.get("/get-profile", {
                headers: {
                    authorization: "Bearer " + authContext.token,
                    userid: authContext.user?.__id
                }
            })
                .then(response => {
                    setLoading(false)
                    const profileData: ProfileData = response.data
                    let whatsapp = ''

                    if (profileData.whatsapp) {
                        let formattedPhone = String(profileData.whatsapp).split('')

                        formattedPhone.unshift("(")

                        formattedPhone.push('')
                        formattedPhone.push('')
                        for (let i = formattedPhone.length - 1; i >= 5; i--) 
                            formattedPhone[i] = formattedPhone[i-2]
                        
                        formattedPhone[3] = ")"
                        formattedPhone[4] = " "

                        formattedPhone.push('')
                        if (formattedPhone.length === 14) {
                            for (let i = formattedPhone.length - 1; i >= 9; i--) 
                                formattedPhone[i] = formattedPhone[i-1]
                            formattedPhone[9] = "-"
                        } else if (formattedPhone.length === 15) {
                            for (let i = formattedPhone.length - 1; i >= 10; i--) 
                                formattedPhone[i] = formattedPhone[i-1]
                            formattedPhone[10] = "-"
                        }

                        whatsapp = formattedPhone.join('')
                    }

                    setFields({
                        ...fields,
                        whatsapp: {
                            ...fields.whatsapp,
                            value: whatsapp,
                            validation: !profileData.subject
                                ? /^([@]?|\([0-9]{2}\)\s9{0,1}[0-9]{4}-[0-9]{4})$/
                                : fields.bio.validation
                        },
                        bio: {
                            ...fields.bio,
                            value: profileData.bio ? String(profileData.bio) : '',
                            validation: !profileData.subject
                                ? /^[\d\w\sà-ú,.!-]{0,300}$/
                                : fields.bio.validation
                        },
                        cost: {
                            ...fields.cost,
                            value: profileData.cost ? String(profileData.cost) : '',
                            validation: !profileData.subject
                                ? /[0-9]?/
                                : fields.bio.validation
                        }
                    })

                    if (profileData.avatar) setAvatar(profileData.avatar)
                    else setAvatar(noAvatarImg)

                    setName(profileData.name)
                    setEmail(profileData.email)

                    if (profileData.schedule.length > 0)
                        setScheduleItems(profileData.schedule)

                    if (profileData.subject)
                        setSubject(profileData.subject)
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })
        })()
    }, []) // eslint-disable-line

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

    function uploadAvatar() {
        const fileInput = document.getElementById('upload-avatar')! as HTMLInputElement
        fileInput.click()
        fileInput.onchange = () => {
            const file = fileInput.files![0]
            if (!file.type.match(/^image\/(png|jpeg|jpg)$/))
                return alert("Apenas arquivos de imagens são aceitos!")

            const fr = new FileReader()
            fr.onloadend = (e) => {
                setAvatar(e.target?.result as string)
                setFormValid(true)
            }
            fr.readAsDataURL(file)
        }
    }

    function updateProfile(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const parsedWhatsapp = fields.whatsapp.value.replace(/[)(\s-]/g, "")

        const userData = {
            avatar,
            subject,
            bio: fields.bio.value,
            cost: fields.cost.value,
            schedule: [...scheduleItems],
            whatsapp: parsedWhatsapp
        }

        axios.put("/update-profile", userData, {
            headers: {
                authorization: "Bearer " + authContext.token,
                userid: authContext.user?.__id
            }
        })
            .then(res => {
                alert(res.data.status)
                authContext.user = {
                    ...authContext.user!,
                    avatar,
                    bio: fields.bio.value,
                    whatsapp: fields.whatsapp.value
                }
                history.replace("/menu")
            })
            .catch(err => console.log(err))
    }

    return (
        <div id="proffy-profile">
            <PageHeader
                title="Meu perfil"
            />

            <main>
                <form onSubmit={updateProfile}>
                    <div id="profile-avatar">
                        <div id="profile-avatar-image">
                            <img src={avatar} alt="Profile" />
                            <div onClick={uploadAvatar}>
                                <Icon icon={cameraIcon} />
                            </div>
                            <input
                                id="upload-avatar"
                                type="file"
                                accept="image/png, image/jpeg, image/svg"
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div id="profile-avatar-description">
                            <p>{name}</p>
                            <p>{subject ? subject : "Estudante"}</p>
                        </div>
                    </div>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            value={name}
                            inputId="name"
                            inputLabel="Nome"
                            inputType="input"
                            inputContentType="text"
                            disabled
                        />
                        <Input
                            value={email}
                            inputId="email"
                            inputLabel="Email"
                            inputType="input"
                            inputContentType="email"
                            disabled
                        />
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
                    {
                        subject && (
                            <>
                                <fieldset>
                                    <legend>Sobre a aula</legend>
                                    <div id="subject-cost">
                                        <Select
                                            selectLabel="Matéria"
                                            selected={{ value: subject, label: subject }}
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
                            </>
                        )
                    }

                    <footer>
                        <button type="submit" disabled={!formValid || loading}>
                            {
                                loading
                                    ? <div className="spinner-resizer"><Spinner /></div>
                                    : "Salvar modificações"
                            }
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default Profile