import { Box, Center, Input, VStack } from "@spirokit/core"
import React from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function LoginScreen() {
  return (
    <KeyboardAwareScrollView>
      <Center flex={1}>
        <VStack space={4} width="100%" maxWidth="400px">
          <Box>
            <Input
              placeholder="Email"
              _container={{ marginBottom: 2, width: "100%" }}
              _focus={{ borderColor: "primary.500" }}
            />
            <Input
              placeholder="Password"
              _container={{ marginBottom: 2, width: "100%" }}
              _focus={{ borderColor: "primary.500" }}
            />
          </Box>
        </VStack>
      </Center>
    </KeyboardAwareScrollView>
  )
}
