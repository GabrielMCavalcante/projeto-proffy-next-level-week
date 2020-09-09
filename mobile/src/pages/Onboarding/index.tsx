import React from 'react'
import { View, Text, Image, ImageBackground, ImageSourcePropType } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'

// Images
import purpleBackgroundImg from 'assets/images/purple-back.png'
import greenBackgroundImg from 'assets/images/green-back.png'
import nextImg from 'assets/images/icons/back.png'
import studyImg from 'assets/images/icons/study.png'
import giveClassesImg from 'assets/images/icons/give-classes.png'

// CSS styles
import styles from './styles'
import { Rect } from 'react-native-svg'

// Interfaces
interface OnboardingScreenProps {
    theme: "primary" | "secondary",
    icon: ImageSourcePropType,
    content: string,
    pos: number,
    isLast: boolean,
    totalItems: number,
    onDismiss?: () => void
}

interface OnboardingProps {
    onDismiss: () => void
}

const screens = [
    {
        theme: "primary",
        icon: studyImg,
        content: "Encontre vários professores para ensinar você"
    },
    {
        theme: "secondary",
        icon: giveClassesImg,
        content: "Ou dê aulas sobre o que você mais conhece"
    }
]

const OnboardingScreen: React.FC<OnboardingScreenProps> = (props) => {
    const { theme, icon, content, pos, isLast, totalItems, onDismiss } = props
    const navigation = useNavigation()

    const dotIndicators: boolean[] = []

    for (let i = 0; i < totalItems; i++) {
        dotIndicators.push(i === pos)
    }

    return (
        <View style={styles.onboardingScreen}>
            <View style={[styles.onboardingImage, styles[theme]]}>
                <ImageBackground
                    resizeMode="contain"
                    source={theme === "primary" ? purpleBackgroundImg : greenBackgroundImg}
                    style={styles.onboardingBackground}
                >
                    <Image style={styles.onboardingIcon} source={icon} />
                </ImageBackground>
            </View>

            <View style={styles.content}>
                <Text style={styles.screenNumber}>{String(pos + 1).padStart(2, '0')}.</Text>
                <Text style={styles.screenText}>{content}</Text>
            </View>

            <View style={styles.bottom}>
                <View style={styles.dotIndicators}>
                    {dotIndicators.map((dotIndicator, i) => {
                        if (dotIndicator) 
                            return <View 
                                key={i} 
                                style={[styles.dotIndicator, styles.current]} 
                            />
                        else 
                            return <View 
                                key={i} 
                                style={[styles.dotIndicator, styles.other]} 
                            />
                    })}
                </View>
                
                <BorderlessButton 
                    style={styles.actionBtn} 
                    onPress={() => !isLast ? navigation.navigate("Onboarding2") : onDismiss!()}
                >
                    {
                        isLast
                            ? <Text style={styles.okBtn}>Ok</Text>
                            : <Image style={styles.nextBtn} source={nextImg} />
                    }
                </BorderlessButton>
            </View>
        </View>
    )
}

const Onboarding: React.FC<OnboardingProps> = ({ onDismiss }) => {
    const Tab = createMaterialTopTabNavigator()

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Onboarding1" tabBarOptions={{
                style: { display: 'none' }
            }}>
                <Tab.Screen name="Onboarding1">
                    {() => (
                        <OnboardingScreen
                            theme={screens[0].theme as "primary" | "secondary"}
                            content={screens[0].content}
                            icon={screens[0].icon}
                            pos={0}
                            isLast={0 === screens.length - 1}
                            totalItems={screens.length}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen name="Onboarding2">
                    {() => (
                        <OnboardingScreen
                            theme={screens[1].theme as "primary" | "secondary"}
                            content={screens[1].content}
                            icon={screens[1].icon}
                            pos={1}
                            isLast={1 === screens.length - 1}
                            totalItems={screens.length}
                            onDismiss={onDismiss}
                        />)}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Onboarding