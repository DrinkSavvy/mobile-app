import { UserProvider } from '../UserContext/UserContext'

interface ProviderProps {
  children: React.ReactNode
}

export const ProviderWrapper = ({ children }: ProviderProps) => {
  return <UserProvider>{children}</UserProvider>
}
