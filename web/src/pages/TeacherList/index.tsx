import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'
import Input from 'components/UI/Input'
import Select from 'components/UI/Select'

// CSS styles
import './styles.css'

function TeacherList() {

    const [subject, setSubject] = useState<string | null>(null)
    const [weekDay, setWeekDay] = useState<string | null>(null)
    const [schedule, setSchedule] = useState<string | null>(null)

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
                <TeacherItem
                    teacherPhotoURL="https://avatars0.githubusercontent.com/u/56729382?s=400&v=4"
                    teacherName="Gabriel Melo Cavalcante"
                    teacherSubject="Química"
                    teacherDescriptionHeader="Entusiasta das melhores tecnologias de química avançada."
                    teacherDescriptionContent="Apaixonado por explodir coisas em laboratório e por mudar a vida
                    das pessoas através de experiências."
                    teacherPrice={80}
                />
                <TeacherItem
                    teacherPhotoURL="https://avatars0.githubusercontent.com/u/56729382?s=400&v=4"
                    teacherName="Gabriel Melo Cavalcante"
                    teacherSubject="Química"
                    teacherDescriptionHeader="Entusiasta das melhores tecnologias de química avançada."
                    teacherDescriptionContent="Apaixonado por explodir coisas em laboratório e por mudar a vida
                    das pessoas através de experiências."
                    teacherPrice={80}
                />
                <TeacherItem
                    teacherPhotoURL="https://avatars0.githubusercontent.com/u/56729382?s=400&v=4"
                    teacherName="Gabriel Melo Cavalcante"
                    teacherSubject="Química"
                    teacherDescriptionHeader="Entusiasta das melhores tecnologias de química avançada."
                    teacherDescriptionContent="Apaixonado por explodir coisas em laboratório e por mudar a vida
                    das pessoas através de experiências."
                    teacherPrice={80}
                />
                <TeacherItem
                    teacherPhotoURL="https://avatars0.githubusercontent.com/u/56729382?s=400&v=4"
                    teacherName="Gabriel Melo Cavalcante"
                    teacherSubject="Química"
                    teacherDescriptionHeader="Entusiasta das melhores tecnologias de química avançada."
                    teacherDescriptionContent="Apaixonado por explodir coisas em laboratório e por mudar a vida
                    das pessoas através de experiências."
                    teacherPrice={80}
                />
                <TeacherItem
                    teacherPhotoURL="https://avatars0.githubusercontent.com/u/56729382?s=400&v=4"
                    teacherName="Gabriel Melo Cavalcante"
                    teacherSubject="Química"
                    teacherDescriptionHeader="Entusiasta das melhores tecnologias de química avançada."
                    teacherDescriptionContent="Apaixonado por explodir coisas em laboratório e por mudar a vida
                    das pessoas através de experiências."
                    teacherPrice={80}
                />
            </main>
        </div>
    )
}

export default TeacherList