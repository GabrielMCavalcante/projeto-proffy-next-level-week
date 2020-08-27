import React, { InputHTMLAttributes, useState } from 'react'

// Components
import InputInfo from 'components/InputInfo'

// Icons
import { Icon } from '@iconify/react'
import showPasswordIcon from '@iconify/icons-mdi/eye'
import hidePasswordIcon from '@iconify/icons-mdi/eye-off'
import infoIcon from '@iconify/icons-mdi/information-outline'

// CSS styles
import './styles.css'
import { FormFields } from 'interfaces/forms'

type InputTextarea = InputHTMLAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLTextAreaElement>

interface InputProps extends InputTextarea {
    inputType: "input" | "textarea",
    inputContentType: string,
    inputLabel: string,
    inputId: string,
    fields?: FormFields,
    setFields?: (value: React.SetStateAction<FormFields>) => void,
    formValid?: boolean,
    setFormValid?: (value: React.SetStateAction<boolean>) => void,
    hasInfo?: boolean,
    feedback?: string,
    setFeedback?: (value: React.SetStateAction<string>) => void,
}

const Input: React.FC<InputProps> = ({
    inputType,
    inputContentType,
    inputLabel,
    inputId,
    fields,
    setFields,
    formValid,
    setFormValid,
    hasInfo,
    feedback,
    setFeedback,
    ...inputProps
}) => {

    const [showPassword, setShowPassword] = useState(false)

    function onInputValueChange(e: React.ChangeEvent<any>) {
        const inputIdentifier = e.target.id
        let newInputValue: string = e.target.value
        
        if (inputIdentifier === "whatsapp") {
            // Splits phone number string into char array
            let formattedPhone = newInputValue.split('')

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
            newInputValue = formattedPhone.join('')
        } 

        const allFields = Object.keys(fields!)

        let isFormValid = true
        const isInputValid = fields![inputIdentifier].validation.test(newInputValue)

        if (isInputValid) {
            allFields.forEach(field => {
                if (isFormValid)
                    if (field !== inputIdentifier)
                        isFormValid = fields![field].validation.test(fields![field].value)
            })
        } else isFormValid = false

        if (isFormValid !== formValid)
            setFormValid!(isFormValid)

        if (feedback) setFeedback!('')

        setFields!({
            ...fields,
            [inputIdentifier]: {
                ...fields![inputIdentifier],
                value: newInputValue,
                touched: true,
                valid: isInputValid
            }
        })
    }

    function onInfoHover() {
        setFields!({
            ...fields,
            [inputId]: {
                ...fields![inputId],
                showInfo: "show"
            }
        })
    }

    function onInfoLeave() {
        setFields!({
            ...fields,
            [inputId]: {
                ...fields![inputId],
                showInfo: "hide"
            }
        })
    }

    function setInputClasses() {
        return [
            "input-group",
            fields ?
                !fields[inputId].valid && fields[inputId].touched ? 'invalid' : ''
                : ''
        ].join(' ')
    }

    return (
        <div id="input-wrapper">
            <label htmlFor={inputId}>{inputLabel}</label>
            <div className={setInputClasses()}>
                {
                    inputType === "input"
                        ? (
                            <input
                                value={fields ? fields[inputId].value : inputProps.value}
                                onChange={onInputValueChange}
                                id={inputId}
                                type={inputContentType}
                                {...inputProps}
                            />
                        ) : (
                            <textarea
                                onChange={onInputValueChange}
                                {...inputProps}
                                id={inputId}
                            />
                        )
                }
                {
                    inputContentType !== "password"
                        ? hasInfo && (
                            <div
                                onMouseEnter={onInfoHover}
                                onMouseLeave={onInfoLeave}
                            ><Icon icon={infoIcon} /></div>
                        ) : (
                            <div className="icon-group">
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <Icon
                                        color={showPassword ? '#8257E5' : '#6A6180'}
                                        icon={showPassword ? hidePasswordIcon : showPasswordIcon}
                                    />
                                </div>
                                <div
                                    onMouseEnter={onInfoHover}
                                    onMouseLeave={onInfoLeave}
                                ><Icon icon={infoIcon} /></div>
                            </div>
                        )
                }
                {
                    hasInfo &&
                    <InputInfo
                        show={fields![inputId].showInfo}
                        info={fields![inputId].info}
                    />
                }
            </div>
        </div>
    )
}

export default Input