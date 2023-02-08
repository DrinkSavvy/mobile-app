import React from "react"
import { Text as TextNB } from "native-base"
import {
	useColorModeValue,
	useExtractSpaceProps,
	useExtractTypographyProps,
	useExtractLayoutProps,
	useExtractFlexItemProps
} from "../../../hooks"
import { TypographyProps } from "../types"

export const Text: React.FC<TypographyProps> = (props) => {
	const { children, colorMode } = props

	const styleProps = {
		...useExtractTypographyProps(props),
		...useExtractSpaceProps(props),
		...useExtractFlexItemProps(props),
		...useExtractLayoutProps(props)
	}

	const defaultProps: TypographyProps = {
		color: useColorModeValue("black", "white", colorMode)
	}

	return (
		<TextNB {...defaultProps} {...styleProps}>
			{children}
		</TextNB>
	)
}
