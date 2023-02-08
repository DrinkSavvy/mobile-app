import React from "react"
import { Text } from "native-base"
import {
	useColorModeValue,
	useExtractSpaceProps,
	useExtractTypographyProps,
	useExtractLayoutProps,
	useExtractFlexItemProps
} from "../../../hooks"
import { TypographyProps } from "../types"

export const Body: React.FC<TypographyProps> = (props) => {
	const { children, colorMode } = props

	const styleProps = {
		...useExtractTypographyProps(props),
		...useExtractSpaceProps(props),
		...useExtractFlexItemProps(props),
		...useExtractLayoutProps(props)
	}

	const defaultProps: TypographyProps = {
		color: useColorModeValue("black", "white", colorMode),
		fontSize: "lg",
		fontWeight: "normal",
		letterSpacing: "lg",
		lineHeight: "sm"
	}

	return (
		<Text {...defaultProps} {...styleProps}>
			{children}
		</Text>
	)
}
