import { ColorMode, HStack, useColorMode } from "native-base"
import React from "react"
import { useColorModeValue } from "../../hooks"
import { AccentColor } from "../../theme"
import Tab from "./Tab"

export type TabBarProps = {
	colorMode?: ColorMode
	accentColor?: AccentColor
	children?: React.ReactComponentElement<typeof Tab> | React.ReactComponentElement<typeof Tab>[]
}

const TabBar = (props: TabBarProps) => {
	const { accentColor, children } = props

	const colorMode = props.colorMode || useColorMode().colorMode

	const backgroundColor = useColorModeValue("primaryGray.100", "primaryDark.24", colorMode)

	const getTabBarChildren = (
		children:
			| React.ReactComponentElement<typeof Tab>
			| React.ReactComponentElement<typeof Tab>[]
			| undefined
	) => {
		const array = React.Children.toArray(children)
		return React.Children.map(array, (child: any) => {
			return React.cloneElement(child, {
				colorMode: child.props.colorMode || colorMode,
				accentColor: child.props.accentColor || accentColor
			})
		})
	}

	return (
		<HStack
			safeAreaBottom
			justifyContent={"space-around"}
			space={3}
			padding={2}
			backgroundColor={backgroundColor}>
			{getTabBarChildren(children)}
		</HStack>
	)
}

export default TabBar
