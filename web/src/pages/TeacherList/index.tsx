import React, { useState, useEffect } from 'react'
import axios from 'axios-config'
import { useHistory } from 'react-router-dom'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'
import Input from 'components/UI/Input'
import Select from 'components/UI/Select'
import Spinner from 'components/UI/Spinner'

// CSS styles
import './styles.css'

interface ClassItem {
    subject: string,
    cost: number,
    name: 'string',
    avatar: string,
    whatsapp: number,
    bio_header: string,
    bio_content: string
}

function TeacherList() {

    const [classes, setClasses] = useState<ClassItem[]>([])
    const [loading, setLoading] = useState(false)

    const [subject, setSubject] = useState<string | null>(null)
    const [weekDay, setWeekDay] = useState<string | null>(null)
    const [schedule, setSchedule] = useState<string | null>(null)

    const history = useHistory()

    useEffect(() => {
        (function fetchClasses() {
            setLoading(true)
            axios.get('/classes')
                .then(response => {
                    setLoading(false)
                    setClasses(response.data.search)
                })
                .catch(() => {
                    setLoading(false)
                    alert('Ocorreu um erro desconhecido ao carregar as classes.')
                    history.replace('/')
                })
        })()
    }, []) // eslint-disable-line

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
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
                        inputId="schedule"
                        inputLabel="Horário"
                        type="time"
                        onChange={e => setSchedule(e.target.value)}
                    />
                </form>
            </PageHeader>

            <main>
                {
                    loading
                        ? <div className="spinner-resizer"><Spinner /></div>
                        : classes.map((currentClass, index) => (
                            <TeacherItem
                                key={index}
                                teacherPhotoURL={currentClass.avatar}
                                teacherName={currentClass.name}
                                teacherSubject={currentClass.subject}
                                teacherDescriptionHeader={currentClass.bio_header}
                                teacherDescriptionContent={currentClass.bio_content}
                                teacherPrice={currentClass.cost}
                            />
                        ))
                }
            </main>
        </div>
    )
}

export default TeacherList