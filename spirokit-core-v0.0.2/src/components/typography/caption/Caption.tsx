import React from "react"
import { Text } from "native-base"
import {
	useColorModeValue,
	useExtractTypographyProps,
	useExtractSpaceProps,
	useExtractFlexItemProps,
	useExtractLayoutProps
} from "../../../hooks"
import { TypographyProps } from "../types"

export const Caption: React.FC<TypographyProps> = (props) => {
	const { children, colorMode } = props

	const styleProps = {
		...useExtractTypographyProps(props),
		...useExtractSpaceProps(props),
		...useExtractFlexItemProps(props),
		...useExtractLayoutProps(props)
	}

	const defaultProps: TypographyProps = {
		color: useColorModeValue("black", "white", colorMode),
		fontSize: "xs",
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
