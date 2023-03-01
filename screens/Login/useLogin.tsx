import { supabase } from '@api/supabase'
import Bugsnag from '@bugsnag/expo'
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
  const phone = state.phone

  const { trackEvent } = useAnalytics()
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
        value: phone.value,
        isValid: phone.isValid,
        errorMessage: phone.isValid === false ? 'Invalid Phone Number' : undefined,
      },
    })
  }

  const handleLoginPress = async () => {
    if (phone.isValid) {
      const response = await supabase.auth.signInWithOtp({
        phone: '+1' + phone.value,
      })

      console.log(response)

      if (response.error) {
        Bugsnag.notify(response.error)
        Alert.alert('Error', response.error.message)
      }

      if (response.data.user) {
        trackEvent('entered phone', { phone: phone.value })
        navigation.navigate('ConfirmCode', { phone: phone.value })
      }
    } else {
      Alert.alert('Invalid Login')
    }
  }

  return {
    handleLoginPress,
    phone,
    onChangePhone,
    onBlurPhone,
    navigateToRegister: () => navigation.navigate('Home'),
  }
}
