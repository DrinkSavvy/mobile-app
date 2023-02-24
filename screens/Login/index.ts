import { withHook } from '@hooks/index'
import { ViewStyle } from 'react-native'

import LoginView from './LoginView'
import useLogin from './useLogin'

const isScrollable = true

const style: ViewStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' }

const Login = withHook(useLogin, LoginView, isScrollable, style)

export default Login
