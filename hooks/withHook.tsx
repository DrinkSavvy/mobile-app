import { SafeAreaView } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export const withHook = (
  hook: (props: any) => any,
  Component: React.ComponentType<any>,
  isScrollable = false
) => {
  if (isScrollable) {
    return (props: any) => (
      <KeyboardAwareScrollView>
        <SafeAreaView style={{ flex: 1 }}>
          <Component {...props} {...hook(props)} />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    )
  }
  return (props: any) => (
    <SafeAreaView style={{ flex: 1 }}>
      <Component {...props} {...hook(props)} />
    </SafeAreaView>
  )
}
