import React from 'react'
// import { Link } from 'react-router-dom'

// Components
import PageHeader from 'components/PageHeader'
import TeacherItem from 'components/TeacherItem'

// CSS styles
import './styles.css'

function TeacherList() {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
                    <div className="input-block">
                        <label htmlFor="subject">Matéria</label>
                        <input type="text" id="subject" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="week-day">Dia da semana</label>
                        <input type="text" id="week-day" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="schedule">Horário</label>
                        <input type="text" id="schedule" />
                    </div>
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