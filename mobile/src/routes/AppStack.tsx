import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Pages
import Landing from 'pages/Landing'
import TeacherForm from 'pages/TeacherForm'
import AppTab from './AppTab'
import ProcessFinished from 'components/ProcessFinished'

const Stack = createStackNavigator()

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="landing">
        <Stack.Screen name="landing" component={Landing} />
        <Stack.Screen name="main" component={AppTab} />
        <Stack.Screen name="teacher-form" component={TeacherForm} />
        <Stack.Screen name="class-registered">
          {
            () => (
              <ProcessFinished
                title="Cadastro salvo!"
                description="Tudo certo, seu cadastro está
                na nossa lista de professores. Agora é
                só ficar de olho no seu WhatsApp."
                redirectTo="landing"
                actionLabel="Entendi"
              />
            )
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppStack