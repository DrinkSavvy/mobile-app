import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'

export default function useHome() {
  const [state, setState] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    // ...
  }, [])

  const handleLogoutPress = () => {
    // ...
  }

  return {
    handleLogoutPress,
    state,
  }
}
