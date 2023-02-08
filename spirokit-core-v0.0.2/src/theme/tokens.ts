const colors = {
	white: "#FFFFFF",
	black: "#000000",
	warmGray: {
		100: "#F5F5F4",
		200: "#E7E5E4",
		300: "#D6D3D1",
		400: "#A8A29E",
		500: "#78716C",
		600: "#57534E",
		700: "#44403C",
		800: "#292524",
		900: "#1C1917"
	},
	neutralGray: {
		100: "#F4F4F5",
		200: "#E4E4E7",
		300: "#D4D4D8",
		400: "#A1A1AA",
		500: "#71717A",
		600: "#52525B",
		700: "#3F3F46",
		800: "#27272A",
		900: "#18181B"
	},
	coolGray: {
		100: "#F3F4F6",
		200: "#E5E7EB",
		300: "#D1D5DB",
		400: "#9CA3AF",
		500: "#6B7280",
		600: "#4B5563",
		700: "#374151",
		800: "#1F2937",
		900: "#111827"
	},
	blue: {
		100: "#DBEAFE",
		200: "#BFDBFE",
		300: "#93C5FD",
		400: "#60A5FA",
		500: "#3B82F6",
		600: "#2563EB",
		700: "#1D4ED8",
		800: "#1E40AF",
		900: "#1E3A8A"
	},
	orange: {
		100: "#FFEDD5",
		200: "#FED7AA",
		300: "#FDBA74",
		400: "#FB923C",
		500: "#F97316",
		600: "#EA580C",
		700: "#C2410C",
		800: "#9A3412",
		900: "#7C2D12"
	},
	rose: {
		100: "#FFE4E6",
		200: "#FECDD3",
		300: "#FDA4AF",
		400: "#FB7185",
		500: "#F43F5E",
		600: "#E11D48",
		700: "#BE123C",
		800: "#9F1239",
		900: "#881337"
	},
	amber: {
		100: "#FEF3C7",
		200: "#FDE68A",
		300: "#FCD34D",
		400: "#FBBF24",
		500: "#F59E0B",
		600: "#D97706",
		700: "#B45309",
		800: "#92400E",
		900: "#78350F"
	},
	indigo: {
		100: "#E0E7FF",
		200: "#C7D2FE",
		300: "#A5B4FC",
		400: "#818CF8",
		500: "#6366F1",
		600: "#4F46E5",
		700: "#4338CA",
		800: "#3730A3",
		900: "#312E81"
	},
	emerald: {
		100: "#D1FAE5",
		200: "#A7F3D0",
		300: "#6EE7B7",
		400: "#34D399",
		500: "#10B981",
		600: "#059669",
		700: "#047857",
		800: "#065F46",
		900: "#064E3B"
	},
	red: {
		100: "#FEE2E2",
		200: "#FECACA",
		300: "#FCA5A5",
		400: "#F87171",
		500: "#EF4444",
		600: "#E11D48",
		700: "#B91C1C",
		800: "#9F1239",
		900: "#7F1D1D"
	},
	primaryGray: {
		100: "#F4F4F5",
		200: "#E4E4E7",
		300: "#D4D4D8",
		400: "#A1A1AA",
		500: "#71717A",
		600: "#52525B",
		700: "#3F3F46",
		800: "#27272A",
		900: "#18181B"
	},
	primaryDark: {
		0: "#18181B",
		1: "#242427",
		2: "#28282B",
		3: "#2A2A2D",
		4: "#2D2D30",
		6: "#313134",
		8: "#343437",
		12: "#39393B",
		16: "#3A3A3D",
		24: "#3D3D40"
	},
	primary: {
		100: "#E0E7FF",
		200: "#C7D2FE",
		300: "#A5B4FC",
		400: "#818CF8",
		500: "#6366F1",
		600: "#4F46E5",
		700: "#4338CA",
		800: "#3730A3",
		900: "#312E81"
	},
	warmDark: {
		0: "#1C1917",
		1: "#282523",
		2: "#2C2927",
		3: "#2E2B29",
		4: "#302E2C",
		6: "#353230",
		8: "#383533",
		12: "#3C3938",
		16: "#3E3B3A",
		24: "#403E3C"
	},
	neutralDark: {
		0: "#18181B",
		1: "#242427",
		2: "#28282B",
		3: "#2A2A2D",
		4: "#2D2D30",
		6: "#313134",
		8: "#343437",
		12: "#39393B",
		16: "#3A3A3D",
		24: "#3D3D40"
	},
	coolDark: {
		0: "#111827",
		1: "#1D2432",
		2: "#222836",
		3: "#242A38",
		4: "#262D3A",
		6: "#2B313F",
		8: "#2E3441",
		12: "#333945",
		16: "#343A47",
		24: "#373D4A"
	}
}

const fontSizes = {
	xs: 10,
	sm: 12,
	md: 14,
	lg: 16,
	xl: 20,
	"2xl": 24,
	"3xl": 28,
	"4xl": 32
}

const letterSpacings = {
	xs: "-0.02em",
	sm: "-0.01em",
	md: 0,
	lg: "0.01em",
	xl: "0.02em",
	"2xl": "0.04em",
	"3xl": "0.08em"
}

const lineHeights = {
	"2xs": "1em",
	xs: "1.125em",
	sm: "1.25em",
	md: "1.375em",
	lg: "1.5em",
	xl: "1.75em",
	"2xl": "2.375em",
	"3xl": "2.5em",
	"4xl": "3em",
	"5xl": "4em"
}

const fontWeights = {
	light: 300,
	normal: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
	extrabold: 800
}

const space = [
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
] as const

const typography = [
	"fontFamily",
	"textAlign",
	"fontStyle",
	"wordBreak",
	"overflowWrap",
	"textOverflow",
	"textTransform",
	"whiteSpace",
	"textDecorationLine"
] as const

const flexItem = [
	"flex",
	"flexGrow",
	"flexShrink",
	"flexBasis",
	"justifySelf",
	"alignSelf",
	"order"
] as const

const layout = ["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight"] as const

export {
	colors,
	fontSizes,
	letterSpacings,
	lineHeights,
	fontWeights,
	space,
	layout,
	typography,
	flexItem
}
