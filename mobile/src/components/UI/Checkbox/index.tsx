import React from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'

// Icons
import Icon from 'react-native-vector-icons/FontAwesome'

// CSS styles
import styles from './styles'

// Interfaces
interface CheckboxProps {
    onChange: () => void,
    active: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({ active, onChange }) => {
    return (
        <BorderlessButton onPress={onChange} style={[
            styles.checkbox,
            active ? styles.active : styles.unactive
        ]}>
            { active && <Icon name="check" size={13} color="white" /> }
        </BorderlessButton>
    )
}

export default Checkbox