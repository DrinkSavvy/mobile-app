import React, { useEffect, useState } from "react"
import { Box } from "native-base"
import { AccentColor } from "../../theme"
import { ColorType, ResponsiveValue } from "native-base/lib/typescript/components/types"
import { ILinearGradientProps } from "native-base/lib/typescript/components/primitives/Box/types"
import { NBLayoutProps, NBSpaceProps } from "../../theme/types"
import { ViewStyle } from "react-native"

export type GradientProps = NBSpaceProps &
	NBLayoutProps & {
		accentColor?: AccentColor
		isPressed?: boolean
		backgroundColor?: ResponsiveValue<ColorType | ILinearGradientProps>
		borderRadius?: ResponsiveValue<
			| "sm"
			| "md"
			| "lg"
			| "xl"
			| "2xl"
			| (string & {})
			| "none"
			| (number & {})
			| "full"
			| "xs"
			| "3xl"
		>
		style?: ViewStyle
	}

export const GradientBox: React.FC<GradientProps> = (props) => {
	const { children, backgroundColor } = props

	const accentColor = props.accentColor || "primary"
	const [dynamicBg, setDynamicBg] = useState({})

	useEffect(() => {
		getBackgroundColor()
	}, [])

	const getBackgroundColor = () => {
		if (backgroundColor && backgroundColor === "none") return
		setDynamicBg({
			linearGradient: {
				colors: [`${accentColor}.700`, `${accentColor}.500`, `${accentColor}.400`],
				start: [0, 0],
				end: [1, 1]
			}
		})
	}

	return (
		<Box {...props} bg={dynamicBg} overflow="hidden">
			{children}
		</Box>
	)
}
