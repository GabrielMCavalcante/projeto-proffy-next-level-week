import React from 'react'
import { View, Text, Image } from 'react-native'

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Tabs
import TeacherList from 'pages/TeacherList'
import Favourites from 'pages/Favourites'

const Tab = createBottomTabNavigator()

function AppTab() {
    return (
        <Tab.Navigator initialRouteName="Proffys">
            <Tab.Screen name="Proffys" component={TeacherList} />
            <Tab.Screen name="Favoritos" component={Favourites} />
        </Tab.Navigator>
    )
}

export default AppTab