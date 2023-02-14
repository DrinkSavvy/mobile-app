import React from "react"
import Bugsnag from "@bugsnag/expo"
import { BUGSNAG_API_KEY } from "@env"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SpiroKitProvider, usePoppins, useSpiroKitTheme } from "@spirokit/core"

import { supabase } from "./api/supabase"
import LoginScreen from "./screens/Login/Login"
import { View, Text } from "react-native"

Bugsnag.start({ apiKey: BUGSNAG_API_KEY })

const Stack = createNativeStackNavigator()

const myTheme = useSpiroKitTheme()

const ErrorBoundary = Bugsnag.getPlugin("react")

export default function App() {
  const fontLoaded = usePoppins()

  if (!fontLoaded) return <></>

  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <SpiroKitProvider theme={myTheme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SpiroKitProvider>
    </ErrorBoundary>
  )
}

class ErrorView extends React.Component {
  // This component will be displayed when an error boundary catches an error
  render() {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    )
  }
}
