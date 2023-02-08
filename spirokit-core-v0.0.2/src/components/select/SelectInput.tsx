import React, { useEffect, useState } from "react"
import { Pressable, useColorMode, useToken, HStack, ColorMode } from "native-base"
import {
	CheckCircleIcon,
	ChevronDownIcon,
	ExclamationCircleIcon,
	XCircleIcon
} from "react-native-heroicons/outline"
import { AccentColor, ISpiroKitColor } from "../../theme"
import { Body } from "../typography"
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { NBSpaceProps } from "../../theme/types"

type SelectInputProps = NBSpaceProps & {
	isDisabled?: boolean
	displayValue?: string
	placeholder: string
	success?: boolean
	error?: boolean
	onInputTapped: () => void
	onInputCleared: () => void
	colorMode?: ColorMode
	accentColor?: AccentColor
}

const SelectInput = (props: SelectInputProps) => {
	const { isDisabled, displayValue, placeholder, success, error, onInputTapped, onInputCleared } =
		props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const [borderColor, setBorderColor] = useState<ISpiroKitColor>()
	const colorMode = props.colorMode || useColorMode().colorMode
	const accentColor = props.accentColor || "primary"

	const [isPressed, setIsPressed] = useState<boolean>(false)

	const [
		primary300,
		primary400,
		primary500,
		primary700,
		primaryGray500,
		red500,
		red300,
		emerald500,
		emerald300
	] = useToken("colors", [
		`${accentColor}.300`,
		`${accentColor}.400`,
		`${accentColor}.500`,
		`${accentColor}.700`,
		"primaryGray.500",
		"red.500",
		"red.300",
		"emerald.500",
		"emerald.300"
	])

	const clearBtnColor = useColorModeValue(
		isPressed ? primary700 : primary500,
		isPressed ? primary400 : primary300,
		colorMode
	)
	const bgDisabled = useColorModeValue("primaryGray.200", "primaryDark.8", colorMode)
	const bgPressed = useColorModeValue(`${accentColor}.700`, `${accentColor}.400`, colorMode)
	const placeholderColor = useColorModeValue("primaryGray.500", "primaryGray.300", colorMode)
	const textColor = useColorModeValue("black", "white", colorMode)
	const chevronDownColor = useColorModeValue(primary500, primary300, colorMode)
	const errorIconColor = useColorModeValue(red500, red300, colorMode)
	const successIconColor = useColorModeValue(emerald500, emerald300, colorMode)

	const getContainerStyles = (isPressed: boolean): IHStackProps => {
		if (isDisabled)
			return {
				backgroundColor: bgDisabled
			}

		if (isPressed) {
			return {
				borderColor: bgPressed
			}
		}

		return {}
	}

	const getTextColor = (): ISpiroKitColor => {
		if (props.isDisabled) {
			return "primaryGray.500"
		}

		if (!props.displayValue || props.displayValue.length === 0) {
			return placeholderColor
		} else {
			return textColor
		}
	}

	useEffect(() => {
		setBorderColor(colorMode === "light" ? "primaryGray.300" : "primaryGray.600")
	}, [colorMode])

	return (
		<HStack space={2} alignItems="center">
			<HStack
				paddingY={0.5}
				paddingX={1}
				flexDir="row"
				flex={1}
				alignItems="center"
				justifyContent="space-between"
				borderColor={borderColor}
				borderWidth={2}
				borderRadius={8}
				{...styleProps}
				{...getContainerStyles(isPressed)}>
				<HStack space={2} flex={1} paddingX={2} paddingY={2.5}>
					<Pressable
						flex={1}
						justifyContent="center"
						isDisabled={isDisabled}
						onPress={() => onInputTapped()}
						onPressIn={() => setIsPressed(true)}
						onPressOut={() => setIsPressed(false)}>
						<Body color={getTextColor()}>{displayValue || placeholder}</Body>
					</Pressable>
					{displayValue && displayValue.length > 0 ? (
						<Pressable
							isDisabled={isDisabled}
							onPress={() => onInputCleared()}
							onPressIn={() => setIsPressed(true)}
							onPressOut={() => setIsPressed(false)}>
							<XCircleIcon
								width={24}
								height={24}
								color={
									props.isDisabled ? primaryGray500 : clearBtnColor
								}></XCircleIcon>
						</Pressable>
					) : null}
					<Pressable
						isDisabled={isDisabled}
						onPress={() => onInputTapped()}
						onPressIn={() => setIsPressed(true)}
						onPressOut={() => setIsPressed(false)}>
						<ChevronDownIcon
							width={24}
							height={24}
							color={
								props.isDisabled ? primaryGray500 : chevronDownColor
							}></ChevronDownIcon>
					</Pressable>
				</HStack>
			</HStack>
			{error && !props.isDisabled ? (
				<ExclamationCircleIcon
					width={24}
					height={24}
					color={errorIconColor}></ExclamationCircleIcon>
			) : null}
			{success && !props.isDisabled ? (
				<CheckCircleIcon width={24} height={24} color={successIconColor}></CheckCircleIcon>
			) : null}
		</HStack>
	)
}

export default SelectInput
