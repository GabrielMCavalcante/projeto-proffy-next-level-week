import React from 'react'
import axios from 'axios-config'

// Images
import whatsappIcon from 'assets/images/icons/whatsapp.svg'

// CSS styles
import './styles.css'

interface TeacherItemProps {
    teacherId: number,
    teacherPhotoURL: string,
    teacherName: string,
    teacherSubject: string,
    teacherBio: string
    teacherPrice: number,
    teacherWhatsapp: number
}

const TeacherItem: React.FC<TeacherItemProps> = props => {

    function createConnection() {
        axios.post('/connections', { user_id: props.teacherId })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={props.teacherPhotoURL} alt={props.teacherName} />
                <div>
                    <strong>{props.teacherName}</strong>
                    <span>{props.teacherSubject}</span>
                </div>
            </header>
            <p>
                {props.teacherBio}
            </p>
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
}

export default TeacherItem