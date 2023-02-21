import Bugsnag from "@bugsnag/expo"
import { init } from "@amplitude/analytics-react-native"
import { SpiroKitProvider, useSpiroKitTheme } from "@spirokit/core"
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter"

import { BUGSNAG_API_KEY, AMPLITUDE_API_KEY } from "@env"
import Navigator from "@navigation/Navigation"
import { SPIROKIT_CONFIG } from "@utils/spirokit-config"

const myTheme = useSpiroKitTheme({
  config: {
    colors: {
      primary: "orange",
      primaryGray: "warmGray",
    },
    fonts: {
      body: "Inter",
      heading: "Inter",
    },
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  resources: {
    fonts: {
      Inter: {
        light: {
          normal: "Inter_Light",
        },
        regular: {
          normal: "Inter",
        },
        medium: {
          normal: "Inter_Medium",
        },
        semiBold: {
          normal: "Inter_SemiBold",
        },
        bold: {
          normal: "Inter_Bold",
        },
        extraBold: {
          normal: "Inter_ExtraBold",
        },
      },
    },
  },
})

// TODO Add the ErrorBoundary to the app
// const ErrorBoundary = Bugsnag.getPlugin("react")

export default function App() {
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

  if (!fontsLoaded) return <></>

  return (
    <SpiroKitProvider theme={myTheme}>
      <Navigator />
    </SpiroKitProvider>
  )
}
