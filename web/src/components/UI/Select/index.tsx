import React, { useState, useEffect } from 'react'

// Icons
import { Icon } from '@iconify/react'
import caretDownIcon from '@iconify/icons-mdi/caret-down'

// CSS styles
import './styles.css'

interface SelectProps {
    selectLabel: string,
    selected?: string,
    items: string[],
    onOptionSelect: (opt: string) => void
}

const Select: React.FC<SelectProps> = ({ selectLabel, selected, items, onOptionSelect }) => {
    const [classes, setClasses] = useState(["Select", "Close"])
    const [currentSelected, setCurrentSelected] = useState(selected)

    function toggleSelect() {
        const newClasses = [...classes]
        if (newClasses.includes("Open")) {
            newClasses.pop()
            newClasses.push("Close")
        }
        else {
            newClasses.pop()
            newClasses.push("Open")
        }
        setClasses(newClasses)
    }

    function setSelection(item: string) {
        const newClasses = [...classes]
        newClasses.pop()
        newClasses.push("Close")
        setClasses(newClasses)
        console.log(item)
        setCurrentSelected(item)
    }

    useEffect(() => {
        onOptionSelect(currentSelected!)
    }, [currentSelected]) //eslint-disable-line

    useEffect(() => {
        setCurrentSelected(selected)
    }, [selected])

    return (
        <div className={classes.join(' ')}>
            <p>{selectLabel}</p>
            <div className="SelectContent">
                <div onClick={toggleSelect} className="SelectSelector">
                    <span>{String(currentSelected)}</span>
                    <Icon icon={caretDownIcon} />
                </div>
                <ul>{
                    items.map((item, i) => (
                        <li
                            className={item === currentSelected ? 'Selected' : ''}
                            key={i}
                            onClick={() => setSelection(item)}
                        >{item}</li>
                    ))
                }</ul>
            </div>
        </div>
    )
}

export default Select