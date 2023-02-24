import { SafeAreaView, ViewStyle } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const withHook = (
  hook: (props: any) => any,
  Component: React.ComponentType<any>,
  isScrollable = false,
  style?: ViewStyle
) => {
  if (isScrollable) {
    return (props: any) => (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView contentContainerStyle={style}>
          <Component {...props} {...hook(props)} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
  return (props: any) => (
    <SafeAreaView style={{ flex: 1 }}>
      <Component {...props} {...hook(props)} />
    </SafeAreaView>
  )
}
