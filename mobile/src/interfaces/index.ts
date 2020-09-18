export interface Fields {
    [key: string]: {
        value: string,
        validation: RegExp,
        touched: boolean,
        valid: boolean
    }
}

export interface WeekDay {
    value: string,
    label: string
}

export interface ScheduleItem {
    week_day: WeekDay | null,
    from: string,
    to: string
}

export interface FormField {
    value: string,
    validation: RegExp,
    valid: boolean,
    touched: boolean
}

export interface FormFields {
    [key: string]: FormField
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