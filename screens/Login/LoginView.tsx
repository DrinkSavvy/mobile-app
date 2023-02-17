import React from "react"
import { SafeAreaView } from "react-native"

import { Box, Button, Center, Input, VStack } from "@spirokit/core"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { supabase } from "../../api/supabase"
import { useAnalytics } from "../../hooks/useAnalytics"

export default function LoginScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView>
        <Center flex={1} justifyContent="center" alignItems="center">
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
                  console.log("Login")
                }}
              >
                Login
              </Button>
            </Box>
          </VStack>
        </Center>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
