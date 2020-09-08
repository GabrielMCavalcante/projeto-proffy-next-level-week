import React, { useState, useEffect } from 'react'

// Utils
import { formatToHoursAndMinutes } from 'utils/format'
import { keyDay } from 'utils/shedule'

// CSS styles
import './styles.css'

// Interfaces
interface TeacherScheduleItemProps {
    day: number,
    from?: number
    to?: number
}

const TeacherScheduleItem: React.FC<TeacherScheduleItemProps> = ({ day, from, to }) => { 
    
    const [classes, setClasses] = useState(["teacher-schedule-item"])

    useEffect(() => {
        if(!from && !to) setClasses([...classes, "disabled"])
    }, []) // eslint-disable-line

    return (
        <div className={classes.join(' ')}>
            <div className="day">
                <p>Dia</p>
                <p>{keyDay[day]}</p>
            </div>

            <div className="period">
                <p>Horário</p>
                <p>{
                    from && to 
                        ? 
                            formatToHoursAndMinutes(from) 
                                + 'h - ' + 
                            formatToHoursAndMinutes(to) + 'h'
                        : '-'
                    }
                </p>
            </div>
        </div>
    )
}

export default TeacherScheduleItem