import Bugsnag from '@bugsnag/expo'

export const useErrorNotify = () => {
  const handleError = (error: Error) => {
    if (__DEV__) {
      console.error(error)
    } else {
      Bugsnag.notify(error)
    }
  }

  return {
    handleError,
  }
}
