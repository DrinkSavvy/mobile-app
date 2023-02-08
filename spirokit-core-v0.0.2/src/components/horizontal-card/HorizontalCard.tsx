import React from "react"
import { Box, ColorMode, HStack, Image, useTheme, VStack } from "native-base"
import { SvgProps } from "react-native-svg"
import { Footnote, Subhead, TitleThree } from "../typography"
import { Avatar, Badge } from "../"
import { AccentColor } from "../../theme"
import { ThemeHelper } from "../../helpers/ThemeHelper"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { NBSpaceProps } from "../../theme/types"

export type HorizontalCardProps = NBSpaceProps & {
	TitleComponent: React.ReactComponentElement<typeof TitleThree>
	AssetLeftComponent?:
		| React.ReactComponentElement<typeof Image>
		| ((props: SvgProps) => JSX.Element)
	AssetRightComponent?:
		| React.ReactComponentElement<typeof Image>
		| ((props: SvgProps) => JSX.Element)
	BadgeComponent?: React.ReactComponentElement<typeof Badge>
	DateComponent?: React.ReactComponentElement<typeof Footnote>
	UserAvatarComponent?: React.ReactComponentElement<typeof Avatar>
	userName?: string
	DescriptionComponent?: React.ReactComponentElement<typeof Subhead>
	colorMode?: ColorMode
	accentColor?: AccentColor
}

export const HorizontalCard: React.FC<HorizontalCardProps> = (props) => {
	const {
		TitleComponent,
		AssetLeftComponent,
		AssetRightComponent,
		BadgeComponent,
		DateComponent,
		UserAvatarComponent,
		userName,
		DescriptionComponent,
		colorMode
	} = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const accentColor = props.accentColor || "primary"

	const iconBackgroundColor = useColorModeValue(
		`${accentColor}.700`,
		`${accentColor}.300`,
		colorMode
	)
	const containerBackgroundColor = useColorModeValue(
		`${accentColor}.500`,
		"primaryDark.4",
		colorMode
	)
	const iconColor = useColorModeValue("white", "black", colorMode)
	const userNameTextColor = useColorModeValue("primaryGray.700", "primaryGray.400", colorMode)
	const dateTextColor = useColorModeValue("primaryGray.500", "primaryGray.400", colorMode)
	const cardBgColor = useColorModeValue("white", "primaryDark.12", colorMode)

	const { colors } = useTheme()

	const assetIsImage = (
		item: React.ReactComponentElement<typeof Image> | ((props: SvgProps) => JSX.Element)
	): item is React.ReactComponentElement<typeof Image> => {
		if ((item as React.ReactComponentElement<typeof Image>).props?.source) return true

		return false
	}

	const getAsset = (
		item: React.ReactComponentElement<typeof Image> | ((props: SvgProps) => JSX.Element)
	) => {
		const iconColorHex = ThemeHelper.getTokenHexValue(iconColor, colors)

		if (assetIsImage(item)) {
			return {
				...item,
				props: {
					width: 110,
					resizeMode: "cover",
					...item.props
				}
			}
		} else {
			const icon: JSX.Element = item({
				width: 48,
				height: 29,
				color: iconColorHex
			})
			return (
				<VStack w={110} justifyContent="center" bg={containerBackgroundColor}>
					<Box
						w="72px"
						h="72px"
						backgroundColor={iconBackgroundColor}
						borderRadius="full"
						alignSelf="center"
						alignItems="center"
						justifyContent="center">
						{icon}
					</Box>
				</VStack>
			)
		}
	}

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
			<VStack marginBottom={4} space={1} width="full">
				{BadgeComponent ? (
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

	const getBody = (): JSX.Element => {
		return (
			<HStack>
				{AssetLeftComponent ? getAsset(AssetLeftComponent) : null}
				<VStack flex={1} flexWrap="wrap" p={3}>
					{getHeader()}
					{DescriptionComponent
						? {
								...DescriptionComponent,
								props: { ...DescriptionComponent?.props, colorMode, width: "full" }
						  }
						: null}
				</VStack>
				{AssetRightComponent ? getAsset(AssetRightComponent) : null}
			</HStack>
		)
	}

	return (
		<Box
			display="flex"
			borderRadius={8}
			style={{ shadowColor: "#00000024", shadowOffset: { width: 4, height: 4 } }}
			bg={cardBgColor}
			overflow="hidden"
			{...styleProps}>
			{getBody()}
		</Box>
	)
}
