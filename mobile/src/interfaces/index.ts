export interface Fields {
    [key: string]: {
        value: string,
        validation: RegExp,
        touched: boolean,
        valid: boolean
    }
}