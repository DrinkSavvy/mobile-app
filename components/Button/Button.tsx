import { Button as SpirokitButton } from '@spirokit/core'

export const Button = (props: React.ComponentProps<typeof SpirokitButton>) => {
  return <SpirokitButton {...props}>{props.children}</SpirokitButton>
}

export default Button
