import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '@screens/Home'
import Login from '@screens/Login'

export type RootStackParamList = {
  Login: undefined
  Home: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function Navigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <RootStack.Screen name="Home" component={Home} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
