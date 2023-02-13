import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SpiroKitProvider, usePoppins, useSpiroKitTheme } from "@spirokit/core"

import { supabase } from "./api/supabase"
import LoginScreen from "./screens/Login/Login"

const Stack = createNativeStackNavigator()

const myTheme = useSpiroKitTheme()

export default function App() {
  const fontLoaded = usePoppins()

  if (!fontLoaded) return <></>

  return (
    <SpiroKitProvider theme={myTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SpiroKitProvider>
  )
}
