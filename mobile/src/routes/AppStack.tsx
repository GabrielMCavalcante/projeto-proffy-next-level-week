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
          <Stack.Navigator headerMode="none" initialRouteName="landing">
            <Stack.Screen name="landing" component={Landing} />
            <Stack.Screen name="main" component={AppTab} />
            <Stack.Screen name="give-classes" component={GiveClasses} />
          </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStack