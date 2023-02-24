import { Divider, Button, Input } from '@components/index'
import { Center, VStack } from '@spirokit/core'
import { Image } from 'expo-image'

import { inputBorderStyle, inputContainerStyle } from './Login.styles'
import { LoginScreenProps } from './types'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

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
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        style={{
          width: 256,
          height: 256,
          marginBottom: 4,
        }}
        source={require('@assets/adaptive-icon.png')}
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
