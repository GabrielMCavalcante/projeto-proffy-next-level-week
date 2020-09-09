import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Pages
import Landing from 'pages/Landing'
import GiveClasses from 'pages/GiveClasses'
import AppTab from './AppTab'

const Stack = createStackNavigator()

function AppStack() {
    return (
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Main" component={AppTab} />
            <Stack.Screen name="GiveClasses" component={GiveClasses} />
          </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStack