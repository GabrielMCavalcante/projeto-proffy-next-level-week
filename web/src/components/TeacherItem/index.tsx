import React from 'react'
import axios from 'axios-config'

// Components
import TeacherSchedule from './TeacherSchedule'

// Images
import whatsappIcon from 'assets/images/icons/whatsapp.svg'
import noAvatarImg from 'assets/images/sem-avatar.svg'

// CSS styles
import './styles.css'

// Interfaces
import { TeacherSchedule as TS } from 'interfaces/forms'

interface TeacherItemProps {
    teacherId: number,
    teacherPhotoURL: string,
    teacherName: string,
    teacherSubject: string,
    teacherBio: string
    teacherPrice: number,
    teacherWhatsapp: number,
    teacherSchedule: TS[], 
    teacherRef?: any
}

const TeacherItem: React.FC<TeacherItemProps> = React.memo(props => {

    function createConnection() {
        axios.post('/connections', { user_id: props.teacherId })
    }

    return (
        <article className="teacher-item" ref={props.teacherRef}>
            <header>
                <img src={
                    props.teacherPhotoURL
                        ? props.teacherPhotoURL
                        : noAvatarImg
                } alt={props.teacherName} />
                <div>
                    <strong>{props.teacherName}</strong>
                    <span>{props.teacherSubject}</span>
                </div>
            </header>
            <p>{props.teacherBio}</p>
            <TeacherSchedule name={props.teacherName} schedule={[...props.teacherSchedule]} />
            <footer>
                <p>
                    Preço/hora
                    <strong>{
                        new Intl.NumberFormat('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(props.teacherPrice)
                    }</strong>
                </p>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${props.teacherWhatsapp}`}
                    onClick={createConnection}
                >
                    <img src={whatsappIcon} alt="Ícone do Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
})

export default TeacherItem