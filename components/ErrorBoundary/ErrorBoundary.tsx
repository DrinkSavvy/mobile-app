import React from "react"
import { View, Text } from "react-native"

class ErrorView extends React.Component {
  render() {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    )
  }
}

export { ErrorView }
