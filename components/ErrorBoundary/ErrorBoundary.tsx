import { Component } from 'react'
import { View, Text } from 'react-native'

//TODO - add error boundary
export default class ErrorView extends Component {
  render() {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    )
  }
}
