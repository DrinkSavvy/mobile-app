import React from "react"

import { Box, Button, Center, Input, VStack } from "@spirokit/core"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Bugsnag from "@bugsnag/expo"

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
            <Button
              onPress={() => {
                throw new Error("Test error")
              }}
            >
              Login
            </Button>
          </Box>
        </VStack>
      </Center>
    </KeyboardAwareScrollView>
  )
}
