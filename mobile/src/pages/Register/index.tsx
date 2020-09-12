import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Pages
import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import ProcessFinished from 'components/ProcessFinished'

function Register() {
    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="login">
                <Stack.Screen name="login" component={Login}/>
                <Stack.Screen name="signup" component={Signup}/>
                <Stack.Screen name="forgot-password" component={ForgotPassword}/>
                <Stack.Screen name="signup-complete">
                    {
                        () => (
                            <ProcessFinished 
                                title="Cadastro concluído!"
                                description="Agora você faz parte da plataforma da Proffy"
                                redirectTo="login"
                                actionLabel="Fazer login"
                            />
                        )
                    }
                </Stack.Screen>
                <Stack.Screen name="password-recovery-email-sent">
                    {
                        () => (
                            <ProcessFinished 
                                title="Redefinição enviada!"
                                description="Boa, agora é só checar o e-mail que foi
                                enviado para você redefinir sua senha
                                e aproveitar os estudos."
                                redirectTo="login"
                                actionLabel="Voltar ao login"
                            />
                        )
                    }
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Register