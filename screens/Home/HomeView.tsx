import React from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../Navigation"
import { Center, Text } from "@spirokit/core"

export default function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  return (
    <Center style={{ flex: 1, justifyContent: "center" }}>
      <Text>This is the home screen!</Text>
    </Center>
  )
}
