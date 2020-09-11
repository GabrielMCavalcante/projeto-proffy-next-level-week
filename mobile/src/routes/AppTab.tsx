import React from 'react'
import { Ionicons } from '@expo/vector-icons'

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Tabs
import TeacherList from 'pages/TeacherList'
import Favourites from 'pages/Favourites'

const Tab = createBottomTabNavigator()

function AppTab() {
    return (
        <Tab.Navigator 
            initialRouteName="proffys"
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                activeBackgroundColor: '#EBEBF5',
                inactiveBackgroundColor: '#fafafc',
                activeTintColor: '#9871F5',
                inactiveTintColor: '#C1BCCC'
            }}
        >
            <Tab.Screen name="proffys" component={TeacherList} options={{
                tabBarLabel: 'Proffys',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-easel" size={size} color={color}/>
                )
            }}/>
            <Tab.Screen name="favoritos" component={Favourites} options={{
                tabBarLabel: 'Favoritos',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-heart" size={size} color={color}/>
                )
            }}/>
        </Tab.Navigator>
    )
}

export default AppTab