import { supabase } from '@api/supabase'
import { useUserContext } from '@context/index'
import { useAnalytics, useErrorNotify } from '@hooks/index'
import { RootStackParamList } from '@navigation/Navigation'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Alert } from 'react-native'

import { ConfirmCodeScreenProps, ConfirmCodeScreenState } from './types'

export default function useConfirmCode(): ConfirmCodeScreenProps {
  const [state, setState] = useState<ConfirmCodeScreenState>({
    code: undefined,
  })
  const code = state.code

  const { trackEvent } = useAnalytics()
  const { handleError } = useErrorNotify()

  const { setToken } = useUserContext()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<RouteProp<RootStackParamList>>()

  const onChangeCode = (code: string) => {
    setState({
      ...state,
      code,
    })
  }

  const handleVerificationPress = async () => {
    if (code) {
      const {
        data: { user, session },
        error,
      } = await supabase.auth.verifyOtp({
        phone: '+13334445555',
        token: code,
        type: 'sms',
      })

      if (error) {
        handleError(error)
        Alert.alert('Error', error.message)
      }

      if (user && session) {
        setToken(session.access_token)
        trackEvent('login', { phone: route.params?.phone })
        navigation.navigate('Home')
      }
    } else {
      Alert.alert('Code is Undefined')
    }
  }

  return {
    handleVerificationPress,
    code,
    onChangeCode,
  }
}
