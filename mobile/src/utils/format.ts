function formatFetchedPhone(phone: string) {
    // Splits phone string into char array
    let formattedPhone = String(phone).split('')

    // Adds an opening bracket to the beginning
    formattedPhone.unshift("(")

    // Shifts values (from index 5 to end) to the right
    // And adds a closing bracket followed by a space
    formattedPhone.push('')
    formattedPhone.push('')
    for (let i = formattedPhone.length - 1; i >= 5; i--)
        formattedPhone[i] = formattedPhone[i - 2]

    formattedPhone[3] = ")"
    formattedPhone[4] = " "

    // Shifts values (from index 9 or 10 depending of the length) to the right
    // And adds a line-through
    formattedPhone.push('')
    if (formattedPhone.length === 14) {
        for (let i = formattedPhone.length - 1; i >= 9; i--)
            formattedPhone[i] = formattedPhone[i - 1]
        formattedPhone[9] = "-"
    } else if (formattedPhone.length === 15) {
        for (let i = formattedPhone.length - 1; i >= 10; i--)
            formattedPhone[i] = formattedPhone[i - 1]
        formattedPhone[10] = "-"
    }

    // Joins the char array into a single string and returns it
    return formattedPhone.join('')
}

function formatCurrentPhone(phone: string) {
    // Splits phone number string into char array
    let formattedPhone = phone.split('')

    // Appends an opening bracket if it not exists on the beginning
    if (formattedPhone.length > 0 && !formattedPhone[0].match(/^\($/))
        formattedPhone.unshift("(")

    // Checking for values at least like: (xxx... -> x is a number
    if (formattedPhone.length >= 4) {
        // Checks if initial 2 values are numeric and if not, remove them
        if (!formattedPhone[1].match(/^[0-9]$/))
            formattedPhone = formattedPhone.filter((_, i) => i !== 1)
        if (!formattedPhone[2].match(/^[0-9]$/))
            formattedPhone = formattedPhone.filter((_, i) => i !== 2)

        // Checks if char at index 3 is a closing bracket, if it is not,
        // moves it to the next position and changes its previous pos. value to
        // a ')'
        if (!formattedPhone[3].match(/^\)$/)) {
            formattedPhone.push(' ')
            formattedPhone.push('')
            formattedPhone[5] = formattedPhone[3]
            formattedPhone[3] = ")"
        }

        // Checkings for phones with 8 digits (xxxx-xxxx)
        if (formattedPhone.length === 10) {
            // Adds a '-' in the middle (relative to phone numbers)
            if (formattedPhone[9] !== "-") {
                formattedPhone.push('')
                formattedPhone[10] = formattedPhone[9]
                formattedPhone[9] = "-"
            }
        } // Checkings for phones with 9 digits (9xxxx-xxxx) 
        else if (formattedPhone.length === 15) {
            // Adds a '-' in the sixth position (relative to phone numbers)
            if (formattedPhone[10] !== "-") {
                formattedPhone[9] = formattedPhone[10]
                formattedPhone[10] = "-"
            }
        }
    }

    // Joins array values into single string ((xx) xxxxx-xxxx)
    return formattedPhone.join('')
}

function formatToHoursAndMinutes(mnts: number) {
    const unparsedHours = String(mnts / 60)
    const hours = parseInt(unparsedHours)
    const minutes = parseFloat(String(((parseFloat(unparsedHours) - hours) * 60))).toFixed(0)

    return [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0')
    ].join(":")
}

export { 
    formatFetchedPhone, 
    formatCurrentPhone, 
    formatToHoursAndMinutes
}