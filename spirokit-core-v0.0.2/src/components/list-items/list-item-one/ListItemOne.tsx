import { Box, ColorMode, HStack, useToken } from "native-base"
import { ChevronRightIcon } from "react-native-heroicons/outline"
import { Body, Subhead } from "../../typography"
import React from "react"
import { AccentColor } from "../../../theme"
import { useColorModeValue } from "../../../hooks"

export type ListItemOneProps = {
	id: string
	title: string
	subtitle: string
	colorMode?: ColorMode
	accentColor?: AccentColor
}

export const ListItemOne: React.FC<ListItemOneProps> = (props) => {
	const { id, title, subtitle, colorMode } = props
	const accentColor = props.accentColor || "primary"
	const [primary500, primary300] = useToken("colors", [
		`${accentColor}.500`,
		`${accentColor}.300`
	])

	const titleTextColor = useColorModeValue("black", "white", colorMode)
	const subtitleTextColor = useColorModeValue("primaryGray.700", "primaryGray.300", colorMode)
	const iconColor = useColorModeValue(primary500, primary300, colorMode)

	return (
		<HStack
			testID={id}
			justifyContent="space-between"
			paddingX={4}
			paddingY={2}
			alignItems="center">
			<Box>
				<Body color={titleTextColor} marginBottom={1}>
					{title}
				</Body>
				<Subhead color={subtitleTextColor}>{subtitle}</Subhead>
			</Box>
			<ChevronRightIcon width={24} height={24} color={iconColor}></ChevronRightIcon>
		</HStack>
	)
}
