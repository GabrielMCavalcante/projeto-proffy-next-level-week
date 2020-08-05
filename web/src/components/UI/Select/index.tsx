import React, { useState, useEffect } from 'react'

// Icons
import { Icon } from '@iconify/react'
import caretDownIcon from '@iconify/icons-mdi/caret-down'

// CSS styles
import './styles.css'

interface SelectItem {
    value: string, 
    label: string
}

interface SelectProps {
    selectLabel: string,
    selected: SelectItem,
    items: SelectItem[],
    onOptionSelect: (opt: SelectItem) => void
}

const Select: React.FC<SelectProps> = ({ selectLabel, selected, items, onOptionSelect }) => {
    const [classes, setClasses] = useState(["Select", "Close"])
    const [currentSelected, setCurrentSelected] = useState({ value: selected.value, label: selected.label})

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

    function setSelection(item: SelectItem) {
        const newClasses = [...classes]
        newClasses.pop()
        newClasses.push("Close")
        setClasses(newClasses)
        setCurrentSelected(item)
    }

    useEffect(() => {
        onOptionSelect(currentSelected!)
    }, [currentSelected]) //eslint-disable-line

    return (
        <div className={classes.join(' ')}>
            <label>{selectLabel}</label>
            <div onClick={toggleSelect} className="SelectContent">
                <div className="SelectSelector">
                    <span>{currentSelected.label}</span>
                    <Icon icon={caretDownIcon} />
                </div>
                <ul>{
                    items.map((item, i) => (
                        <li
                            className={item.value === currentSelected.value ? 'Selected' : ''}
                            key={i}
                            onClick={() => setSelection(item)}
                        >{item.label}</li>
                    ))
                }</ul>
            </div>
        </div>
    )
}

export default Select