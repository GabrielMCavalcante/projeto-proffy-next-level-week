import React from 'react'

// Images
import whatsappIcon from 'assets/images/icons/whatsapp.svg'

// CSS styles
import './styles.css'

interface TeacherItemProps {
    teacherPhotoURL: string,
    teacherName: string,
    teacherSubject: string,
    teacherDescriptionHeader: string,
    teacherDescriptionContent: string,
    teacherPrice: number
}

const TeacherItem: React.FC<TeacherItemProps> = props => {
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
                {props.teacherDescriptionHeader}
                <br /><br />
                {props.teacherDescriptionContent}
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
                <button>
                    <img src={whatsappIcon} alt="Ícone do Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem