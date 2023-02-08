import React, { useEffect } from "react"
import { Box, ColorMode, HStack, IBoxProps, useColorMode } from "native-base"
import { AccentColor } from "../../theme"
import { TitleOne, Subhead } from "../typography"
import CloseButton from "./CloseButton"
import { useColorModeValue } from "../../hooks"

type HeaderProps = IBoxProps & {
	accentColor?: AccentColor
	colorMode?: ColorMode
	isPressed?: boolean
	TitleComponent?: React.ReactComponentElement<typeof TitleOne>
	SubtitleComponent?: React.ReactComponentElement<typeof Subhead>
	onClose: () => void
}

export const Header: React.FC<HeaderProps> = (props) => {
	const { TitleComponent, SubtitleComponent, onClose } = props

	const accentColor = props.accentColor || "primary"
	const colorMode = props.colorMode || useColorMode().colorMode
	const subtitleTextColor = useColorModeValue("white", "primaryGray.300", colorMode)
	const backgroundColor = useColorModeValue(`${accentColor}.500`, "primaryDark.6", colorMode)

	useEffect(() => {}, [colorMode])

	if (!TitleComponent && !SubtitleComponent) {
		return (
			<HStack paddingX={4} paddingTop={4} justifyContent="flex-end">
				<CloseButton
					colorMode={colorMode}
					accentColor={props.accentColor}
					onClose={onClose}></CloseButton>
			</HStack>
		)
	}

	return (
		<Box backgroundColor={backgroundColor}>
			<HStack padding={4} alignItems="flex-start">
				<Box flex={1}>
					{TitleComponent
						? {
								...TitleComponent,
								props: {
									...TitleComponent.props,
									color: "white",
									marginBottom: 1
								}
						  }
						: null}
					{SubtitleComponent
						? {
								...SubtitleComponent,
								props: {
									...SubtitleComponent.props,
									color: subtitleTextColor,
									marginBottom: 1
								}
						  }
						: null}
				</Box>
				<CloseButton
					colorMode={colorMode}
					accentColor={props.accentColor}
					onClose={onClose}></CloseButton>
			</HStack>
		</Box>
	)
}
