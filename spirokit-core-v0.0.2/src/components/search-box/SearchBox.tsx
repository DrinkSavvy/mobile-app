import {
	Box,
	ColorMode,
	HStack,
	IBoxProps,
	Input,
	Pressable,
	useColorMode,
	useToken
} from "native-base"
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack"
import React, { useEffect, useRef, useState } from "react"
import { SearchIcon, XCircleIcon } from "react-native-heroicons/outline"
import { Button } from ".."
import { AccentColor, ISpiroKitColor } from "../../theme"
import { Platform, TextInput } from "react-native"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { NBSpaceProps } from "../../theme/types"

export type SearchBoxProps = NBSpaceProps & {
	defaultValue?: string
	isDisabled?: boolean
	placeholder?: string
	hasIcon?: boolean
	ButtonComponent?: React.ReactComponentElement<typeof Button>
	onChangeText?: (searchTerm: string) => void
	onFocus?: () => void
	onBlur?: () => void
	accessibilityLabel?: string
	backgroundColor?: ISpiroKitColor
	colorMode?: ColorMode
	accentColor?: AccentColor
}

export const SearchBox: React.FC<SearchBoxProps> = (props) => {
	const {
		defaultValue,
		accessibilityLabel,
		ButtonComponent,
		isDisabled = false,
		hasIcon = true,
		placeholder = "Search...",
		backgroundColor
	} = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const [searchTerm, setSearchTerm] = useState<string | undefined>(defaultValue || "")
	const [borderColor, setBorderColor] = useState<ISpiroKitColor>()
	const accentColor = props.accentColor || "primary"

	const [primary500, primary300, primaryGray300, primaryGray500] = useToken("colors", [
		`${accentColor}.500`,
		`${accentColor}.300`,
		"primaryGray.300",
		"primaryGray.500"
	])
	const colorMode = props.colorMode || useColorMode().colorMode
	const placeholderTextColor = useColorModeValue("primaryGray.500", "primaryGray.300", colorMode)
	const textColor = useColorModeValue("black", "white", colorMode)
	const focusedBorderColor = useColorModeValue(
		`${accentColor}.700`,
		`${accentColor}.300`,
		colorMode
	)
	const defaultBorderColor = useColorModeValue("primaryGray.300", "primaryGray.600", colorMode)
	const clearBtnColor = useColorModeValue(primaryGray500, primary300, colorMode)
	const disabledContainerBg = useColorModeValue("primaryGray.200", "primaryDark.8", colorMode)
	const disabledButtonBg = useColorModeValue("primaryGray.500", "primaryGray.700", colorMode)
	const searchIconColor = useColorModeValue(primary500, primaryGray300, colorMode)

	const inputRef = useRef<TextInput>(null)

	const getTextColor = (): ISpiroKitColor => {
		if (isDisabled) {
			return "primaryGray.500"
		}

		if (!searchTerm || searchTerm.length === 0) {
			return placeholderTextColor
		} else {
			return textColor
		}
	}

	const onInputFocus = () => {
		setBorderColor(focusedBorderColor)
		props.onFocus && props.onFocus()
	}

	const onInputBlur = () => {
		setBorderColor(defaultBorderColor)
		props.onBlur && props.onBlur()
	}

	const getContainerStyles = (): IHStackProps => {
		if (isDisabled) {
			return {
				backgroundColor: disabledContainerBg
			}
		}

		return {}
	}

	const getButtonStyles = (): IBoxProps => {
		const styles: IBoxProps = {
			borderRadius: 2.5
		}

		if (isDisabled) {
			styles.backgroundColor = disabledButtonBg
		}

		return styles
	}

	const clearText = () => {
		setSearchTerm("")
		props.onChangeText && props.onChangeText("")
		inputRef?.current?.blur()
		inputRef?.current?.focus()
	}

	useEffect(() => {
		setBorderColor(colorMode === "light" ? "primaryGray.300" : "primaryGray.600")
	}, [colorMode])

	return (
		<HStack
			paddingY={ButtonComponent ? 1 : 2}
			paddingX={1}
			flexDir="row"
			alignItems="center"
			justifyContent="space-between"
			borderColor={borderColor}
			borderWidth={2}
			borderRadius={8}
			backgroundColor={backgroundColor}
			{...styleProps}
			{...getContainerStyles()}>
			<HStack space={2} flex={1} paddingX={2} paddingY={0.5} alignItems="center">
				{hasIcon && !ButtonComponent ? (
					<Box width={6}>
						<SearchIcon
							size={24}
							color={isDisabled ? primaryGray500 : searchIconColor}></SearchIcon>
					</Box>
				) : null}
				<Input
					onFocus={() => onInputFocus()}
					onBlur={() => onInputBlur()}
					isDisabled={isDisabled}
					ref={inputRef}
					_disabled={{
						bg: "transparent",
						placeholderTextColor: "primaryGray.500",
						opacity: 1
					}}
					_hover={{
						bg: "transparent"
					}}
					_focus={{
						borderWidth: 0
					}}
					borderWidth={0}
					accessibilityLabel={accessibilityLabel}
					placeholderTextColor={placeholderTextColor}
					value={searchTerm}
					placeholder={placeholder}
					fontWeight="medium"
					_web={{
						backgroundColor: "none"
					}}
					_dark={{
						backgroundColor: "none"
					}}
					isFullWidth={Platform.OS === "web"}
					fontSize="lg"
					flex={1}
					padding={0}
					onChangeText={(text) => {
						setSearchTerm(text)
						props.onChangeText && props.onChangeText(text)
					}}
					color={getTextColor()}></Input>
				{searchTerm && searchTerm.length > 0 ? (
					<Pressable onPress={() => clearText()}>
						<Box width={6}>
							<XCircleIcon size={24} color={clearBtnColor}></XCircleIcon>
						</Box>
					</Pressable>
				) : null}
			</HStack>
			{ButtonComponent
				? {
						...ButtonComponent,
						props: {
							...ButtonComponent.props,
							_button: getButtonStyles(),
							accentColor: accentColor,
							colorMode: colorMode,
							size: "sm",
							isDisabled: isDisabled
						}
				  }
				: null}
		</HStack>
	)
}
