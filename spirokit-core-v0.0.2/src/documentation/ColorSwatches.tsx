import { Box, ColorMode, HStack, VStack } from "native-base"
import React from "react"
import { SpiroKitProvider } from "../theme/SpiroKitProvider"
import { useSpiroKitTheme } from "../theme/useSpiroKitTheme"
import { Footnote } from "../components/typography/footnote"
import { TitleThree } from "../components/typography/title-three"
import { usePoppins } from "../hooks/usePoppins"
import { useDarkMode } from "storybook-dark-mode"

type ColorSwatchProps = {
	name: string
	internalName: string
	colors: { key: number; value: string }[]
	colorMode?: ColorMode
}

const ColorSwatch: React.FC<ColorSwatchProps> = (props) => {
	const { name, internalName, colors, colorMode } = props

	return (
		<VStack space={2}>
			<TitleThree colorMode={colorMode}>{name}</TitleThree>
			<HStack space={3} flexWrap="wrap">
				{colors.map((color) => (
					<VStack marginBottom={6} key={color.value}>
						<Box
							borderRadius={"lg"}
							h={24}
							w={"full"}
							minW={20}
							bgColor={color.value}></Box>
						<Footnote
							fontWeight={"bold"}
							marginBottom={2}
							paddingX={1}
							paddingTop={2}
							colorMode={colorMode}>
							{internalName}.{color.key}
						</Footnote>
						<Footnote paddingX={2} colorMode={colorMode}>
							{color.value}
						</Footnote>
					</VStack>
				))}
			</HStack>
		</VStack>
	)
}

const myTheme = useSpiroKitTheme()

const AccentColorSwatches: React.FC = () => {
	const colorMode = useDarkMode() ? "dark" : "light"

	return (
		<VStack space={4}>
			<ColorSwatch
				internalName="indigo"
				name="Indigo"
				colorMode={colorMode}
				colors={[
					{ key: 100, value: "#E0E7FF" },
					{ key: 200, value: "#C7D2FE" },
					{ key: 300, value: "#A5B4FC" },
					{ key: 400, value: "#818CF8" },
					{ key: 500, value: "#6366F1" },
					{ key: 600, value: "#4F46E5" },
					{ key: 700, value: "#4338CA" },
					{ key: 800, value: "#3730A3" },
					{ key: 900, value: "#312E81" }
				]}></ColorSwatch>

			<ColorSwatch
				internalName="emerald"
				name="Emerald"
				colorMode={colorMode}
				colors={[
					{ key: 100, value: "#D1FAE5" },
					{ key: 200, value: "#A7F3D0" },
					{ key: 300, value: "#6EE7B7" },
					{ key: 400, value: "#34D399" },
					{ key: 500, value: "#10B981" },
					{ key: 600, value: "#059669" },
					{ key: 700, value: "#047857" },
					{ key: 800, value: "#065F46" },
					{ key: 900, value: "#064E3B" }
				]}></ColorSwatch>

			<ColorSwatch
				internalName="red"
				name="Red"
				colorMode={colorMode}
				colors={[
					{ key: 100, value: "#FEE2E2" },
					{ key: 200, value: "#FECACA" },
					{ key: 300, value: "#FCA5A5" },
					{ key: 400, value: "#F87171" },
					{ key: 500, value: "#EF4444" },
					{ key: 600, value: "#E11D48" },
					{ key: 700, value: "#B91C1C" },
					{ key: 800, value: "#9F1239" },
					{ key: 900, value: "#7F1D1D" }
				]}></ColorSwatch>

			<ColorSwatch
				internalName="blue"
				name="Blue"
				colorMode={colorMode}
				colors={[
					{ key: 100, value: "#DBEAFE" },
					{ key: 200, value: "#BFDBFE" },
					{ key: 300, value: "#93C5FD" },
					{ key: 400, value: "#60A5FA" },
					{ key: 500, value: "#3B82F6" },
					{ key: 600, value: "#2563EB" },
					{ key: 700, value: "#1D4ED8" },
					{ key: 800, value: "#1E40AF" },
					{ key: 900, value: "#1E3A8A" }
				]}></ColorSwatch>

			<ColorSwatch
				internalName="rose"
				name="Rose"
				colorMode={colorMode}
				colors={[
					{ key: 100, value: "#FFE4E6" },
					{ key: 200, value: "#FECDD3" },
					{ key: 300, value: "#FDA4AF" },
					{ key: 400, value: "#FB7185" },
					{ key: 500, value: "#F43F5E" },
					{ key: 600, value: "#E11D48" },
					{ key: 700, value: "#BE123C" },
					{ key: 800, value: "#9F1239" },
					{ key: 900, value: "#881337" }
				]}></ColorSwatch>

			<ColorSwatch
				internalName="amber"
				name="Amber"
				colorMode={colorMode}
				colors={[
					{ key: 100, value: "#FEF3C7" },
					{ key: 200, value: "#FDE68A" },
					{ key: 300, value: "#FCD34D" },
					{ key: 400, value: "#FBBF24" },
					{ key: 500, value: "#F59E0B" },
					{ key: 600, value: "#D97706" },
					{ key: 700, value: "#B45309" },
					{ key: 800, value: "#92400E" },
					{ key: 900, value: "#78350F" }
				]}></ColorSwatch>

			<ColorSwatch
				internalName="orange"
				name="Orange"
				colorMode={colorMode}
				colors={[
					{ key: 100, value: "#FFEDD5" },
					{ key: 200, value: "#FED7AA" },
					{ key: 300, value: "#FDBA74" },
					{ key: 400, value: "#FB923C" },
					{ key: 500, value: "#F97316" },
					{ key: 600, value: "#EA580C" },
					{ key: 700, value: "#C2410C" },
					{ key: 800, value: "#9A3412" },
					{ key: 900, value: "#7C2D12" }
				]}></ColorSwatch>
		</VStack>
	)
}

