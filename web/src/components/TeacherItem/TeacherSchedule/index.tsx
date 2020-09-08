import React, { useEffect, useState } from 'react'
import TeacherScheduleItem from '../TeacherScheduleItem'

// CSS styles
import './styles.css'

// Interfaces
import { TeacherSchedule as TS } from 'interfaces/forms'

interface TeacherScheduleProps {
    schedule: TS[], 
    name: string
}

const TeacherSchedule: React.FC<TeacherScheduleProps> = ({ schedule, name }) => {

    const [scheduleList, setScheduleList] = useState<(TS | number)[]>([])

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
    }, [schedule]) // eslint-disable-line

    return (
        <div className="teacher-schedule">
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
        </div>
    )
}

export default TeacherSchedule