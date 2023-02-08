import {
	ColorMode,
	HStack,
	Input as NBInput,
	Pressable,
	useColorMode,
	useToken,
	VStack
} from "native-base"
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack"
import React, { RefObject, useEffect, useRef, useState } from "react"
import { Button } from ".."
import { AccentColor, ISpiroKitColor } from "../../theme"
import {
	NativeSyntheticEvent,
	Platform,
	TextInput as RNTextInput,
	TextInputFocusEventData
} from "react-native"
import { Subhead } from "../typography"
import { SvgProps } from "react-native-svg"
import {
	CheckCircleIcon,
	ExclamationCircleIcon,
	EyeIcon,
	EyeOffIcon
} from "react-native-heroicons/outline"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { NBSpaceProps } from "../../theme/types"

export type InputProps = NBSpaceProps & {
	IconLeftComponent?: (props: SvgProps) => JSX.Element
	IconRightComponent?: (props: SvgProps) => JSX.Element
	required?: boolean
	error?: boolean
	success?: boolean
	ref?: RefObject<RNTextInput>
	ButtonComponent?: React.ReactComponentElement<typeof Button>
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
	secureTextEntry?: boolean
}

export const Input: React.FC<InputProps> = (props) => {
	const {
		onChangeText,
		IconLeftComponent,
		IconRightComponent,
		LabelComponent,
		ButtonComponent,
		error,
		success,
		placeholder = "Placeholder...",
		required = false
	} = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean | undefined>(
		props.secureTextEntry
	)

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
	const inputRef = props.ref || useRef<RNTextInput>(null)

	const placeholderColor = useColorModeValue("primaryGray.500", "primaryGray.300", colorMode)
	const textColor = useColorModeValue("black", "white", colorMode)
	const focusedBorderColor = useColorModeValue(
		`${accentColor}.700`,
		`${accentColor}.300`,
		colorMode
	)
	const defaultBorderColor = useColorModeValue("primaryGray.300", "primaryGray.600", colorMode)
	const disabledColor = useColorModeValue("primaryGray.200", "primaryDark.8", colorMode)
	const requiredAsteriskColor = useColorModeValue("red.500", "red.300", colorMode)
	const activeIconColor = useColorModeValue(primary500, primary300, colorMode)
	const errorIconColor = useColorModeValue(red500, red300, colorMode)
	const successIconColor = useColorModeValue(emerald500, emerald300, colorMode)

	const getTextColor = (): ISpiroKitColor => {
		if (props.isDisabled) {
			return "primaryGray.500"
		}

		if (!props.value || props.value.length === 0) {
			return placeholderColor
		} else {
			return textColor
		}
	}

	const onInputFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setBorderColor(focusedBorderColor)
		props.onFocus && props.onFocus(event)
	}

	const onInputBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setBorderColor(defaultBorderColor)
		props.onBlur && props.onBlur(event)
	}

	const getContainerStyles = (): IHStackProps => {
		if (props.isDisabled)
			return {
				backgroundColor: disabledColor
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
						props: { ...LabelComponent.props, colorMode, accentColor }
					}}
					{required ? <Subhead color={requiredAsteriskColor}>*</Subhead> : null}
				</HStack>
			) : null}
			<HStack space={2} alignItems="center">
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
					<HStack space={2} flex={1} paddingX={2} paddingY={2} alignItems="center">
						{IconLeftComponent &&
							IconLeftComponent({
								width: 24,
								height: 24,
								color: props.isDisabled ? primaryGray500 : activeIconColor
							})}
						<NBInput
							secureTextEntry={isSecureTextEntry}
							onFocus={(event) => onInputFocus(event)}
							onBlur={(event) => onInputBlur(event)}
							isDisabled={props.isDisabled}
							ref={inputRef}
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
							_focus={{
								borderWidth: 0
							}}
							borderWidth={0}
							accessibilityLabel={props.accessibilityLabel}
							placeholderTextColor="primaryGray.500"
							value={props.value}
							placeholder={placeholder}
							fontWeight="medium"
							_ios={{
								flex: 1
							}}
							_android={{
								flex: 1
							}}
							flex={1}
							isFullWidth={Platform.OS === "web"}
							fontSize="lg"
							padding={0.01}
							onChangeText={(text) => {
								onChangeText && onChangeText(text)
							}}
							color={getTextColor()}></NBInput>
						{props.secureTextEntry ? (
							<Pressable
								onPress={() => {
									setIsSecureTextEntry(!isSecureTextEntry)
									inputRef?.current?.focus()
								}}>
								{isSecureTextEntry ? (
									<EyeIcon
										width={24}
										height={24}
										color={
											props.isDisabled ? primaryGray500 : activeIconColor
										}></EyeIcon>
								) : (
									<EyeOffIcon
										width={24}
										height={24}
										color={
											props.isDisabled ? primaryGray500 : activeIconColor
										}></EyeOffIcon>
								)}
							</Pressable>
						) : null}
						{IconRightComponent &&
							IconRightComponent({
								width: 24,
								height: 24,
								color: props.isDisabled ? primaryGray500 : activeIconColor
							})}
					</HStack>
					{ButtonComponent
						? {
								...ButtonComponent,
								props: {
									...ButtonComponent.props,
									size: "sm",
									accentColor: accentColor,
									colorMode: colorMode,
									isDisabled: props.isDisabled,
									borderRadius: 2.5
								}
						  }
						: null}
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