const GrayColorSwatches: React.FC = () => {
	usePoppins()
	const colorMode = useDarkMode() ? "dark" : "light"

	return (
		<SpiroKitProvider theme={myTheme}>
			<VStack space={4}>
				<ColorSwatch
					internalName="coolGray"
					name="Cool gray"
					colorMode={colorMode}
					colors={[
						{ key: 100, value: "#F3F4F6" },
						{ key: 200, value: "#E5E7EB" },
						{ key: 300, value: "#D1D5DB" },
						{ key: 400, value: "#9CA3AF" },
						{ key: 500, value: "#6B7280" },
						{ key: 600, value: "#4B5563" },
						{ key: 700, value: "#374151" },
						{ key: 800, value: "#1F2937" },
						{ key: 900, value: "#111827" }
					]}></ColorSwatch>

				<ColorSwatch
					internalName="neutralGray"
					name="Neutral gray"
					colorMode={colorMode}
					colors={[
						{ key: 100, value: "#F4F4F5" },
						{ key: 200, value: "#E4E4E7" },
						{ key: 300, value: "#D4D4D8" },
						{ key: 400, value: "#A1A1AA" },
						{ key: 500, value: "#71717A" },
						{ key: 600, value: "#52525B" },
						{ key: 700, value: "#3F3F46" },
						{ key: 800, value: "#27272A" },
						{ key: 900, value: "#18181B" }
					]}></ColorSwatch>

				<ColorSwatch
					internalName="warmGray"
					name="Warm gray"
					colorMode={colorMode}
					colors={[
						{ key: 100, value: "#F5F5F4" },
						{ key: 200, value: "#E7E5E4" },
						{ key: 300, value: "#D6D3D1" },
						{ key: 400, value: "#A8A29E" },
						{ key: 500, value: "#78716C" },
						{ key: 600, value: "#57534E" },
						{ key: 700, value: "#44403C" },
						{ key: 800, value: "#292524" },
						{ key: 900, value: "#1C1917" }
					]}></ColorSwatch>
			</VStack>
		</SpiroKitProvider>
	)
}

export { AccentColorSwatches, GrayColorSwatches }
