import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Pages
import Landing from 'pages/Landing'
import TeacherForm from 'pages/TeacherForm'
import AppTab from './AppTab'
import ProcessFinished from 'components/ProcessFinished'
import Profile from 'pages/Profile'

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
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="profile-updated">
          {
            () => (
              <ProcessFinished
                title="Perfil atualizado!"
                description="Seu perfil foi atualizado com sucesso!"
                redirectTo="landing"
                actionLabel="Entendi"
              />
            )
          }
        </Stack.Screen>
        <Stack.Screen name="class-removed">
          {
            () => (
              <ProcessFinished
                title="Aula removida!"
                description="Aula removida com sucesso! Agora você se tornou um estudante
                do Proffy. Se mudar de ideia, cadastre uma nova aula no formulário 
                de cadastro de Proffys e aproveite!"
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