import { ColorMode, Pressable, useTheme } from "native-base"
import React from "react"
import { XIcon } from "react-native-heroicons/outline"
import { AccentColor } from "../../theme"
import { ThemeHelper } from "../../helpers/ThemeHelper"
import { useColorModeValue } from "../../hooks"

type CloseButtonProps = {
	onClose: () => void
	colorMode?: ColorMode
	accentColor?: AccentColor
}

const CloseButton: React.FC<CloseButtonProps> = (props) => {
	const { onClose, colorMode } = props
	const accentColor = props.accentColor || "primary"
	const { colors } = useTheme()
	const iconColor = useColorModeValue(`${accentColor}.200`, "primaryGray.400", colorMode)
	const iconPressedColor = useColorModeValue(`${accentColor}.800`, "primaryGray.700", colorMode)
	const iconBgColor = useColorModeValue(`${accentColor}.700`, "primaryGray.800", colorMode)
	const iconColorHex = ThemeHelper.getTokenHexValue(iconColor, colors)

	return (
		<Pressable
			padding={3}
			onPress={() => onClose()}
			borderRadius={100}
			_pressed={{
				_light: {
					backgroundColor: iconPressedColor
				},
				_dark: {
					backgroundColor: iconPressedColor
				}
			}}
			backgroundColor={iconBgColor}>
			<XIcon width={20} height={20} color={iconColorHex}></XIcon>
		</Pressable>
	)
}

export default CloseButton
