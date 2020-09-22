import React from 'react'
import { View, Text, Image } from 'react-native'

// Utils
import { formatToHoursAndMinutes } from 'utils/format'
import { keyDay } from 'utils/schedule'

// Images
import scheduleArrowImg from 'assets/images/icons/schedule-arrow.png'

// Styles
import styles from './styles'

// Interfaces
interface TeacherScheduleItemProps {
    day: number,
    from?: number
    to?: number
}

const TeacherScheduleItem: React.FC<TeacherScheduleItemProps> = ({ day, from, to }) => {
    return (
        <View style={[
            styles.teacherScheduleItem,
            !from && !to && styles.containerDisabled
        ]}>
            <Text style={[styles.text, !from && !to && styles.textDisabled]}>
                {keyDay[day]}
            </Text>

            <Image source={scheduleArrowImg} style={from && to ? { tintColor: 'darkgrey' } : { tintColor: 'lightgrey' }} />

            <Text style={[styles.text, styles.period, !from && !to && styles.textDisabled]}>{
                from && to
                    ? (
                        formatToHoursAndMinutes(from)
                        + 'h - ' +
                        formatToHoursAndMinutes(to) + 'h'
                    ) : '-'
            }
            </Text>
        </View>
    )
}

export default TeacherScheduleItem