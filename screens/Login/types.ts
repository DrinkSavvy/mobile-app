import { FormValue } from '@types'
import { Colors } from '@utils/spirokit-config'

export interface LoginScreenProps {
  handleLoginPress: () => void
  email: FormValue
  password: FormValue
  onChangeEmail: (email: string) => void
  onChangePassword: (password: string) => void
  onBlurEmail: () => void
  onBlurPassword: () => void
  navigateToRegister: () => void
}

export interface InputFocusBorder {
  borderColor: Colors
}

export interface LoginScreenState {
  email: {
    value: string
    isValid: boolean
    errorMessage: string | undefined
  }
  password: {
    value: string
    isValid: boolean
    errorMessage: string | undefined
  }
}
