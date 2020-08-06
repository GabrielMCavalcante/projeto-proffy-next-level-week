import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Pages
import Landing from 'pages/Landing'
import TeacherList from 'pages/TeacherList'

const Stack = createStackNavigator()

function AppStack() {
    return (
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName="Home">
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="TeacherList" component={TeacherList} />
          </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStack