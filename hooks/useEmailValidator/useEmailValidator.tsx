export const useEmailValidator = () => {
  const validateEmail = (email: string) =>
    email.includes('@') && email.includes('.') && email.split('.').pop()?.length! > 1

  return {
    validateEmail,
  }
}
