import React from "react"
import { Center, VStack, Image, Input, Box } from "@spirokit/core"

export default function LoginScreen() {
  return (
    <Center flex={1}>
      <VStack space={4} alignItems="center">
        <Box width="100%">
          <Input
            placeholder="Email"
            variant="filled"
            width="100%"
            mb={2}
            _focus={{ borderColor: "primary.500" }}
          />
          <Input
            placeholder="Password"
            variant="filled"
            width="100%"
            _focus={{ borderColor: "primary.500" }}
          />
        </Box>
      </VStack>
    </Center>
  )
}
