import { ColorMode, Icon, Pressable, useColorMode, VStack } from "native-base"
import { SvgProps } from "react-native-svg"
import { AccentColor } from "../../theme"
import { Caption } from "../typography"
import React from "react"
import { useColorModeValue } from "../../hooks"

export type TabProps = (
	| {
			LabelComponent: React.ReactComponentElement<typeof Caption>
			IconComponent?: (props: SvgProps) => JSX.Element
	  }
	| {
			LabelComponent?: React.ReactComponentElement<typeof Caption>
			IconComponent: (props: SvgProps) => JSX.Element
	  }
) & {
	isFocused?: boolean
	iconSize?: number
	onPress?: () => void
	onLongPress?: () => void
	accentColor?: AccentColor
	colorMode?: ColorMode
}

const Tab = (props: TabProps) => {
	const { LabelComponent, isFocused, onPress, onLongPress, IconComponent, iconSize } = props

	const colorMode = props.colorMode || useColorMode().colorMode

	const accentColor = props.accentColor || "primary"

	const color = isFocused
		? useColorModeValue(`${accentColor}.500`, `${accentColor}.300`, colorMode)
		: useColorModeValue("primaryGray.900", "primaryGray.300", colorMode)

	const getBody = () => {
		return React.useMemo(() => {
			return (
				<Pressable flex={1} padding={1} onPress={onPress} onLongPress={onLongPress}>
					<VStack
						space={1}
						paddingY={!LabelComponent || !IconComponent ? 2 : 0}
						paddingX={2}
						alignItems="center">
						{IconComponent ? (
							<Icon as={IconComponent} color={color} size={iconSize || 6}></Icon>
						) : null}
						{LabelComponent
							? {
									...LabelComponent,
									props: {
										...LabelComponent?.props,
										colorMode,
										color: color,
										textAlign: "center",
										numberOfLines: 2,
										fontWeight: isFocused ? "semibold" : "normal"
									}
							  }
							: null}
					</VStack>
				</Pressable>
			)
		}, [color])
	}

	return getBody()
}

export default Tab
