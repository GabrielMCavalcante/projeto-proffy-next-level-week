import React from 'react'
import { View, Text, Image } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

// Icons
import { Ionicons } from '@expo/vector-icons'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Images
import goBackImg from 'assets/images/icons/back.png'
import logoImg from 'assets/images/logo.png'

// Styles
import styles from './styles'

interface PageHeaderProps {
    title: string,
    description?: string,
    onToggleFilters: (...params: any[]) => void,
    showingFilters: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
    title, 
    onToggleFilters, 
    showingFilters,
    children }) => {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={() => navigate("Landing")}>
                    <Image source={goBackImg} resizeMode="contain" />
                </BorderlessButton>

                <Image source={logoImg} resizeMode="contain" />
            </View>

            <View>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.filtersContainer}>
                    <View style={styles.toggleFiltersButtonWrapper}>
                        <RectButton onPress={onToggleFilters} style={styles.toggleFiltersButton}>
                            <Text style={styles.toggleFiltersButtonText}>
                                Filtrar por dia, hora e matéria
                            </Text>
                            <Ionicons 
                                name={showingFilters ? "md-arrow-up" : "md-arrow-down"} 
                                color="#F0F0F4"
                            />
                        </RectButton>
                    </View>

                    <View style={styles.filtersInput}>
                        { children }
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PageHeader