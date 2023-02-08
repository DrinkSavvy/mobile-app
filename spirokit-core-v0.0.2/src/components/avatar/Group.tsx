import React from "react"
import { Flex, usePropsResolution } from "native-base"
import Avatar from "./Avatar"
import { NBSpaceProps } from "../../theme/types"
import { useExtractSpaceProps } from "../../hooks"

export type GroupProps = NBSpaceProps & {
	children:
		| React.ReactComponentElement<typeof Avatar>[]
		| React.ReactComponentElement<typeof Avatar>
	size?: "sm" | "md" | "lg" | number
}

const getAvatarGroupChildren = (
	size: "sm" | "md" | "lg" | number,
	children?: JSX.Element[] | JSX.Element,
	space?: number,
	max?: number,
	plusAvatarBg?: string,
	props?: any
) => {
	let childrenArray: any = React.Children.toArray(children)
	let plusAvatars: number = 0
	if (max && max < childrenArray.length && max > 0) {
		plusAvatars = childrenArray.length - max
		childrenArray = childrenArray.slice(0, max)
	}
	const trailingChildren = childrenArray.slice(1)
	const defaultProps = {
		ml: space
	}
	return [
		plusAvatars > 0 ? (
			<Avatar size={size} bg={plusAvatarBg} ml={space} {...props}>
				{"+ " + plusAvatars}
			</Avatar>
		) : null,
		React.Children.map(trailingChildren.reverse(), (child: any, index: number) => {
			return React.cloneElement(
				child,
				{
					key: `avatar-group-child-${index}`,
					...props,
					...defaultProps,
					...child.props,
					size
				},
				child.props.children
			)
		}),
		React.cloneElement(
			childrenArray[0],
			{
				...props,
				...childrenArray[0].props,
				size
			},
			childrenArray[0].props.children
		)
	]
}

const Group = (props: GroupProps) => {
	const { children, size = "md" } = props

	const styleProps = {
		...useExtractSpaceProps(props)
	}

	const { borderColor, borderWidth, bg, space, max } = usePropsResolution("AvatarGroup", props)

	return (
		<Flex flexDirection="row-reverse" {...styleProps}>
			{getAvatarGroupChildren(size, children, space, max, bg, {
				borderColor,
				borderWidth
			})}
		</Flex>
	)
}

export default Group
