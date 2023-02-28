import { supabase } from '@api/supabase'
import Bugsnag from '@bugsnag/expo'
import { useUserContext } from '@context/index'
import { useAnalytics } from '@hooks/index'
import { RootStackParamList } from '@navigation/Navigation'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Alert } from 'react-native'

import { LoginScreenProps, LoginScreenState } from './types'

export default function useLogin(): LoginScreenProps {
  const [state, setState] = useState<LoginScreenState>({
    phone: {
      value: '',
      isValid: false,
      errorMessage: '',
    },
  })

  const { trackEvent } = useAnalytics()

  const { setToken } = useUserContext()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const onChangePhone = (phone: string) => {
    setState({
      ...state,
      phone: {
        value: phone,
        isValid: !(phone.length < 10),
        errorMessage: '',
      },
    })
  }

  const onBlurPhone = () => {
    setState({
      ...state,
      phone: {
        value: state.phone.value,
        isValid: state.phone.isValid,
        errorMessage: state.phone.isValid === false ? 'Invalid Phone Number' : undefined,
      },
    })
  }

  const handleLoginPress = async () => {
    if (state.phone.isValid) {
      const {
        data: { user, session },
        error,
      } = await supabase.auth.signInWithOtp({
        phone: '+1' + state.phone.value,
      })

      if (error) {
        Bugsnag.notify(error)
        Alert.alert('Error', error.message)
      }

      if (user && session) {
        setToken(session.access_token)
        trackEvent('login', { phone: state.phone.value })
        navigation.navigate('Home')
      }
    } else {
      Alert.alert('Invalid Login')
    }
  }

  const phone = state.phone

  return {
    handleLoginPress,
    phone,
    onChangePhone,
    onBlurPhone,
    navigateToRegister: () => navigation.navigate('Home'),
  }
}
