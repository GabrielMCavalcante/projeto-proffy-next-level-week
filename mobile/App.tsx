import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// Expo
import { AppLoading } from 'expo'
import { StatusBar } from 'expo-status-bar'

// Pages
import Onboarding from 'pages/Onboarding'
import Register from 'pages/Register'

// Routes
import AppStack from 'routes/AppStack'

// Contexts
import { useAuth, AuthProvider } from 'contexts/auth'

// Fonts
import {
  useFonts,
  Archivo_400Regular,
  Archivo_700Bold
} from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'

function App() {
  const [component, setComponent] = useState<JSX.Element>(<Register />)
  const [recheck, setRecheck] = useState(false)

  const authContext = useAuth()

  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  function onOnboardingDismiss() {
    AsyncStorage.setItem('proffy:app:alreadyopened', 'true')
      .then(() => setRecheck(true))
  }

  useEffect(() => {
    (async function checkFirstAppOpen() {
      if (fontsLoaded || recheck) {
        const check = await AsyncStorage.getItem('proffy:app:alreadyopened')
        if (!check) setComponent(<Onboarding onDismiss={onOnboardingDismiss} />)
        else {
          if (!authContext.signedIn) setComponent(<Register />)
          else setComponent(<AppStack />)
        }
      }
    })()
  }, [fontsLoaded, recheck, authContext.signedIn])

  if (!fontsLoaded) return <AppLoading />

  return (
    <>
      <StatusBar style="light" hidden />
      { component }
    </>
  )
}

function app() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

export default app