import {
	IAspectRatioProps,
	IBoxProps,
	ICenterProps,
	IContainerProps,
	IFlexProps,
	IZStackProps
} from "native-base"
import { ILinearGradientProps } from "native-base/lib/typescript/components/primitives/Box/types"
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack"
import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack"
import { ResponsiveValue } from "native-base/lib/typescript/components/types"
import {
	ISpiroKitColor,
	ISpiroKitFontSize,
	ISpiroKitFontWeight,
	ISpiroKitLetterSpacing,
	ISpiroKitLineHeight
} from "../theme/types"

type ReplaceColors<Type> = Omit<
	Type,
	"backgroundColor" | "bg" | "background" | "bgColor" | "color"
> & {
	background?: ResponsiveValue<ISpiroKitColor | (string & {}) | ILinearGradientProps>
	backgroundColor?: ResponsiveValue<ISpiroKitColor | (string & {}) | ILinearGradientProps>
	color?: ResponsiveValue<ISpiroKitColor | (string & {})>
}

type ReplaceTypographyTokens<Type> = Omit<
	Type,
	"letterSpacing" | "fontSize" | "lineHeight" | "fontWeight"
> & {
	fontSize?: ResponsiveValue<ISpiroKitFontSize | number | (string & {})>
	letterSpacing?: ResponsiveValue<ISpiroKitLetterSpacing | number | (string & {})>
	lineHeight?: ResponsiveValue<ISpiroKitLineHeight | number | (string & {})>
	fontWeight?: ResponsiveValue<ISpiroKitFontWeight | number | (string & {})>
}

type RemoveShorthands<Type> = Omit<
	Type,
	| "bg"
	| "bgColor"
	| "m"
	| "mt"
	| "mr"
	| "mb"
	| "ml"
	| "mx"
	| "my"
	| "p"
	| "pt"
	| "pr"
	| "pb"
	| "pl"
	| "px"
	| "py"
	| "w"
	| "minW"
	| "maxW"
	| "h"
	| "minH"
	| "maxH"
	| "d"
	| "justify"
	| "wrap"
	| "direction"
	| "rounded"
	| "roundedTopLeft"
	| "roundedTopRight"
	| "roundedBottomRight"
	| "roundedBottomLeft"
	| "roundedTop"
	| "roundedRight"
	| "roundedBottom"
	| "roundedLeft"
	| "pos"
>

export type ApplySpirokitTokens<Type> = ReplaceTypographyTokens<
	ReplaceColors<RemoveShorthands<Type>>
>

export type BoxProps = ApplySpirokitTokens<IBoxProps> & { ref?: any }

export type VStackProps = ApplySpirokitTokens<IVStackProps> & { ref?: any }

export type HStackProps = ApplySpirokitTokens<IHStackProps> & { ref?: any }

export type ZStackProps = ApplySpirokitTokens<IZStackProps> & { ref?: any }

export type FlexProps = ApplySpirokitTokens<IFlexProps> & { ref?: any }

export type ContainerProps = ApplySpirokitTokens<IContainerProps> & { ref?: any }

export type AspectRatioProps = ApplySpirokitTokens<IAspectRatioProps> & { ref?: any }

export type CenterProps = ApplySpirokitTokens<ICenterProps> & { ref?: any }
