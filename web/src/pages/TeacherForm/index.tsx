import React, { useState } from 'react'

// Components
import PageHeader from 'components/PageHeader'
import Input from 'components/UI/Input'
import Textarea from 'components/UI/Textarea'
import Select from 'components/UI/Select'

// Images
import warningIcon from 'assets/images/icons/warning.svg'

// CSS styles
import './styles.css'

function TeacherForm() {

    const [subject, setSubject] = useState<string | null>(null)

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
                        <Input inputId="bio-header" inputLabel="Título da biografia" />
                        <Textarea textareaId="bio-content" textareaLabel="Biografia" />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            selectLabel="Matéria"
                            selected={{ value: "Artes", label: "Artes" }}
                            items={[
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
                        <Input inputId="cost" inputLabel="Custo da sua aula por hora" />
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis</legend>

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
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