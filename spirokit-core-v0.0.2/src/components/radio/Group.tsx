import { Radio as RadioNB, useColorMode } from "native-base"
import React from "react"
import { useExtractSpaceProps } from "../../hooks"
import { RadioGroupProps } from "./types"

export const getRadioSize = (size: "sm" | "md" | "lg"): number => {
	switch (size) {
		case "sm":
			return 4
		case "lg":
			return 8
		default:
			return 6
	}
}

const Group = (props: RadioGroupProps) => {
	const { children, accentColor, size = "md", space = 4, ...otherProps } = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const colorMode = props.colorMode || useColorMode().colorMode

	const radioSize: number = React.useMemo(() => getRadioSize(size), [size])

	const getGroupChildren = () =>
		React.useMemo(() => {
			const array = React.Children.toArray(children)
			return React.Children.map(array, (child: any) => {
				return React.cloneElement(child, {
					size: child.props.size || size,
					accentColor: child.props.accentColor || accentColor,
					colorMode: child.props.colorMode || colorMode
				})
			})
		}, [colorMode])

	return (
		<RadioNB.Group
			{...styleProps}
			colorScheme={accentColor}
			size={radioSize}
			space={space}
			{...otherProps}>
			{getGroupChildren()}
		</RadioNB.Group>
	)
}

export { Group }
