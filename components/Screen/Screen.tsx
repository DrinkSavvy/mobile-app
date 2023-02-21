import { SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface ScreenProps {
  children: React.ReactNode
  isScrollable?: boolean
}

const Screen = ({ children, isScrollable }: ScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isScrollable ? (
        <KeyboardAwareScrollView style={{ flex: 1 }}>{children}</KeyboardAwareScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  )
}

export default Screen
