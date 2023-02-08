import type { Properties as CSSProperties } from "csstype"
import { ColorMode, ITheme } from "native-base"
import { ResponsiveValue } from "native-base/lib/typescript/components/types"
import { ColorType } from "native-base/lib/typescript/components/types/utils"
import { Leaves } from "native-base/lib/typescript/theme/base/types"
import {
	layout as nbLayout,
	space as nbSpace,
	typography as nbTypography,
	flexbox as nbFlexbox
} from "native-base/lib/typescript/theme/styled-system"
import { space, typography, layout, flexItem } from "./tokens"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { colors, fontSizes, fontWeights, letterSpacings, lineHeights } from "./tokens"

export type ThemePreferences = {
	colors?: ColorPreferences
	fontConfig?: {}
	fonts?: {
		heading: string
		body: string
	}
	gradients?: boolean
	initialColorMode?: ColorMode
	useSystemColorMode?: boolean
}

export type AccentColor = "blue" | "orange" | "rose" | "amber" | "indigo" | "emerald" | "red"

export type ColorPreferences = {
	primary?: AccentColor | ColorValues
	primaryGray?: "warmGray" | "neutralGray" | "coolGray" | ColorValues
	primaryDark?: "warmDark" | "neutralDark" | "coolDark" | DarkColorValues
}

export type ColorValues = {
	100: string
	200: string
	300: string
	400: string
	500: string
	600: string
	700: string
	800: string
	900: string
}

export type DarkColorValues = {
	0: string
	1: string
	2: string
	3: string
	4: string
	6: string
	8: string
	12: string
	16: string
	24: string
}

export type ISpiroKitColor = Leaves<typeof colors>

export type ISpiroKitFontSize = keyof typeof fontSizes

export type ISpiroKitLetterSpacing = keyof typeof letterSpacings

export type ISpiroKitLineHeight = keyof typeof lineHeights

export type ISpiroKitFontWeight = keyof typeof fontWeights

export type IExtendedTheme = ITheme & { preferences?: { gradients?: boolean } }

type RNStyles = ViewStyle & ImageStyle & TextStyle

type GetThemeScaleValues<T extends keyof ITheme> = "colors" extends T
	? ColorType
	: ResponsiveValue<keyof ITheme[T] | (string & {}) | (number & {})>

type GetRNStyles<key, scale = null> = scale extends keyof ITheme
	? GetThemeScaleValues<scale>
	: key extends keyof CSSProperties
	? ResponsiveValue<CSSProperties[key]>
	: key extends keyof RNStyles
	? ResponsiveValue<RNStyles[key]>
	: unknown

type AllProps<T> = {
	[key in Extract<keyof T, string>]?: T[key] extends boolean
		? GetRNStyles<key>
		: key extends "shadow"
		? GetRNStyles<null, "shadows">
		: T[key] extends { property: any; scale: any }
		? GetRNStyles<T[key]["property"], T[key]["scale"]>
		: T[key] extends { properties: any; scale: any }
		? T[key]["properties"] extends { "0": string }
			? GetRNStyles<T[key]["properties"]["0"], T[key]["scale"]>
			: unknown
		: unknown
}

// StyleProps

type SpacePropsConfig = typeof nbSpace
type TypographyPropsConfig = typeof nbTypography
type LayoutPropsConfig = typeof nbLayout
type FlexboxPropsConfig = typeof nbFlexbox

export type NBSpaceProps = AllProps<Pick<SpacePropsConfig, typeof space[number]>>

export type NBLayoutProps = AllProps<Pick<LayoutPropsConfig, typeof layout[number]>>

export type NBTypographyProps = AllProps<Pick<TypographyPropsConfig, typeof typography[number]>>

export type NBFlexItemProps = AllProps<Pick<FlexboxPropsConfig, typeof flexItem[number]>>
