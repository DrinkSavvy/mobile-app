import { ColorMode } from "native-base"
import { MutableRefObject } from "react"
import { NBSpaceProps } from "../../theme/types"
import { AccentColor } from "../../theme"
import Radio from "./Radio"

export type RadioProps = {
	value: string
	accentColor?: AccentColor
	colorMode?: ColorMode
	isDisabled?: boolean
	isHovered?: boolean
	isPressed?: boolean
	isFocused?: boolean
	space?: number
	isFocusVisible?: boolean
	isInvalid?: boolean
	size?: "sm" | "md" | "lg"
	ref?: MutableRefObject<any>
	children?: string
}

export type RadioGroupProps = NBSpaceProps & {
	value?: string
	name: string
	defaultValue?: string
	accentColor?: AccentColor
	colorMode?: ColorMode
	size?: "sm" | "md" | "lg"
	space?: number
	onChange?: (value: string) => any
	children?:
		| React.ReactComponentElement<typeof Radio>
		| React.ReactComponentElement<typeof Radio>[]
}

export type RadioComponentType = ((props: RadioProps) => JSX.Element) & {
	Group: (
		props: RadioGroupProps & {
			ref?: MutableRefObject<any>
		}
	) => JSX.Element
}
