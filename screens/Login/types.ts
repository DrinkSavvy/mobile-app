import { FormValue } from "../../types";

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

export interface LoginScreenState {
  email: {
    value: string,
    isValid: boolean,
    errorMessage: string | undefined
  },
  password: {
    value: string,
    isValid: boolean,
    errorMessage: string | undefined
  },
}
