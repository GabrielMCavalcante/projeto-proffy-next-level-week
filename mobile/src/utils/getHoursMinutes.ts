const fullHours: { label: string, value: string }[] = []
const fullMinutes: { label: string, value: string }[] = []

for (let i = 1; i <= 23; i++)
    fullHours.push({
        label: String(i).padStart(2, '0'),
        value: String(i).padStart(2, '0')
    })
for (let i = 0; i <= 59; i++)
    fullMinutes.push({
        label: String(i).padStart(2, '0'),
        value: String(i).padStart(2, '0')
    })

export { fullHours, fullMinutes }