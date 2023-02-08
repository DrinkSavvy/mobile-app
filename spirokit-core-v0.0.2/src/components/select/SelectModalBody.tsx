import React, { useState } from "react"
import { Box, useColorMode, useToken, FlatList, Pressable, ColorMode } from "native-base"
import { Dimensions, ListRenderItem, Platform } from "react-native"
import { EmojiSadIcon, SearchIcon } from "react-native-heroicons/outline"
import { GradientBox } from "../gradient-box"
import { Body, TitleOne } from "../typography"
import { AccentColor } from "../../theme"
import { useColorModeValue } from "../../hooks"

type ModalBodyProps<T> = {
	searchIsFocused: boolean
	searchTerm: string
	auxOptions: T[]
	onItemPress: (item: any) => void
	ItemComponent: ListRenderItem<T>
	keyExtractor: (item: T, index: number) => string
	startSearchingTitle?: string
	startSearchingSubtitle?: string
	emptyResultsTitle?: string
	emptyResultsSubtitle?: string
	onEndReachedThreshold?: number
	onEndReached?: ((info: { distanceFromEnd: number }) => void) | null
	colorMode?: ColorMode
	accentColor?: AccentColor
}

const SelectModalBody = <T,>(props: ModalBodyProps<T>) => {
	const {
		searchIsFocused,
		searchTerm,
		auxOptions,
		onItemPress,
		ItemComponent,
		keyExtractor,
		onEndReached,
		emptyResultsTitle = "No results",
		emptyResultsSubtitle = "Please try another search term",
		startSearchingTitle = "Search",
		startSearchingSubtitle = "Enter a search term",
		onEndReachedThreshold = 0.1
	} = props

	const colorMode = props.colorMode || useColorMode().colorMode
	const accentColor = props.accentColor || "primary"
	const iconSize = Math.floor(Dimensions.get("window").width * 0.8 * 0.2)
	const [iconSizeForWeb, setIconSizeForWeb] = useState<number>(0)
	const [primaryDark24] = useToken("colors", ["primaryDark.24"])
	const titleColor = useColorModeValue("primaryGray.700", "white", colorMode)
	const bodyColor = useColorModeValue("primaryGray.500", "primaryGray.300", colorMode)
	const searchContainerBg = useColorModeValue("white", "primaryDark.24", colorMode)
	const [firstRender, setFirstRender] = useState<boolean>(true)

	const getSearchIcon = (): JSX.Element => {
		if (colorMode === "light") {
			return (
				<GradientBox
					accentColor={props.accentColor}
					padding={4}
					borderRadius={Platform.OS === "web" ? "full" : (iconSize + 16) / 2}
					marginBottom="2.5">
					<SearchIcon
						width={Platform.OS === "web" ? iconSizeForWeb : iconSize - 16}
						height={Platform.OS === "web" ? iconSizeForWeb : iconSize - 16}
						strokeWidth={3}
						color="white"></SearchIcon>
				</GradientBox>
			)
		}

		return (
			<Box
				borderRadius={Platform.OS === "web" ? "full" : (iconSize + 16) / 2}
				backgroundColor={`${accentColor}.300`}
				padding={4}
				marginBottom="2.5">
				<SearchIcon
					width={Platform.OS === "web" ? iconSizeForWeb : iconSize - 16}
					height={Platform.OS === "web" ? iconSizeForWeb : iconSize - 16}
					strokeWidth={3}
					color={primaryDark24}></SearchIcon>
			</Box>
		)
	}

	const getNotFoundIcon = (): JSX.Element => {
		if (colorMode === "light") {
			return (
				<GradientBox
					accentColor={props.accentColor}
					borderRadius={Platform.OS === "web" ? "full" : (iconSize + 16) / 2}
					padding={4}
					marginBottom="2.5">
					<EmojiSadIcon
						width={Platform.OS === "web" ? iconSizeForWeb : iconSize - 16}
						height={Platform.OS === "web" ? iconSizeForWeb : iconSize - 16}
						strokeWidth={3}
						color="white"></EmojiSadIcon>
				</GradientBox>
			)
		}

		return (
			<Box
				borderRadius={Platform.OS === "web" ? "full" : (iconSize + 16) / 2}
				backgroundColor={`${accentColor}.300`}
				padding={4}
				marginBottom="2.5">
				<EmojiSadIcon
					width={Platform.OS === "web" ? iconSizeForWeb : iconSize - 16}
					height={Platform.OS === "web" ? iconSizeForWeb : iconSize - 16}
					strokeWidth={3}
					color={primaryDark24}></EmojiSadIcon>
			</Box>
		)
	}

	if (searchIsFocused && searchTerm.length === 0) {
		return (
			<Box paddingY={8} justifyContent="center" alignItems="center" bg={searchContainerBg}>
				<Box
					onLayout={(event) =>
						setIconSizeForWeb(event.nativeEvent.layout.width * 0.8 * 0.2)
					}
					alignItems="center"
					width="60%"
					justifyContent="center">
					{getSearchIcon()}
					<TitleOne fontWeight="semibold" textAlign="center" color={titleColor}>
						{startSearchingTitle}
					</TitleOne>
					<Body textAlign="center" color={bodyColor}>
						{startSearchingSubtitle}
					</Body>
				</Box>
			</Box>
		)
	}

	if (searchIsFocused && searchTerm.length > 0 && auxOptions.length === 0) {
		return (
			<Box paddingY={8} justifyContent="center" alignItems="center" bg={searchContainerBg}>
				<Box
					onLayout={(event) =>
						setIconSizeForWeb(event.nativeEvent.layout.width * 0.8 * 0.2)
					}
					alignItems="center"
					width="60%"
					justifyContent="center">
					{getNotFoundIcon()}
					<TitleOne fontWeight="semibold" textAlign="center" color={titleColor}>
						{emptyResultsTitle}
					</TitleOne>
					<Body textAlign="center" color={bodyColor}>
						{emptyResultsSubtitle}
					</Body>
				</Box>
			</Box>
		)
	}

	return (
		<FlatList
			data={auxOptions}
			contentContainerStyle={{
				backgroundColor: searchContainerBg
			}}
			renderItem={(info) => {
				return (
					<Pressable
						key={info.index}
						onPress={() => {
							onItemPress(info.item)
						}}>
						<Box backgroundColor="transparent">
							<ItemComponent {...info}></ItemComponent>
						</Box>
					</Pressable>
				)
			}}
			keyExtractor={keyExtractor}
			onEndReachedThreshold={onEndReachedThreshold}
			onEndReached={(info) => {
				if (firstRender) {
					setFirstRender(false)
					return
				}
				info.distanceFromEnd > 0 && onEndReached && onEndReached(info)
			}}></FlatList>
	)
}

export default SelectModalBody
