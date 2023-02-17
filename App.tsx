import React from "react"

import Bugsnag from "@bugsnag/expo"
import { init } from "@amplitude/analytics-react-native"
import { SpiroKitProvider, usePoppins, useSpiroKitTheme } from "@spirokit/core"

import { BUGSNAG_API_KEY, AMPLITUDE_API_KEY } from "@env"
import Navigator from "./Navigation"
import { ErrorView } from "./components/ErrorBoundary"

const myTheme = useSpiroKitTheme()

const ErrorBoundary = Bugsnag.getPlugin("react")

export default function App() {
  const fontLoaded = usePoppins()

  init(AMPLITUDE_API_KEY)
  Bugsnag.start({ apiKey: BUGSNAG_API_KEY })

  if (!fontLoaded) return <></>

  return (
    <ErrorBoundary FallbackComponent={<ErrorView />}>
      <SpiroKitProvider theme={myTheme}>
        <Navigator />
      </SpiroKitProvider>
    </ErrorBoundary>
  )
}
