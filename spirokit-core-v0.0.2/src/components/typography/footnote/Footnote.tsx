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

export const Footnote: React.FC<TypographyProps> = (props) => {
	const { children, ...otherProps } = props

	const styleProps = {
		...useExtractTypographyProps(props),
		...useExtractSpaceProps(props),
		...useExtractFlexItemProps(props),
		...useExtractLayoutProps(props)
	}

	const defaultProps: TypographyProps = {
		color: useColorModeValue("black", "white", otherProps.colorMode),
		fontSize: "sm",
		fontWeight: "normal",
		letterSpacing: "xl",
		lineHeight: "sm"
	}

	return (
		<Text {...defaultProps} {...styleProps}>
			{children}
		</Text>
	)
}
