import { extendTheme } from "native-base"
import { colors, fontSizes, fontWeights, letterSpacings, lineHeights } from "./tokens"
import { ColorPreferences, ColorValues, DarkColorValues, ThemePreferences } from "./types"

const SpiroKitTheme = {
	colors: colors,
	fontSizes: fontSizes,
	letterSpacings: letterSpacings,
	lineHeights: lineHeights,
	fontWeights: fontWeights
}

const defaultPreferences: ThemePreferences = {
	fontConfig: {
		Poppins: {
			400: {
				normal: "Poppins_400Regular"
			},
			500: {
				normal: "Poppins_500Medium"
			},
			600: {
				normal: "Poppins_600SemiBold"
			},
			700: {
				normal: "Poppins_700Bold"
			},
			800: {
				normal: "Poppins_800ExtraBold"
			},
			900: {
				normal: "Poppins_900Black"
			}
		}
	},
	fonts: {
		heading: "Poppins",
		body: "Poppins"
	},
	gradients: false,
	useSystemColorMode: true
}

const useSpiroKitTheme = (preferences: ThemePreferences = defaultPreferences) => {
	const {
		colors,
		fontConfig = defaultPreferences.fontConfig,
		fonts = defaultPreferences.fonts,
		gradients = defaultPreferences.gradients,
		initialColorMode,
		useSystemColorMode = defaultPreferences.useSystemColorMode
	} = preferences

	return extendTheme({
		colors: {
			...SpiroKitTheme.colors,
			primary: colors ? getPrimaryColor(colors) : SpiroKitTheme.colors["indigo"],
			primaryGray: colors ? getPrimaryGrayColor(colors) : SpiroKitTheme.colors["neutralGray"],
			primaryDark: colors ? getPrimaryDarkColor(colors) : SpiroKitTheme.colors["neutralDark"]
		},
		fontSizes: { ...SpiroKitTheme.fontSizes },
		letterSpacings: { ...SpiroKitTheme.letterSpacings },
		lineHeights: { ...SpiroKitTheme.lineHeights },
		fontWeights: { ...SpiroKitTheme.fontWeights },
		fontConfig,
		fonts,
		config: {
			initialColorMode,
			useSystemColorMode
		},
		preferences: {
			gradients
		}
	})
}

const getPrimaryColor = (colors: ColorPreferences): ColorValues => {
	if (!colors.primary) return SpiroKitTheme.colors["indigo"]

	if (typeof colors.primary === "string") {
		return SpiroKitTheme.colors[colors.primary]
	}

	return colors.primary
}

const getPrimaryGrayColor = (colors: ColorPreferences): ColorValues => {
	if (!colors.primaryGray) return SpiroKitTheme.colors["neutralGray"]

	if (typeof colors.primaryGray === "string") {
		return SpiroKitTheme.colors[colors.primaryGray]
	}

	return colors.primaryGray
}

const getPrimaryDarkColor = (colors: ColorPreferences): DarkColorValues => {
	if (!colors.primaryDark) return SpiroKitTheme.colors["neutralDark"]

	if (typeof colors.primaryDark === "string") {
		return SpiroKitTheme.colors[colors.primaryDark]
	}

	return colors.primaryDark
}

export { useSpiroKitTheme }
