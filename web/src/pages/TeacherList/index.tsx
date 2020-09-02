import React, { useState, useEffect } from 'react'
import axios from 'axios-config'
import { useHistory } from 'react-router-dom'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'
import Input from 'components/UI/Input'
import Select from 'components/UI/Select'
import Spinner from 'components/UI/Spinner'

// Contexts
import { useAuth } from 'contexts/auth'

// Images
import notFoundIcon from 'assets/images/icons/not-found.svg'

// Icons
import { Icon } from '@iconify/react'
import searchIcon from '@iconify/icons-mdi/magnify'

// CSS styles
import './styles.css'

// Interfaces
import { TeacherSchedule } from 'interfaces/forms'

interface ClassItem {
    id: number,
    subject: string,
    cost: number,
    name: 'string',
    avatar: string,
    whatsapp: number,
    bio: string,
    schedule: TeacherSchedule[]
}

function TeacherList() {

    const [classList, setClassList] = useState<ClassItem[]>([])
    const [loading, setLoading] = useState(false)
    const [reFetch, setReFetch] = useState(true)
    const [hasMore, setHasMore] = useState(true)

    const [subject, setSubject] = useState<string | null>(null)
    const [weekDay, setWeekDay] = useState<string | null>(null)
    const [from, setFrom] = useState<string | null>(null)
    const [to, setTo] = useState<string | null>(null)

    const history = useHistory()
    const authContext = useAuth()

    useEffect(() => {
        (function fetchClasses() {
            if (reFetch && hasMore) {
                setReFetch(false)
                setLoading(true)
                axios.get('/classes', {
                    headers: {
                        authorization: 'Bearer ' + authContext.token,
                        userid: authContext.user?.__id
                    }
                })
                    .then(response => {
                        setLoading(false)
                        setClassList(response.data.resultsInfo.results)
                        setHasMore(!!response.data.resultsInfo.next)
                    })
                    .catch(() => {
                        setLoading(false)
                        alert('Ocorreu um erro desconhecido ao carregar as classes.')
                        history.replace('/')
                    })
            }
        })()
    }, [reFetch]) // eslint-disable-line

    function filterClasses(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setClassList([])
        axios.get('/classes', {
            params: {
                subject,
                week_day: weekDay,
                from,
                to
            },
            headers: {
                authorization: 'Bearer ' + authContext.token,
                userid: authContext.user?.__id
            }
        })
            .then(response => {
                setLoading(false)
                setClassList([...response.data.resultsInfo.results])
                setHasMore(!!response.data.resultsInfo.next)
            })
            .catch(() => {
                setLoading(false)
                alert('Erro ao aplicar filtros. Mostrando todos os resultados.')
                setSubject(null)
                setWeekDay(null)
                setFrom(null)
                setTo(null)
                setReFetch(true)
            })
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={filterClasses}>
                    <Select
                        selectLabel="Matéria"
                        selected={{ value: "", label: "Todas as matérias" }}
                        items={[
                            { value: "", label: "Todas as matérias" },
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
                    <Select
                        selectLabel="Dia da Semana"
                        selected={{ value: "", label: "Todos os dias" }}
                        items={[
                            { value: "", label: "Todos os dias" },
                            { value: "1", label: "Segunda-feira" },
                            { value: "2", label: "Terça-feira" },
                            { value: "3", label: "Quarta-feira" },
                            { value: "4", label: "Quinta-feira" },
                            { value: "5", label: "Sexta-feira" },
                            { value: "6", label: "Sábado" },
                            { value: "0", label: "Domingo" },
                        ]}
                        onOptionSelect={selected => setWeekDay(selected.value)}
                    />
                    <Input 
                        inputId="schedule-from"
                        inputLabel="Das"
                        type="time"
                        onChange={(e: any) => setFrom(e.target.value)}
                        inputType="input"
                        inputContentType="text"
                    />
                     
                    <Input
                        inputId="schedule-to"
                        inputLabel="Até"
                        type="time"
                        onChange={(e: any) => setTo(e.target.value)}
                        inputType="input"
                        inputContentType="text"
                    />
                    <button type="submit">
                        <Icon icon={searchIcon} />
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {
                    loading
                        ? <div className="spinner-resizer"><Spinner /></div>
                        : classList.length > 0
                            ? classList.map((currentClass, index) => {
                                return (
                                <TeacherItem
                                    key={index}
                                    teacherId={currentClass.id}
                                    teacherPhotoURL={currentClass.avatar}
                                    teacherName={currentClass.name}
                                    teacherSubject={currentClass.subject}
                                    teacherBio={currentClass.bio}
                                    teacherPrice={currentClass.cost}
                                    teacherWhatsapp={currentClass.whatsapp}
                                    teacherSchedule={currentClass.schedule}
                                />
                            )})
                            : (
                                <section className="no-classes-found">
                                    <header>
                                        Oops! Parece que não foi encontrada nenhuma classe <br />
                                        disponível. Tente alterar os filtros.
                                    </header>

                                    <img src={notFoundIcon} alt="Nenhuma classe encontrada"/>
                                </section>
                            )
                }
            </main>
        </div>
    )
}

export default TeacherList