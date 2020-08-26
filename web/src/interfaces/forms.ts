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

export interface WeekDay {
    value: string,
    label: string
}

export interface ScheduleItem {
    week_day: WeekDay,
    from: string,
    to: string
}