import { withHook } from '@hooks/index'
import { ViewStyle } from 'react-native'

import ConfirmCodeView from './ConfirmCodeView'
import useLogin from './useConfirmCode'

const isScrollable = true

const style: ViewStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' }

const ConfirmCode = withHook(useLogin, ConfirmCodeView, isScrollable, style)

export default ConfirmCode
