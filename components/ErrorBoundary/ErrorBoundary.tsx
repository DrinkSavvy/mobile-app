import { Component } from "react"
import { View, Text } from "react-native"

class ErrorView extends Component {
  render() {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    )
  }
}

export { ErrorView }
