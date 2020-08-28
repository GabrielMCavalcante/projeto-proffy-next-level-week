const keyDay = [
    'Domingo', 
    'Segunda-Feira', 
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado'
]

const weekdays = [
    { value: "0", label: "Domingo" },
    { value: "1", label: "Segunda-feira" },
    { value: "2", label: "Terça-feira" },
    { value: "3", label: "Quarta-feira" },
    { value: "4", label: "Quinta-feira" },
    { value: "5", label: "Sexta-feira" },
    { value: "6", label: "Sábado" }
]

const defaultSchedule = [
    { week_day: { value: '1', label: 'Segunda-feira' }, from: '08:00', to: '12:00' }
]

export { keyDay, weekdays, defaultSchedule }