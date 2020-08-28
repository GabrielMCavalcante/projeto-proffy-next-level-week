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

export interface ProfileData {
    name: string,
    email: string,
    avatar: string,
    whatsapp: string,
    bio: string,
    subject: string,
    cost: number,
    schedule: ScheduleItem[]
}