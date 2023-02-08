import React from "react"
import { ColorMode, HStack, useTheme } from "native-base"
import { Footnote } from "../typography/footnote"
import { Subhead } from "../typography/subhead"
import { SvgProps } from "react-native-svg"
import { ThemeHelper } from "../../helpers/ThemeHelper"
import { AccentColor } from "../../theme"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { NBSpaceProps } from "../../theme/types"

export type BadgeProps = NBSpaceProps & {
	size?: "sm" | "md"
	IconLeftComponent?: (props: SvgProps) => JSX.Element
	IconRightComponent?: (props: SvgProps) => JSX.Element
	colorMode?: ColorMode
	accentColor?: AccentColor
}

export const Badge: React.FC<BadgeProps> = (props) => {
	const { IconLeftComponent, IconRightComponent, size = "md" } = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const iconSize = {
		sm: 12,
		md: 16
	}

	const accentColor = props.accentColor || "primary"

	const { colors } = useTheme()
	const textColor = useColorModeValue(`${accentColor}.700`, `${accentColor}.300`, props.colorMode)
	const borderColor = useColorModeValue("transparent", `${accentColor}.300`, props.colorMode)
	const bgColor = useColorModeValue(`${accentColor}.200`, "transparent", props.colorMode)

	const getTextContainer = (): React.ReactNode => {
		if (size === "sm") {
			return <Footnote color={textColor}>{props.children}</Footnote>
		}

		return <Subhead color={textColor}>{props.children}</Subhead>
	}

	const getIconComponent = (
		iconComponent?: (props: SvgProps) => JSX.Element
	): React.ReactNode => {
		if (!iconComponent) return null

		const iconColor = ThemeHelper.getTokenHexValue(textColor, colors)

		const iconElement: JSX.Element = iconComponent({
			width: iconSize[size],
			height: iconSize[size],
			color: iconColor
		})

		return iconElement
	}

	if (props.children === "") return <></>

	return (
		<HStack
			space={2}
			alignItems="center"
			paddingY={1}
			paddingX={2}
			borderColor={borderColor}
			borderWidth={1}
			borderRadius={8}
			backgroundColor={bgColor}
			{...styleProps}>
			{getIconComponent(IconLeftComponent)}
			{getTextContainer()}
			{getIconComponent(IconRightComponent)}
		</HStack>
	)
}
