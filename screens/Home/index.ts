import { withHook } from '@hooks/withHook'

import HomeView from './HomeView'
import useHome from './useHome'

const Login = withHook(useHome, HomeView)

export default Login
