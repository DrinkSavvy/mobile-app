import { track } from "@amplitude/analytics-react-native"

export const useAnalytics = () => {
  const trackEvent = (name: string, properties?: any) => {
    track(name, properties)
  }

  return {
    trackEvent,
  }
}
