import { ColorMode } from "native-base"
import { ResponsiveValue } from "native-base/lib/typescript/components/types"

import {
	ISpiroKitColor,
	ISpiroKitFontSize,
	ISpiroKitFontWeight,
	ISpiroKitLetterSpacing,
	ISpiroKitLineHeight,
	NBFlexItemProps,
	NBLayoutProps,
	NBSpaceProps,
	NBTypographyProps
} from "../../theme/types"

export type TypographyProps = NBSpaceProps &
	NBLayoutProps &
	NBFlexItemProps &
	NBTypographyProps & {
		colorMode?: ColorMode
		color?: ISpiroKitColor
		accessibilityLabel?: string
		numberOfLines?: number
		fontSize?: ResponsiveValue<ISpiroKitFontSize | number | (string & {})>
		letterSpacing?: ResponsiveValue<ISpiroKitLetterSpacing | number | (string & {})>
		lineHeight?: ResponsiveValue<ISpiroKitLineHeight | number | (string & {})>
		fontWeight?: ResponsiveValue<ISpiroKitFontWeight | number | (string & {})>
	}
