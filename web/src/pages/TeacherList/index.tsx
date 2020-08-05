import React from 'react'
// import { Link } from 'react-router-dom'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'
import Input from 'components/UI/Input'

// CSS styles
import './styles.css'

function TeacherList() {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
                    <Input 
                        inputId="subject"
                        inputLabel="Matéria"
                    />
                    <Input 
                        inputId="week-day"
                        inputLabel="Dia da Semana"
                    />
                    <Input 
                        inputId="schedule"
                        inputLabel="Horário"
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