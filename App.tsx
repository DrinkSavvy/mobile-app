import { init } from '@amplitude/analytics-react-native'
import Bugsnag from '@bugsnag/expo'
import { ErrorView } from '@components/ErrorBoundary'
import { ProviderWrapper } from '@context/ProviderWrapper'
import { BUGSNAG_API_KEY, AMPLITUDE_API_KEY } from '@env'
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter'
import Navigator from '@navigation/Navigation'
import { SpiroKitProvider, useSpiroKitTheme } from '@spirokit/core'
import { SPIROKIT_CONFIG } from '@utils/spirokit-config'
import React from 'react'

export default function App() {
  const myTheme = useSpiroKitTheme(SPIROKIT_CONFIG)

  const [fontsLoaded] = useFonts({
    Inter_Light: Inter_300Light,
    Inter: Inter_400Regular,
    Inter_Medium: Inter_500Medium,
    Inter_SemiBold: Inter_600SemiBold,
    Inter_Bold: Inter_700Bold,
    Inter_ExtraBold: Inter_800ExtraBold,
  })

  init(AMPLITUDE_API_KEY)
  if (!Bugsnag.isStarted()) {
    Bugsnag.start({ apiKey: BUGSNAG_API_KEY })
  }

  const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

  if (!fontsLoaded) return <></>

  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <SpiroKitProvider theme={myTheme}>
        <ProviderWrapper>
          <Navigator />
        </ProviderWrapper>
      </SpiroKitProvider>
    </ErrorBoundary>
  )
}
