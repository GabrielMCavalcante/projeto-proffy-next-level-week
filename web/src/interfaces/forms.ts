export interface FormField {
    value: string,
    validation: RegExp,
    valid: boolean,
    info: string,
    showInfo: "initial" | "show" | "hide",
    touched: boolean
}

export interface FormFields {
    [key: string]: FormField
} 