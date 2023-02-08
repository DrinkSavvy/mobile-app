import React, { ReactNode } from "react"
import { Box, IBoxProps, Pressable, HStack, useTheme, useColorMode, ColorMode } from "native-base"
import { Subhead, TitleThree, TitleTwo } from "../typography"
import { ISpiroKitColor, AccentColor } from "../../theme"
import { SvgProps } from "react-native-svg"
import { ThemeHelper } from "../../helpers/ThemeHelper"
import { GestureResponderEvent } from "react-native"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { NBSpaceProps } from "../../theme/types"

export type ButtonProps = NBSpaceProps & {
	isDisabled?: boolean
	size?: "sm" | "md" | "lg"
	destructive?: boolean
	IconLeftComponent?: (props: SvgProps) => JSX.Element
	IconRightComponent?: (props: SvgProps) => JSX.Element
	variant?: "primary" | "secondary" | "tertiary"
	onPress?: (event: GestureResponderEvent) => void
	accessibilityLabel?: string
	textColor?: ISpiroKitColor
	colorMode?: ColorMode
	accentColor?: AccentColor
	borderRadius?: number
}

export const Button: React.FC<ButtonProps> = (props) => {
	const colorMode = props.colorMode || useColorMode().colorMode
	const {
		onPress,
		IconLeftComponent,
		IconRightComponent,
		size = "md",
		isDisabled = false,
		variant = "primary",
		destructive = false,
		accessibilityLabel = props.children?.toString(),
		textColor
	} = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const { colors } = useTheme()

	const accentColor = destructive ? "red" : props.accentColor || "primary"

	const primaryDisabledBgColor = useColorModeValue(
		`${accentColor}.300`,
		"primaryGray.700",
		colorMode
	)
	const [primaryPressedBgColor, secondaryPressedBorderColor] = Array(2).fill(
		useColorModeValue(`${accentColor}.700`, `${accentColor}.400`, colorMode)
	)
	const [primaryBgColor, secondaryBorderColor] = Array(2).fill(
		useColorModeValue(`${accentColor}.500`, `${accentColor}.300`, colorMode)
	)
	const secondaryDisabledBorderColor = useColorModeValue(
		`primaryGray.500`,
		`primaryGray.700`,
		colorMode
	)
	const primaryDisabledTextColor = useColorModeValue("white", "primaryGray.500", colorMode)
	const primaryEnabledTextColor = useColorModeValue("white", "black", colorMode)
	const tertiaryPressedTextColor = useColorModeValue(
		`primaryGray.700`,
		`primaryGray.200`,
		colorMode
	)
	const tertiaryTextColor = useColorModeValue(`primaryGray.900`, `primaryGray.100`, colorMode)

	const getPaddingBasedOnSize = (): IBoxProps => {
		switch (size) {
			case "sm":
				return {
					paddingY: variant !== "secondary" ? 2.5 : 2,
					paddingX: props.children ? 4 : variant !== "secondary" ? 2.5 : 2
				}
			case "md":
				return {
					paddingY: variant !== "secondary" ? 3.5 : 3,
					paddingX: props.children ? 6 : variant !== "secondary" ? 3.5 : 3
				}
			case "lg":
				return {
					paddingY: variant !== "secondary" ? 18 : 4,
					paddingX: props.children ? 8 : variant !== "secondary" ? 18 : 4
				}
		}
	}

	const getTextColorToken = (isPressed: boolean, isFocused: boolean): ISpiroKitColor => {
		if (textColor) return textColor
		switch (variant) {
			case "primary": {
				if (isDisabled) {
					return primaryDisabledTextColor
				}
				return primaryEnabledTextColor
			}
			case "secondary":
			case "tertiary":
				return !isDisabled
					? isPressed || isFocused
						? tertiaryPressedTextColor
						: tertiaryTextColor
					: "primaryGray.500"
		}
	}

	const getContentBasedOnSize = (isPressed: boolean, isFocused: boolean): React.ReactNode => {
		const textColorToken = getTextColorToken(isPressed, isFocused)

		const getTextNodeBasedOnSize = (): ReactNode => {
			switch (size) {
				case "sm":
					return (
						<Subhead
							textAlign="center"
							accessibilityLabel={accessibilityLabel}
							numberOfLines={2}
							color={textColorToken}>
							{props.children}
						</Subhead>
					)
				case "md":
					return (
						<TitleThree
							numberOfLines={2}
							accessibilityLabel={accessibilityLabel}
							textAlign="center"
							color={textColorToken}
							fontWeight="semibold">
							{props.children}
						</TitleThree>
					)
				case "lg":
					return (
						<TitleTwo
							numberOfLines={2}
							accessibilityLabel={accessibilityLabel}
							textAlign="center"
							color={textColorToken}
							fontWeight="semibold">
							{props.children}
						</TitleTwo>
					)
			}
		}

		const iconSize = {
			sm: 20,
			md: 24,
			lg: 28
		}

		if (!IconLeftComponent && !IconRightComponent) {
			return (
				<HStack justifyContent="center" alignItems="center" space={2}>
					{getTextNodeBasedOnSize()}
				</HStack>
			)
		}

		const textColorValue = ThemeHelper.getTokenHexValue(textColorToken, colors)

		if (IconLeftComponent) {
			const iconLeftElement: JSX.Element = IconLeftComponent({
				width: iconSize[size],
				height: iconSize[size],
				color: textColorValue
			})
			return (
				<HStack justifyContent="center" alignItems="center" space={props.children ? 2 : 0}>
					{iconLeftElement}
					{getTextNodeBasedOnSize()}
				</HStack>
			)
		}
		if (IconRightComponent) {
			const iconRightElement: JSX.Element = IconRightComponent({
				width: iconSize[size],
				height: iconSize[size],
				color: textColorValue
			})
			return (
				<HStack justifyContent="center" alignItems="center" space={2}>
					{getTextNodeBasedOnSize()}
					{iconRightElement}
				</HStack>
			)
		}
	}

	const getStylesBasedOnVariant = (isPressed: boolean, isFocused: boolean): IBoxProps => {
		switch (variant) {
			case "primary": {
				if (isDisabled) {
					return {
						bgColor: primaryDisabledBgColor
					}
				}

				if (isPressed || isFocused) {
					return {
						bgColor: primaryPressedBgColor
					}
				}

				return {
					bgColor: primaryBgColor
				}
			}
			case "secondary": {
				const getBorderColor = () => {
					if (isDisabled) {
						return secondaryDisabledBorderColor
					}

					if (isPressed || isFocused) {
						return secondaryPressedBorderColor
					}

					return secondaryBorderColor
				}

				return {
					bgColor: "transparent",
					borderWidth: "2",
					borderColor: getBorderColor()
				}
			}
			case "tertiary": {
				return {
					bgColor: "transparent"
				}
			}
		}
	}

	const getBorderRadiusBasedOnSize = (): number => {
		if (!props.children) return 100
		switch (size) {
			case "sm":
				return 8
			case "md":
				return 10
			case "lg":
				return 14
		}
	}

	const getBox = (isPressed: boolean, isFocused: boolean): React.ReactNode => {
		return <Box {...getPaddingBasedOnSize()}>{getContentBasedOnSize(isPressed, isFocused)}</Box>
	}

	if (!colorMode) return <></>

	return (
		<Pressable
			disabled={isDisabled}
			onPress={onPress}
			style={{ borderRadius: props.borderRadius || getBorderRadiusBasedOnSize() }}
			bg={variant === "primary" ? `${accentColor}.500` : "transparent"}
			_pressed={{
				backgroundColor: variant === "primary" ? `${accentColor}.700` : "transparent"
			}}
			{...styleProps}>
			{({ isFocused, isPressed }) => {
				return (
					<Box
						padding={0}
						overflow="hidden"
						display="flex"
						{...getStylesBasedOnVariant(isPressed, isFocused)}
						borderRadius={getBorderRadiusBasedOnSize()}
						accessibilityRole={"button"}>
						{isDisabled ? (
							<Box {...getPaddingBasedOnSize()}>
								{getContentBasedOnSize(isPressed, isFocused)}
							</Box>
						) : (
							getBox(isPressed, isFocused)
						)}
					</Box>
				)
			}}
		</Pressable>
	)
}
