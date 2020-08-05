import React from 'react'

// Components
import PageHeader from 'components/PageHeader'
import Input from 'components/UI/Input'
import Textarea from 'components/UI/Textarea'

// Images
import warningIcon from 'assets/images/icons/warning.svg'

// CSS styles
import './styles.css'

function TeacherForm() {
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer ensinar."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />

            <main>
                <form>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input inputId="name" inputLabel="Nome completo" />
                        <Input inputId="avatar" inputLabel="Avatar" />
                        <Input inputId="whatsapp" inputLabel="WhatsApp" />
                        <Input inputId="bio-header" inputLabel="Título da biografia"/>
                        <Textarea textareaId="bio-content" textareaLabel="Biografia"/>
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Input inputId="subject" inputLabel="Matéria" />
                        <Input inputId="cost" inputLabel="Custo da sua aula por hora" />
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>

                        <button type="button">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm