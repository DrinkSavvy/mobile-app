import { Box, ColorMode, HStack, Image, useTheme, VStack } from "native-base"
import React from "react"
import { SvgProps } from "react-native-svg"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { ThemeHelper } from "../../helpers/ThemeHelper"
import { AccentColor } from "../../theme"
import { Badge } from "../badge"
import { GradientBox } from "../gradient-box"
import { TitleThree } from "../typography"
import { NBSpaceProps } from "../../theme/types"

export type PortraitCardProps = NBSpaceProps & {
	TitleComponent: React.ReactComponentElement<typeof TitleThree>
	BadgeComponent?: React.ReactComponentElement<typeof Badge>
	AssetComponent?: React.ReactComponentElement<typeof Image> | ((props: SvgProps) => JSX.Element)
	contentMode?: "floating" | "fixed"
	colorMode?: ColorMode
	accentColor?: AccentColor
}

export const PortraitCard: React.FC<PortraitCardProps> = (props) => {
	const {
		TitleComponent,
		BadgeComponent,
		AssetComponent,
		contentMode = "floating",
		colorMode
	} = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const { colors } = useTheme()

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
	const assetBgColor = useColorModeValue("white:alpha.90", "primaryDark.12:alpha.90", colorMode)
	const cardBgColor = useColorModeValue("white", "primaryDark.12", colorMode)
	const iconColor = useColorModeValue("white", "black", colorMode)

	const assetIsImage = (
		item?: React.ReactComponentElement<typeof Image> | ((props: SvgProps) => JSX.Element)
	): item is React.ReactComponentElement<typeof Image> => {
		if ((item as React.ReactComponentElement<typeof Image>).props?.source) return true

		return false
	}

	const getAsset = () => {
		if (!AssetComponent) return <></>
		const iconColorHex = ThemeHelper.getTokenHexValue(iconColor, colors)

		const variableHeight = contentMode === "floating" ? "72" : "48"

		if (assetIsImage(AssetComponent)) {
			return {
				...AssetComponent,
				props: {
					width: "full",
					height: "full",
					minHeight: variableHeight,
					resizeMode: "cover",
					...AssetComponent.props
				}
			}
		} else {
			const icon: JSX.Element = AssetComponent({
				width: 48,
				height: 48,
				color: iconColorHex
			})
			return (
				<VStack
					height={variableHeight}
					justifyContent="center"
					bg={containerBackgroundColor}>
					<Box
						paddingX={3}
						paddingY={"3.5"}
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

	const getHeader = (): JSX.Element => {
		return (
			<VStack justifyContent="center" p={3}>
				{{
					...TitleComponent,
					props: {
						...TitleComponent.props,
						fontSize: "lg",
						colorMode,
						width: "full"
					}
				}}
			</VStack>
		)
	}

	const getBadge = (): JSX.Element => {
		if (!BadgeComponent) return <></>

		return (
			<HStack position={"absolute"} top={3} right={3} justifyContent={"flex-end"}>
				{{
					...BadgeComponent,
					props: {
						size: "sm",
						...BadgeComponent.props,
						accentColor: accentColor,
						colorMode: assetIsImage(AssetComponent) ? "light" : colorMode
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
				backgroundColor={AssetComponent ? "none" : "initial"}
				{...styleProps}>
				{AssetComponent ? (
					<>
						{getAsset()}
						{getBadge()}
					</>
				) : null}
				<Box
					position={AssetComponent ? "absolute" : "initial"}
					bottom={0}
					padding={2}
					width="full">
					<Box borderRadius={8} bg={assetBgColor}>
						{getHeader()}
					</Box>
				</Box>
			</GradientBox>
		)
	}

	return (
		<Box
			borderRadius={8}
			style={{ shadowColor: "#00000024", shadowOffset: { width: 4, height: 4 } }}
			bg={cardBgColor}
			overflow="hidden">
			<VStack>
				{AssetComponent ? (
					<>
						{getAsset()}
						{getBadge()}
					</>
				) : null}
				{getHeader()}
			</VStack>
		</Box>
	)
}
