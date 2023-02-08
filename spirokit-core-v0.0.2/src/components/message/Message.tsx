import { ColorMode } from "native-base"
import React from "react"
import {
	useColorModeValue,
	useExtractFlexItemProps,
	useExtractLayoutProps,
	useExtractSpaceProps,
	useExtractTypographyProps
} from "../../hooks"
import { ISpiroKitColor } from "../../theme"
import { Footnote, TypographyProps } from "../typography"

export type MessageProps = TypographyProps & {
	type?: "error" | "info" | "success"
	colorMode?: ColorMode
	children?: string
}

export const Message: React.FC<MessageProps> = (props) => {
	const { type, colorMode } = props

	const styleProps = {
		...useExtractTypographyProps(props),
		...useExtractSpaceProps(props),
		...useExtractFlexItemProps(props),
		...useExtractLayoutProps(props)
	}

	const successTextColor = useColorModeValue("emerald.500", "emerald.300", colorMode)
	const errorTextColor = useColorModeValue("red.500", "red.300", colorMode)
	const infoTextColor = useColorModeValue("blue.500", "blue.300", colorMode)

	const getColorBasedOnType = (): ISpiroKitColor => {
		switch (type) {
			case "success":
				return successTextColor
			case "error":
				return errorTextColor
			default:
				return infoTextColor
		}
	}

	return (
		<Footnote color={getColorBasedOnType()} {...styleProps}>
			{props.children}
		</Footnote>
	)
}
