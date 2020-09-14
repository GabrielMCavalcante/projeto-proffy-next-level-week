import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Pages
import Landing from 'pages/Landing'
import TeacherForm from 'pages/TeacherForm'
import AppTab from './AppTab'

const Stack = createStackNavigator()

function AppStack() {
    return (
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName="landing">
            <Stack.Screen name="landing" component={Landing} />
            <Stack.Screen name="main" component={AppTab} />
            <Stack.Screen name="teacher-form" component={TeacherForm} />
          </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStack