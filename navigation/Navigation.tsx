import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ConfirmCode from '@screens/ConfirmCode'
import Home from '@screens/Home'
import Login from '@screens/Login'

export type RootStackParamList = {
  Login: undefined
  ConfirmCode: { phone: string }
  Home: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function Navigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <RootStack.Screen name="ConfirmCode" component={ConfirmCode} />
        <RootStack.Screen name="Home" component={Home} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
