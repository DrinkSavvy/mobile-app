import { withHook } from '@hooks/index'

import LoginView from './LoginView'
import useLogin from './useLogin'

const isScrollable = true

const Login = withHook(useLogin, LoginView, isScrollable)

export default Login
