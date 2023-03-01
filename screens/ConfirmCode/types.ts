import { Colors } from '@utils/spirokit-config'

export interface ConfirmCodeScreenProps {
  handleVerificationPress: () => void
  code?: string
  onChangeCode: (code: string) => void
}

export interface InputFocusBorder {
  borderColor: Colors
}

export interface ConfirmCodeScreenState {
  code?: string
}
