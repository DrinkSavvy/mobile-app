import React from "react"
import { Box, VStack, Image, HStack, ColorMode } from "native-base"
import { Avatar, Badge } from "../"
import { Footnote, Subhead, TitleThree } from "../typography"
import { GradientBox } from "../gradient-box"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { AccentColor } from "../../theme"
import { NBSpaceProps } from "../../theme/types"

export type VerticalCardProps = NBSpaceProps & {
	TitleComponent: React.ReactComponentElement<typeof TitleThree>
	DateComponent?: React.ReactComponentElement<typeof Footnote>
	DescriptionComponent?: React.ReactComponentElement<typeof Subhead>
	BadgeComponent?: React.ReactComponentElement<typeof Badge>
	ImageComponent?: React.ReactComponentElement<typeof Image>
	UserAvatarComponent?: React.ReactComponentElement<typeof Avatar>
	userName?: string
	contentMode?: "floating" | "fixed"
	colorMode?: ColorMode
	accentColor?: AccentColor
}

export const VerticalCard: React.FC<VerticalCardProps> = (props) => {
	const {
		TitleComponent,
		DateComponent,
		DescriptionComponent,
		BadgeComponent,
		ImageComponent,
		UserAvatarComponent,
		userName,
		colorMode,
		contentMode = "floating"
	} = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const accentColor = props.accentColor || "primary"

	const userNameTextColor = useColorModeValue("primaryGray.700", "primaryGray.400", colorMode)
	const dateTextColor = useColorModeValue("primaryGray.500", "primaryGray.400", colorMode)
	const contentBg = useColorModeValue("white:alpha.90", "primaryDark.12:alpha.90", colorMode)
	const containerBg = useColorModeValue("white", "primaryDark.12", colorMode)

	const getAuthorLine = (): JSX.Element | null => {
		if (!UserAvatarComponent && !userName) return null

		return (
			<HStack space={2} alignItems={"center"} marginBottom={1}>
				{UserAvatarComponent
					? {
							...UserAvatarComponent,
							props: { size: "sm", ...UserAvatarComponent.props }
					  }
					: null}
				{userName ? <Footnote color={userNameTextColor}>{userName}</Footnote> : null}
			</HStack>
		)
	}

	const getHeader = (): JSX.Element => {
		return (
			<VStack marginBottom={4} space={1}>
				{!ImageComponent && BadgeComponent ? (
					<HStack justifyContent={"flex-end"}>
						{{
							...BadgeComponent,
							props: {
								size: "sm",
								accentColor: accentColor,
								colorMode: colorMode,
								...BadgeComponent.props
							}
						}}
					</HStack>
				) : null}
				{getAuthorLine()}
				{{
					...TitleComponent,
					props: {
						...TitleComponent.props,
						colorMode
					}
				}}
				{DateComponent
					? {
							...DateComponent,
							props: {
								color: dateTextColor,
								...DateComponent.props
							}
					  }
					: null}
			</VStack>
		)
	}

	const getFloatingBadge = (): JSX.Element => {
		if (!BadgeComponent) return <></>

		return (
			<HStack position={"absolute"} top={3} right={3} justifyContent={"flex-end"}>
				{{
					...BadgeComponent,
					props: {
						size: "sm",
						...BadgeComponent.props,
						colorMode: "light"
					}
				}}
			</HStack>
		)
	}

	if (contentMode === "floating") {
		return (
			<GradientBox
				accentColor={props.accentColor}
				width="full"
				borderRadius={8}
				style={{ shadowColor: "#00000024", shadowOffset: { width: 4, height: 4 } }}
				backgroundColor={ImageComponent ? "none" : "initial"}
				{...styleProps}>
				{ImageComponent ? (
					<>
						{{
							...ImageComponent,
							props: {
								width: "full",
								height: "full",
								minHeight: "96",
								resizeMode: "cover",
								...ImageComponent.props
							}
						}}
						{getFloatingBadge()}
					</>
				) : null}
				<Box
					position={ImageComponent ? "absolute" : "initial"}
					bottom={0}
					width="full"
					padding={2}>
					<Box padding={3} borderRadius={8} bg={contentBg}>
						{getHeader()}
						{DescriptionComponent
							? {
									...DescriptionComponent,
									props: { ...DescriptionComponent?.props, colorMode }
							  }
							: null}
					</Box>
				</Box>
			</GradientBox>
		)
	}

	return (
		<Box
			borderRadius={8}
			style={{ shadowColor: "#00000024", shadowOffset: { width: 4, height: 4 } }}
			bg={containerBg}
			overflow="hidden"
			{...styleProps}>
			{ImageComponent ? (
				<>
					{{
						...ImageComponent,
						props: {
							width: "full",
							height: "48",
							resizeMode: "cover",
							...ImageComponent.props
						}
					}}
					{getFloatingBadge()}
				</>
			) : null}
			<Box padding={3}>
				{getHeader()}
				{DescriptionComponent
					? {
							...DescriptionComponent,
							props: { ...DescriptionComponent?.props, colorMode }
					  }
					: null}
			</Box>
		</Box>
	)
}
