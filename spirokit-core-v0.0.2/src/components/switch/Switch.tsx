import React, { useState } from "react"
import { Box, ColorMode, HStack, Pressable, useColorMode } from "native-base"
import { AccentColor } from "../../theme"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { NBSpaceProps } from "../../theme/types"

export type SwitchProps = NBSpaceProps & {
	colorMode?: ColorMode
	accentColor?: AccentColor
	trackColor?: AccentColor
	thumbColor?: AccentColor
	accessibilityLabel?: string
	isDisabled?: boolean
	onValueChange?: ((value: boolean) => Promise<void> | void) | null | undefined
	value?: boolean | undefined
}

export const Switch: React.FC<SwitchProps> = (props) => {
	const { isDisabled, onValueChange, value } = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const [internalValue, setInternalValue] = useState<boolean>(value || false)

	const colorMode = props.colorMode || useColorMode().colorMode
	const accentColor = props.trackColor || props.accentColor || "primary"
	const enabledOffBorder = useColorModeValue(
		`${accentColor}.700`,
		`${accentColor}.300`,
		colorMode
	)
	const enabledOnBg = useColorModeValue(`${accentColor}.500`, `${accentColor}.300`, colorMode)

	const getStyles = () => {
		if (!internalValue) {
			return {
				backgroundColor: "transparent",
				borderColor: isDisabled ? "primaryGray.500" : enabledOffBorder
			}
		}

		return {
			backgroundColor: isDisabled ? "primaryGray.500" : enabledOnBg,
			borderColor: isDisabled ? "primaryGray.500" : "transparent"
		}
	}

	const handleValueChange = () => {
		setInternalValue(!internalValue)
		onValueChange && onValueChange(!internalValue)
	}

	return (
		<Pressable
			accessibilityLabel={props.accessibilityLabel}
			disabled={isDisabled}
			onPress={() => handleValueChange()}
			{...styleProps}>
			<HStack
				justifyContent={internalValue ? "flex-end" : "flex-start"}
				borderWidth={internalValue ? 0 : 2}
				padding={internalValue ? 1 : 0.5}
				borderRadius={16}
				width={16}
				overflow="hidden"
				{...getStyles()}>
				<Thumb
					accentColor={props.thumbColor || props.accentColor}
					colorMode={colorMode}
					value={internalValue}
					isDisabled={isDisabled}></Thumb>
			</HStack>
		</Pressable>
	)
}

export type ThumbProps = {
	colorMode: ColorMode
	accentColor?: AccentColor
	value?: boolean
	isDisabled?: boolean
}

const Thumb: React.FC<ThumbProps> = (props) => {
	const { colorMode, value, isDisabled } = props
	const accentColor = props.accentColor || "primary"
	const enabledOnBg = useColorModeValue("white", `${accentColor}.700`, colorMode)
	const enabledOffBg = useColorModeValue(`${accentColor}.500`, `${accentColor}.300`, colorMode)

	const getStyles = () => {
		if (isDisabled) {
			return {
				backgroundColor: value ? "white" : "primaryGray.500"
			}
		}

		return {
			backgroundColor: value ? enabledOnBg : enabledOffBg
		}
	}

	return <Box width={5} height={5} borderRadius="full" {...getStyles()}></Box>
}
