import { Center, Input, VStack } from "@spirokit/core"
import { Screen, Divider, Button } from "@components/index"

import { LoginScreenProps } from "./types"

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
    <Screen isScrollable>
      <Center flex={1} height="100%" width="100%">
        <VStack space={4} width="100%" maxWidth="400px">
          <Input
            placeholder="Email"
            value={email.value}
            onChangeText={onChangeEmail}
            onBlur={onBlurEmail}
            _container={{ width: "100%" }}
            _focus={{ borderColor: "primary.500" }}
          />
          <Input
            placeholder="Password"
            value={password.value}
            onChangeText={onChangePassword}
            onBlur={onBlurPassword}
            _container={{ width: "100%" }}
            _focus={{ borderColor: "primary.500" }}
          />
          <Divider />
          <Button onPress={handleLoginPress} marginBottom={2}>
            Login
          </Button>
          <Button variant="secondary" onPress={navigateToRegister}>
            Register
          </Button>
        </VStack>
      </Center>
    </Screen>
  )
}
