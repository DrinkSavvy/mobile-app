import React from "react"
import { Box, ColorMode, HStack, useColorMode, useTheme, VStack } from "native-base"
import { Body } from "../typography/body"
import { TitleOne } from "../typography/title-one"
import { SvgProps } from "react-native-svg"
import { ThemeHelper } from "../../helpers/ThemeHelper"
import { Button } from "../button"
import { Modal } from "../modal"
import { CheckIcon, ExclamationIcon, TrashIcon } from "react-native-heroicons/outline"
import { AccentColor } from "../../theme"
import { useColorModeValue } from "../../hooks"

export type AlertProps = {
	isVisible: boolean
	TitleComponent: React.ReactComponentElement<typeof TitleOne>
	ConfirmButtonComponent: React.ReactComponentElement<typeof Button>
	type?: "info" | "warning" | "error"
	onClose: () => void | Promise<void>
	IconComponent?: (props: SvgProps) => JSX.Element
	SubheadingComponent?: React.ReactComponentElement<typeof Body>
	CancelButtonComponent?: React.ReactComponentElement<typeof Button>
	colorMode?: ColorMode
	accentColor?: AccentColor
}

export const Alert: React.FC<AlertProps> = (props) => {
	const {
		isVisible,
		TitleComponent,
		ConfirmButtonComponent,
		onClose,
		IconComponent,
		SubheadingComponent,
		CancelButtonComponent,
		accentColor,
		type = "info"
	} = props

	const colorMode = props.colorMode || useColorMode().colorMode
	const [titleColor, iconColor] = Array(2).fill(
		useColorModeValue("primaryGray.900", "primaryGray.100", colorMode)
	)
	const subheadingColor = useColorModeValue("primaryGray.500", "primaryGray.300", colorMode)
	const separatorColor = useColorModeValue("primaryGray.300", "primaryGray.600", colorMode)

	const { colors } = useTheme()

	const getThemeByType = (): AccentColor | "primary" => {
		switch (type) {
			case "error":
				return "red"
			case "warning":
				return "orange"
			default:
				return accentColor || "primary"
		}
	}

	const getIconByStatus = (): ((props: SvgProps) => JSX.Element) => {
		switch (type) {
			case "warning":
				return ExclamationIcon
			case "error":
				return TrashIcon
			default:
				return CheckIcon
		}
	}

	const getIconComponent = (): React.ReactNode => {
		const auxIcon = IconComponent || getIconByStatus()

		const iconColorHex = ThemeHelper.getTokenHexValue(iconColor, colors)

		const iconElement: JSX.Element = auxIcon({
			width: 32,
			height: 32,
			color: iconColorHex
		})

		return <Box marginBottom={4}>{iconElement}</Box>
	}

	return (
		<VStack>
			<Modal
				isOpen={isVisible}
				colorMode={colorMode}
				accentColor={accentColor}
				onClose={() => {
					onClose()
				}}
				BodyComponent={
					<>
						<VStack space={2} paddingBottom={2} alignItems="center">
							{getIconComponent()}
							{TitleComponent
								? {
										...TitleComponent,
										props: {
											fontWeight: "semibold",
											textAlign: "center",
											paddingX: 4,
											numberOfLines: 3,
											color: titleColor,
											adjustsFontSizeToFit: true,
											...TitleComponent.props
										}
								  }
								: null}
							{SubheadingComponent
								? {
										...SubheadingComponent,
										props: {
											fontWeight: "medium",
											flex: 1,
											paddingX: 4,
											color: subheadingColor,
											...SubheadingComponent.props
										}
								  }
								: null}
						</VStack>
						<HStack
							width={"full"}
							height={0.5}
							backgroundColor={separatorColor}></HStack>
					</>
				}
				FooterComponent={
					<VStack w="full" p={4} space={2}>
						{CancelButtonComponent
							? {
									...CancelButtonComponent,
									props: {
										variant: "tertiary",
										colorMode: colorMode,
										...CancelButtonComponent.props
									}
							  }
							: null}
						{{
							...ConfirmButtonComponent,
							props: {
								colorMode: colorMode,
								accentColor: getThemeByType(),
								...ConfirmButtonComponent.props
							}
						}}
					</VStack>
				}></Modal>
		</VStack>
	)
}
