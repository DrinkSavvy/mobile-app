import { FormValue } from '@types'
import { Colors } from '@utils/spirokit-config'

export interface LoginScreenProps {
  handleLoginPress: () => void
  phone: FormValue
  onChangePhone: (phone: string) => void
  onBlurPhone: () => void
  navigateToRegister: () => void
}

export interface InputFocusBorder {
  borderColor: Colors
}

export interface LoginScreenState {
  phone: {
    value: string
    isValid: boolean
    errorMessage: string | undefined
  }
}
