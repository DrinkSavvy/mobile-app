import { Divider, Button, Image, Input } from '@components/index'
import { Center, VStack } from '@spirokit/core'

import { inputBorderStyle, inputContainerStyle } from './Login.styles'
import { LoginScreenProps } from './types'

export default function LoginScreen({
  handleLoginPress,
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onBlurEmail,
  onBlurPassword,
  navigateToRegister,
}: LoginScreenProps) {
  return (
    <Center flex={1} height="100%" width="100%">
      <Image
        alt="DrinkSavvy logo"
        width="256"
        height="256"
        resizeMode="cover"
        source={require('@assets/adaptive-icon.png')}
        marginBottom={4}
      />
      <VStack space={4} width="100%" maxWidth="400px">
        <Input
          placeholder="Email"
          value={email.value}
          onChangeText={onChangeEmail}
          onBlur={onBlurEmail}
          _container={inputContainerStyle}
          _focus={inputBorderStyle}
        />
        <Input
          placeholder="Password"
          value={password.value}
          onChangeText={onChangePassword}
          onBlur={onBlurPassword}
          _container={inputContainerStyle}
          _focus={inputBorderStyle}
        />
        <Divider />
        <Button onPress={handleLoginPress} marginBottom={2} size="md">
          Login
        </Button>
        <Button variant="secondary" onPress={navigateToRegister} size="md">
          Register
        </Button>
      </VStack>
    </Center>
  )
}
