import React from "react"
import { Image, Box, usePropsResolution } from "native-base"
import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native"
import { NBSpaceProps } from "src/theme/types"
import { useExtractSpaceProps } from "../../hooks"

export type AvatarProps = NBSpaceProps & {
	source: ImageSourcePropType
	size?: "sm" | "md" | "lg" | number
	children?: JSX.Element
}

const Avatar = (props: AvatarProps) => {
	const { size = "md" } = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const [error, setError] = React.useState(false)
	const { _text, source, style, ...resolvedProps } = usePropsResolution("Avatar", props)

	const remainingChildren: JSX.Element[] = []

	React.Children.map(props.children, (child) => {
		if (!child) return
		remainingChildren.push(child)
	})

	const getDynamicSize = (): number => {
		switch (size) {
			case "sm":
				return 22
			case "md":
				return 33
			case "lg":
				return 44
			default:
				return size
		}
	}

	const imageFitStyle: StyleProp<ImageStyle> = { height: "100%", width: "100%" }

	return (
		<Box {...resolvedProps} {...styleProps}>
			{source && !error ? (
				<Image
					width={getDynamicSize()}
					height={getDynamicSize()}
					borderRadius={resolvedProps.borderRadius}
					source={source}
					alt={"--"}
					_alt={_text}
					style={[style, imageFitStyle]}
					onError={() => {
						setError(true)
					}}
				/>
			) : (
				remainingChildren.length !== 0 && remainingChildren
			)}
		</Box>
	)
}

export default Avatar
