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

export const Subhead: React.FC<TypographyProps> = (props) => {
	const { children, ...otherProps } = props

	const styleProps = {
		...useExtractTypographyProps(props),
		...useExtractSpaceProps(props),
		...useExtractFlexItemProps(props),
		...useExtractLayoutProps(props)
	}

	const defaultProps: TypographyProps = {
		color: useColorModeValue("black", "white", otherProps.colorMode),
		fontSize: "md",
		fontWeight: "normal",
		letterSpacing: "2xl",
		lineHeight: "sm"
	}

	return (
		<Text {...defaultProps} {...styleProps}>
			{children}
		</Text>
	)
}
