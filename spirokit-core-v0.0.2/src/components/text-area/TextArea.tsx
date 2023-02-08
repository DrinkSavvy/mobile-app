import {
	ColorMode,
	HStack,
	useColorMode,
	useToken,
	VStack,
	TextArea as NBTextArea
} from "native-base"
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack"
import React, { RefObject, useEffect, useRef, useState } from "react"
import { AccentColor, ISpiroKitColor } from "../../theme"
import {
	NativeSyntheticEvent,
	Platform,
	TextInput as RNTextInput,
	TextInputFocusEventData
} from "react-native"
import { Subhead } from "../typography"
import { SvgProps } from "react-native-svg"
import { CheckCircleIcon, ExclamationCircleIcon } from "react-native-heroicons/outline"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { NBSpaceProps } from "src/theme/types"

export type TextAreaProps = NBSpaceProps & {
	IconLeftComponent?: (props: SvgProps) => JSX.Element
	IconRightComponent?: (props: SvgProps) => JSX.Element
	required?: boolean
	error?: boolean
	success?: boolean
	ref?: RefObject<RNTextInput>
	LabelComponent?: React.ReactComponentElement<typeof Subhead>
	colorMode?: ColorMode
	accentColor?: AccentColor
	isDisabled?: boolean
	placeholder?: string
	onChangeText?: (value: string) => void
	onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void
	onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void
	accessibilityLabel?: string
	value?: string
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
	const {
		onChangeText,
		IconLeftComponent,
		IconRightComponent,
		LabelComponent,
		error,
		success,
		placeholder = "Placeholder...",
		required = false
	} = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const [value, setValue] = useState<string | undefined>(props.value)
	const [borderColor, setBorderColor] = useState<ISpiroKitColor>()
	const accentColor = props.accentColor || "primary"
	const [primary500, primary300, primaryGray500, red500, red300, emerald500, emerald300] =
		useToken("colors", [
			`${accentColor}.500`,
			`${accentColor}.300`,
			"primaryGray.500",
			"red.500",
			"red.300",
			"emerald.500",
			"emerald.300"
		])
	const colorMode = props.colorMode || useColorMode().colorMode

	const focusedBorderColor = useColorModeValue(
		`${accentColor}.700`,
		`${accentColor}.300`,
		colorMode
	)
	const defaultBorderColor = useColorModeValue("primaryGray.300", "primaryGray.600", colorMode)
	const labelTextColor = useColorModeValue("black", "primaryGray.300", colorMode)
	const errorIconColor = useColorModeValue(red500, red300, colorMode)
	const successIconColor = useColorModeValue(emerald500, emerald300, colorMode)
	const iconColor = useColorModeValue(primary500, primary300, colorMode)
	const placeholderTextColor = useColorModeValue("black", "primaryGray.200", colorMode)
	const activeTextColor = useColorModeValue("black", "white", colorMode)
	const disabledBgColor = useColorModeValue("primaryGray.200", "primaryDark.8", colorMode)

	const inputRef = props.ref || useRef<RNTextInput>(null)

	const getTextColor = (): ISpiroKitColor => {
		if (props.isDisabled) {
			return "primaryGray.500"
		}

		if (!value || value.length === 0) {
			return placeholderTextColor
		} else {
			return activeTextColor
		}
	}

	const onTextAreaFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setBorderColor(focusedBorderColor)
		props.onFocus && props.onFocus(event)
	}

	const onTextAreaBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setBorderColor(defaultBorderColor)
		props.onBlur && props.onBlur(event)
	}

	const getContainerStyles = (): IHStackProps => {
		if (props.isDisabled) {
			return {
				backgroundColor: disabledBgColor
			}
		}

		return {}
	}

	useEffect(() => {
		setBorderColor(colorMode === "light" ? "primaryGray.300" : "primaryGray.600")
	}, [colorMode])

	return (
		<VStack space={1} {...styleProps}>
			{LabelComponent ? (
				<HStack space={0.5}>
					{{
						...LabelComponent,
						props: {
							...LabelComponent.props,
							colorMode,
							accentColor,
							color: labelTextColor
						}
					}}{" "}
					{required ? <Subhead color={red500}>*</Subhead> : null}
				</HStack>
			) : null}
			<HStack space={2}>
				<HStack
					flexDir="row"
					flex={1}
					alignItems="center"
					justifyContent="space-between"
					borderColor={borderColor}
					borderWidth={2}
					borderRadius={8}
					padding={1}
					{...getContainerStyles()}>
					<HStack space={2} flex={1} paddingX={2} paddingY={2}>
						{IconLeftComponent &&
							IconLeftComponent({
								width: 24,
								height: 24,
								color: props.isDisabled ? primaryGray500 : iconColor
							})}
						<NBTextArea
							ref={inputRef}
							placeholder={placeholder}
							onFocus={(event) => onTextAreaFocus(event)}
							onBlur={(event) => onTextAreaBlur(event)}
							numberOfLines={3}
							isDisabled={props.isDisabled}
							_disabled={{
								bg: "transparent",
								placeholderTextColor: "primaryGray.500",
								opacity: 1
							}}
							_web={{
								backgroundColor: "none"
							}}
							_dark={{
								backgroundColor: "none"
							}}
							fontWeight="medium"
							_ios={{
								flex: 1
							}}
							_android={{
								flex: 1
							}}
							flex={1}
							accessibilityLabel={props.accessibilityLabel}
							placeholderTextColor="primaryGray.500"
							value={value}
							borderWidth={0}
							fontSize="md"
							padding={0}
							isFullWidth={Platform.OS === "web"}
							onChangeText={(text) => {
								setValue(text)
								onChangeText && onChangeText(text)
							}}
							color={getTextColor()}
							autoCompleteType={null}></NBTextArea>
						{IconRightComponent &&
							IconRightComponent({
								width: 24,
								height: 24,
								color: props.isDisabled ? primaryGray500 : iconColor
							})}
					</HStack>
				</HStack>
				{error && !props.isDisabled ? (
					<ExclamationCircleIcon
						width={24}
						height={24}
						color={errorIconColor}></ExclamationCircleIcon>
				) : null}
				{success && !props.isDisabled ? (
					<CheckCircleIcon
						width={24}
						height={24}
						color={successIconColor}></CheckCircleIcon>
				) : null}
			</HStack>
		</VStack>
	)
}
