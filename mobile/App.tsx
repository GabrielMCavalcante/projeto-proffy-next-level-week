import React from 'react'
import { StyleSheet } from 'react-native'

// Expo
import { AppLoading } from 'expo'
import { StatusBar } from 'expo-status-bar'

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
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  if (!fontsLoaded) return <AppLoading />
  else return (
    <>
      <StatusBar style="light" />
      <AppStack />
    </>
  )
}

const styles = StyleSheet.create({

})