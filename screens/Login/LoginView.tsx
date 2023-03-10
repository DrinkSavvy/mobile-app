import { Divider, Button, Input } from '@components/index'
import { VStack } from '@spirokit/core'
import { Image } from 'expo-image'

import { inputBorderStyle, inputContainerStyle } from './Login.styles'
import { LoginScreenProps } from './types'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

export default function LoginScreen({
  handleLoginPress,
  phone,
  onChangePhone,
  onBlurPhone,
  navigateToRegister,
}: LoginScreenProps) {
  return (
    <VStack space={4} width="100%" height="100%" maxWidth="400px" alignItems="center">
      {/* <Image
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        style={{
          width: 256,
          height: 256,
          marginBottom: 16,
        }}
        source={require('@assets/adaptive-icon.png')}
      /> */}
      <Input
        placeholder="Phone Number"
        value={phone.value}
        onChangeText={onChangePhone}
        keyboardType="number-pad"
        onBlur={onBlurPhone}
        _container={inputContainerStyle}
        _focus={inputBorderStyle}
      />
      <Divider />
      <Button onPress={handleLoginPress} marginBottom={2} size="md" width="100%">
        Enter
      </Button>
    </VStack>
  )
}
