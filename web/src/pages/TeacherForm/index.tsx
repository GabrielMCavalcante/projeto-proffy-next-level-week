import React from 'react'

// Components
import PageHeader from 'components/PageHeader'
import Input from 'components/UI/Input'

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
                        <Input 
                            inputId="name"
                            inputLabel="Nome completo"
                        />
                        <Input 
                            inputId="avatar"
                            inputLabel="Avatar"
                        />
                        <Input 
                            inputId="whatsapp"
                            inputLabel="WhatsApp"
                        />
                    </fieldset>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm