import { Divider, Button, Input, TitleOne } from '@components/index'
import { VStack } from '@spirokit/core'

import { inputBorderStyle, inputContainerStyle } from './ConfirmCode.styles'
import { ConfirmCodeScreenProps } from './types'

export default function ConfirmCodeScreen({
  handleVerificationPress,
  code,
  onChangeCode,
}: ConfirmCodeScreenProps) {
  return (
    <VStack space={4} width="100%" height="100%" maxWidth="400px" alignItems="center">
      <TitleOne>Confirm Code</TitleOne>
      <Input
        placeholder="123456"
        value={code}
        onChangeText={onChangeCode}
        keyboardType="number-pad"
        _container={inputContainerStyle}
        _focus={inputBorderStyle}
      />
      <Divider />
      <Button onPress={handleVerificationPress} marginBottom={2} size="md" width="100%">
        Continue
      </Button>
    </VStack>
  )
}
