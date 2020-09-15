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
    week_day: WeekDay,
    from: string,
    to: string
}