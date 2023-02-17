import { useState } from "react"
import { Alert } from "react-native"
import Bugsnag, { NotifiableError } from "@bugsnag/expo"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { LoginScreenProps, LoginScreenState } from "./types"
import { supabase } from "../../api/supabase"
import { RootStackParamList } from "../../Navigation"
import useEmailValidator from "../../hooks/useEmailValidator"
import { useUserContext } from "../../context/UserContext"
import { useAnalytics } from "../../hooks/useAnalytics"

export default function useLogin(): LoginScreenProps {
  const [state, setState] = useState<LoginScreenState>({
    email: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    password: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
  })

  const { trackEvent } = useAnalytics()

  const { setToken } = useUserContext()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const onChangeEmail = (email: string) => {
    setState({
      ...state,
      email: {
        value: email,
        isValid: useEmailValidator(email),
        errorMessage: "",
      },
    })
  }

  const onBlurEmail = () => {
    setState({
      ...state,
      email: {
        value: state.email.value,
        isValid: state.email.isValid,
        errorMessage:
          state.email.isValid === false ? "Invalid email" : undefined,
      },
    })
  }

  const onChangePassword = (password: string) => {
    setState({
      ...state,
      password: {
        value: password,
        isValid: password.length > 1,
        errorMessage: "",
      },
    })
  }

  const onBlurPassword = () => {
    setState({
      ...state,
      password: {
        value: state.password.value,
        isValid: state.password.isValid,
        errorMessage:
          state.password.value.length > 1 ? undefined : "Password is too short",
      },
    })
  }

  const handleLoginPress = async () => {
    if (state.email.isValid && state.password.isValid) {
      const {
        data: { user, session },
        error,
      } = await supabase.auth.signInWithPassword({
        email: state.email.value,
        password: state.password.value,
      })

      if (error) {
        Bugsnag.notify(error)
        Alert.alert("Error", error.message)
      }

      if (user && session) {
        setToken(session.access_token)
        trackEvent("login", { email: state.email.value })
        // navigation.navigate("Home")
      }
    } else {
      Alert.alert("Invalid Login")
    }
  }

  const email = state.email
  const password = state.password

  return {
    handleLoginPress,
    email,
    password,
    onChangeEmail,
    onChangePassword,
    onBlurEmail,
    onBlurPassword,
    navigateToRegister: () => navigation.navigate("Login"),
  }
}
