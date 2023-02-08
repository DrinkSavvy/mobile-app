import { Box, ColorMode, HStack, IBoxProps, useColorMode, VStack } from "native-base"
import React, { useEffect, useState } from "react"
import { SearchBox } from "../search-box"
import { Modal } from "../modal"
import { Subhead, TitleOne } from "../typography"
import { ListRenderItem } from "react-native"
import SelectInput from "./SelectInput"
import SelectModalBody from "./SelectModalBody"
import { AccentColor } from "../../theme"
import { useColorModeValue, useExtractSpaceProps } from "../../hooks"
import { NBSpaceProps } from "../../theme/types"

export type SelectProps<T extends { [key: string]: any }> = NBSpaceProps & {
	options: T[]
	ItemComponent: ListRenderItem<T>
	keyExtractor: (item: T, index: number) => string
	displayValueExtractor: (item: T) => string
	isDisabled?: boolean
	includeSearch?: boolean
	onClose?: () => void
	onSearchTermChanged?: (searchTerm: string) => void | T[] | Promise<T[]>
	onItemSelected?: (item?: T) => void
	onEndReached?: ((info: { distanceFromEnd: number }) => void) | null
	onEndReachedThreshold?: number
	error?: boolean
	success?: boolean
	required?: boolean
	placeholder?: string
	value?: T[keyof T]
	modalTitle?: string
	modalSubtitle?: string
	emptyResultsTitle?: string
	emptyResultsSubtitle?: string
	startSearchingTitle?: string
	startSearchingSubtitle?: string
	LabelComponent?: React.ReactComponentElement<typeof Subhead>
	colorMode?: ColorMode
	accentColor?: AccentColor
}

export const Select = <T extends { [key: string]: any }>(props: SelectProps<T>) => {
	const {
		isDisabled,
		error,
		success,
		options,
		onItemSelected,
		onClose,
		modalTitle = "Modal title",
		modalSubtitle = "Modal subtitle",
		required = false,
		includeSearch = true,
		placeholder = "Select..."
	} = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const [auxOptions, setAuxOptions] = useState<T[]>(options)
	const [isVisible, setIsVisible] = useState(false)
	const [searchIsFocused, setSearchIsFocused] = useState<boolean>(false)
	const [searchTerm, setSearchTerm] = useState<string>("")

	const [displayValue, setDisplayValue] = useState<string>("")
	const colorMode = props.colorMode || useColorMode().colorMode

	const searchContainerBg = useColorModeValue("primaryGray.200", "primaryDark.24", colorMode)
	const searchContainerBorderColor = useColorModeValue(
		"primaryGray.200",
		"primaryGray.600",
		colorMode
	)
	const asteriskTextColor = useColorModeValue("red.500", "red.300", colorMode)
	const searchBoxBg = useColorModeValue("white", "transparent", colorMode)

	const getSearchContainerStyles = (): IBoxProps => {
		return {
			backgroundColor: searchContainerBg,
			borderTopWidth: 1,
			borderTopColor: "primaryGray.600",
			borderBottomWidth: 1,
			borderBottomColor: searchContainerBorderColor
		}
	}

	const onSearchTermChanged = async (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm)

		if (!newSearchTerm) {
			setAuxOptions(options)
		}

		if (props.onSearchTermChanged) {
			const result = await props.onSearchTermChanged(newSearchTerm)
			if (result) {
				setAuxOptions(result)
				return
			}
		}

		const results = options.filter((option) => {
			const keys = Object.keys(option)
			for (const key of keys) {
				if (String(option[key]).toLowerCase().includes(newSearchTerm.toLowerCase())) {
					return true
				}
			}
			return false
		})
		setAuxOptions(results)
	}

	useEffect(() => {
		if (!isVisible) {
			onSearchTermChanged("")
			onClose && onClose()
		}
	}, [isVisible])

	useEffect(() => {
		setAuxOptions(options)
	}, [options])

	return (
		<VStack space={1} flex={1}>
			{props.LabelComponent ? (
				<HStack space={0.5}>
					{props.LabelComponent}
					{required && <Subhead color={asteriskTextColor}>*</Subhead>}
				</HStack>
			) : null}

			<Box>
				<SelectInput
					isDisabled={isDisabled}
					displayValue={displayValue}
					placeholder={placeholder}
					success={success}
					colorMode={colorMode}
					accentColor={props.accentColor}
					onInputCleared={() => {
						onItemSelected && onItemSelected()
						setDisplayValue("")
					}}
					onInputTapped={() => setIsVisible(true)}
					error={error}
					{...styleProps}></SelectInput>
			</Box>

			<Modal
				colorMode={colorMode}
				accentColor={props.accentColor}
				TitleComponent={<TitleOne>{modalTitle}</TitleOne>}
				SubtitleComponent={<Subhead>{modalSubtitle}</Subhead>}
				avoidKeyboard={searchIsFocused}
				_backdrop={{ bg: "primaryDark.1", opacity: 1 }}
				isOpen={isVisible}
				borderRadius={3}
				onClose={() => {
					setIsVisible(false)
					setSearchIsFocused(false)
				}}
				HeaderComponent={
					includeSearch ? (
						<Box padding={4} {...getSearchContainerStyles()}>
							<SearchBox
								colorMode={colorMode}
								accentColor={props.accentColor}
								onFocus={() => {
									setSearchIsFocused(true)
								}}
								onChangeText={onSearchTermChanged}
								backgroundColor={searchBoxBg}></SearchBox>
						</Box>
					) : (
						<></>
					)
				}
				BodyComponent={
					<SelectModalBody
						accentColor={props.accentColor}
						searchIsFocused={searchIsFocused}
						searchTerm={searchTerm}
						colorMode={colorMode}
						auxOptions={auxOptions}
						onItemPress={(item) => {
							setIsVisible(false)
							setSearchIsFocused(false)
							setAuxOptions(options)
							onItemSelected && onItemSelected(item)
							setDisplayValue(props.displayValueExtractor(item))
						}}
						{...props}
					/>
				}></Modal>
		</VStack>
	)
}
