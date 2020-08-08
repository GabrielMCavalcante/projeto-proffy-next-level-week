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
    filters?: boolean,
    onToggleFilters?: (...params: any[]) => void,
    showingFilters?: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    onToggleFilters,
    showingFilters,
    children,
    filters }) => {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton style={{width: 30, height: 30}} onPress={() => navigate("Landing")}>
                    <Image style={{width: 30, height: 30}} source={goBackImg} resizeMode="contain" />
                </BorderlessButton>

                <Image source={logoImg} style={{width: 60, height: 30}} resizeMode="contain" />
            </View>

            <View>
                <Text style={styles.title}>{title}</Text>
                {
                    filters &&
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
                            {children}
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

export default PageHeader