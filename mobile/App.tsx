import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// Expo
import { AppLoading } from 'expo'
import { StatusBar } from 'expo-status-bar'

// Pages
import Onboarding from 'pages/Onboarding'

// Routes
import AppStack from 'routes/AppStack'

// Fonts
import {
  useFonts,
  Archivo_400Regular,
  Archivo_700Bold
} from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'

export default function App() {
  const [component, setComponent] = useState<JSX.Element>(<AppStack />)
  const [recheck, setRecheck] = useState(false)

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
        if (!check) setComponent(<Onboarding onDismiss={onOnboardingDismiss}/>)
        else setComponent(<AppStack />)
      }
    })()
  }, [fontsLoaded, recheck])

  if (!fontsLoaded) return <AppLoading />

  return (
    <>
      <StatusBar style="light" />
      {component}
    </>
  )
}

const styles = StyleSheet.create({

})