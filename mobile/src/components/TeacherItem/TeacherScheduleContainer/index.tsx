import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

// Components
import TeacherScheduleItem from './TeacherScheduleItem'

// Styles
import styles from './styles'

// Interfaces
import { TeacherSchedule } from 'interfaces/index'
interface TeacherScheduleContainerProps {
    schedule: TeacherSchedule[]
}

const TeacherScheduleContainer: React.FC<TeacherScheduleContainerProps>
    = ({ schedule }) => {

        const [scheduleList, setScheduleList] = useState<(TeacherSchedule | number)[]>([])

        useEffect(() => {
            const updatedScheduleList = []
            let skip = false
            for (let d = 0; d < 7; d++) {
                for (let s = 0; s < schedule.length; s++) {
                    if (schedule[s].week_day === d) {
                        updatedScheduleList.push(schedule[s])
                        skip = true
                        break
                    }
                }
                if (!skip) updatedScheduleList.push(d)
                else skip = false
            }
            setScheduleList([...updatedScheduleList])
        }, [schedule])

        return (
            <View style={styles.scheduleTable}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Dia</Text>
                    <Text style={styles.tableHeaderText}>Horário</Text>
                </View>

                {
                    scheduleList.map(scheduleItem => {
                        if (typeof (scheduleItem) === 'number')
                            return <TeacherScheduleItem key={scheduleItem} day={scheduleItem} />

                        return (
                            <TeacherScheduleItem
                                key={scheduleItem.week_day}
                                day={scheduleItem.week_day}
                                from={scheduleItem.from}
                                to={scheduleItem.to}
                            />
                        )
                    })
                }

            </View>
        )
    }

export default TeacherScheduleContainer