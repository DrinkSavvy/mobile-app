import { themeTools } from "native-base"

import { NBSpaceProps, NBTypographyProps, NBLayoutProps, NBFlexItemProps } from "../theme/types"

export const useExtractSpaceProps = (props: any): NBSpaceProps => {
	const [spaceProps, _] = themeTools.extractInObject(props, tokens["space"])
	return spaceProps
}

export const useExtractTypographyProps = (props: any): NBTypographyProps => {
	const [typographyProps, _] = themeTools.extractInObject(props, tokens["typography"])
	return typographyProps
}

export const useExtractLayoutProps = (props: any): NBLayoutProps => {
	const [typographyProps, _] = themeTools.extractInObject(props, tokens["layout"])
	return typographyProps
}

export const useExtractFlexItemProps = (props: any): NBFlexItemProps => {
	const [flexItemProps, _] = themeTools.extractInObject(props, tokens["flexItem"])
	return flexItemProps
}

const tokens: { [key: string]: string[] } = {
	space: [
		"margin",
		"marginRight",
		"marginLeft",
		"marginTop",
		"marginBottom",
		"marginX",
		"marginY",
		"padding",
		"paddingRight",
		"paddingLeft",
		"paddingTop",
		"paddingBottom",
		"paddingX",
		"paddingY"
	],
	typography: [
		"color",
		"fontFamily",
		"fontSize",
		"fontWeight",
		"lineHeight",
		"letterSpacing",
		"textAlign",
		"fontStyle",
		"wordBreak",
		"overflowWrap",
		"textOverflow",
		"textTransform",
		"whiteSpace",
		"textDecorationLine"
	],
	layout: ["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight"],
	flexItem: ["flex", "flexGrow", "flexShrink", "flexBasis", "justifySelf", "alignSelf", "order"]
}
