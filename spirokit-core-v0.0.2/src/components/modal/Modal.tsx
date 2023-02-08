import {
	ColorMode,
	IModalProps,
	Modal as ModalNB,
	useColorMode,
	usePropsResolution,
	VStack
} from "native-base"
import React from "react"
import { TitleOne, Subhead } from "../typography"
import { AccentColor } from "../../theme"
import { Header } from "./Header"
import { useColorModeValue } from "../../hooks"

export type ModalProps = IModalProps & {
	TitleComponent?: React.ReactComponentElement<typeof TitleOne>
	SubtitleComponent?: React.ReactComponentElement<typeof Subhead>
	HeaderComponent?: JSX.Element
	BodyComponent?: JSX.Element
	FooterComponent?: JSX.Element
	colorMode?: ColorMode
	accentColor?: AccentColor
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
	const {
		TitleComponent,
		SubtitleComponent,
		HeaderComponent,
		BodyComponent,
		FooterComponent,
		onClose,
		isOpen
	} = props

	const inheritedProps = usePropsResolution("Modal", props)

	const colorMode = props.colorMode || useColorMode().colorMode

	const bgColor = useColorModeValue("primaryGray.100", "primaryDark.24", colorMode)

	return (
		<VStack flex={1}>
			<ModalNB
				{...inheritedProps}
				avoidKeyboard={true}
				_backdrop={{ bg: "primaryDark.1", opacity: 1 }}
				isOpen={isOpen}
				borderRadius={3}
				onClose={onClose}>
				<ModalNB.Content maxHeight={"70%"} backgroundColor={bgColor}>
					<ModalNB.Header backgroundColor={bgColor} borderBottomWidth={0} padding={0}>
						<Header
							accentColor={props.accentColor}
							colorMode={colorMode}
							TitleComponent={TitleComponent}
							SubtitleComponent={SubtitleComponent}
							onClose={onClose}></Header>
						{HeaderComponent}
					</ModalNB.Header>
					<ModalNB.Body background="transparent" p={0}>
						{BodyComponent}
					</ModalNB.Body>
					<ModalNB.Footer background="transparent" p={0}>
						{FooterComponent}
					</ModalNB.Footer>
				</ModalNB.Content>
			</ModalNB>
		</VStack>
	)
}
