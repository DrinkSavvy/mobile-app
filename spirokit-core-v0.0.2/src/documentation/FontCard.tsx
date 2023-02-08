import { IFontWeight } from "native-base/lib/typescript/theme/base/typography"
import React from "react"
import { fontSizes, letterSpacings, lineHeights } from "../theme/tokens"
import { Leaves } from "native-base/lib/typescript/theme/base/types"
import { HStack, Text, VStack } from "native-base"
import { useColorModeValue } from "../../src/hooks"
import { SpiroKitProvider, useSpiroKitTheme } from "../../src/theme"
import { usePoppins } from "../../src/hooks/usePoppins"
import { useDarkMode } from "storybook-dark-mode"
import { Body } from ".."

type FontVariant = {
	name: string
	fontWeight: IFontWeight
}

const myTheme = useSpiroKitTheme()

export const FontCardList: React.FC = () => {
	const largeTitleFonts: FontVariant[] = [
		{
			name: "Large title/Extrabold",
			fontWeight: "extrabold"
		},
		{
			name: "Large title/Bold",
			fontWeight: "bold"
		},
		{
			name: "Large title/Semibold",
			fontWeight: "semibold"
		},
		{
			name: "Large title/Medium",
			fontWeight: "medium"
		}
	]

	const titleOneFonts: FontVariant[] = [
		{
			name: "Title One/Extrabold",
			fontWeight: "extrabold"
		},
		{
			name: "Title One/Bold",
			fontWeight: "bold"
		},
		{
			name: "Title One/Semibold",
			fontWeight: "semibold"
		},
		{
			name: "Title One/Medium",
			fontWeight: "medium"
		}
	]

	const titleTwoFonts: FontVariant[] = [
		{
			name: "Title Two/Bold",
			fontWeight: "bold"
		},
		{
			name: "Title Two/Semibold",
			fontWeight: "semibold"
		},
		{
			name: "Title Two/Medium",
			fontWeight: "medium"
		}
	]

	const titleThreeFonts: FontVariant[] = [
		{
			name: "Title Three/Bold",
			fontWeight: "bold"
		},
		{
			name: "Title Three/Semibold",
			fontWeight: "semibold"
		},
		{
			name: "Title Three/Medium",
			fontWeight: "medium"
		}
	]

	const bodyFonts: FontVariant[] = [
		{
			name: "Body/Bold",
			fontWeight: "bold"
		},
		{
			name: "Body/Medium",
			fontWeight: "medium"
		},
		{
			name: "Body/Normal",
			fontWeight: "normal"
		}
	]

	const subheadFonts: FontVariant[] = [
		{
			name: "Subhead/Medium",
			fontWeight: "medium"
		},
		{
			name: "Subhead/Normal",
			fontWeight: "normal"
		}
	]

	const footnoteFonts: FontVariant[] = [
		{
			name: "Footnote/Semibold",
			fontWeight: "semibold"
		},
		{
			name: "Footnote/Medium",
			fontWeight: "medium"
		},
		{
			name: "Footnote/Normal",
			fontWeight: "normal"
		}
	]

	const captionFonts: FontVariant[] = [
		{
			name: "Caption/Semibold",
			fontWeight: "semibold"
		},
		{
			name: "Caption/Medium",
			fontWeight: "medium"
		},
		{
			name: "Caption/Normal",
			fontWeight: "normal"
		}
	]

	usePoppins()

	return (
		<SpiroKitProvider theme={myTheme}>
			<VStack space={8}>
				<FontCard
					size={{ value: "4xl", displayName: "32 px" }}
					letterSpacing={{ value: "xs", displayName: "-0.02em" }}
					lineHeight={{ value: "lg", displayName: "1.5em" }}
					variants={largeTitleFonts}></FontCard>
				<FontCard
					size={{ value: "3xl", displayName: "28 px" }}
					letterSpacing={{ value: "md", displayName: "0em" }}
					lineHeight={{ value: "lg", displayName: "1.5em" }}
					variants={titleOneFonts}></FontCard>
				<FontCard
					space={2}
					size={{ value: "2xl", displayName: "24 px" }}
					letterSpacing={{ value: "md", displayName: "0em" }}
					lineHeight={{ value: "lg", displayName: "1.5em" }}
					variants={titleTwoFonts}></FontCard>
				<FontCard
					space={2}
					size={{ value: "xl", displayName: "20 px" }}
					letterSpacing={{ value: "md", displayName: "0em" }}
					lineHeight={{ value: "lg", displayName: "1.5em" }}
					variants={titleThreeFonts}></FontCard>
				<FontCard
					space={3}
					size={{ value: "lg", displayName: "16 px" }}
					letterSpacing={{ value: "lg", displayName: "0.01em" }}
					lineHeight={{ value: "sm", displayName: "1.25em" }}
					variants={bodyFonts}></FontCard>
				<FontCard
					space={3}
					size={{ value: "md", displayName: "14 px" }}
					letterSpacing={{ value: "2xl", displayName: "0.04em" }}
					lineHeight={{ value: "sm", displayName: "1.25em" }}
					variants={subheadFonts}></FontCard>
				<FontCard
					space={3}
					size={{ value: "sm", displayName: "12 px" }}
					letterSpacing={{ value: "xl", displayName: "0.02em" }}
					lineHeight={{ value: "sm", displayName: "1.25em" }}
					variants={footnoteFonts}></FontCard>
				<FontCard
					space={3}
					size={{ value: "xs", displayName: "10 px" }}
					letterSpacing={{ value: "lg", displayName: "0.01em" }}
					lineHeight={{ value: "sm", displayName: "1.25em" }}
					variants={captionFonts}></FontCard>
			</VStack>
		</SpiroKitProvider>
	)
}

type FontCardProps = {
	variants: FontVariant[]
	size: {
		value: Leaves<typeof fontSizes>
		displayName: string
	}
	lineHeight: {
		value: Leaves<typeof lineHeights>
		displayName: string
	}
	letterSpacing: {
		value: Leaves<typeof letterSpacings>
		displayName: string
	}
	space?: number
}
const FontCard: React.FC<FontCardProps> = (props) => {
	const { variants, size, lineHeight, letterSpacing, space = 0 } = props

	const colorMode = useDarkMode() ? "dark" : "light"
	const borderColor = useColorModeValue("primary.500", "primary.300", colorMode)
	const textColor = useColorModeValue("black", "white", colorMode)
	const bgColor = useColorModeValue("primaryGray.200", "primaryDark.1", colorMode)

	return (
		<VStack
			borderLeftWidth={6}
			bgColor={bgColor}
			borderColor={borderColor}
			paddingX={8}
			paddingY={4}>
			<HStack alignItems={"center"}>
				<VStack flex={1} space={space}>
					{variants.map((variant) => (
						<Text
							key={variant.name}
							color={textColor}
							fontSize={size.value}
							fontWeight={variant.fontWeight}
							lineHeight={lineHeight.value}
							letterSpacing={letterSpacing.value}>
							{variant.name}
						</Text>
					))}
				</VStack>

				<HStack flex={1} alignItems={"center"} space={8} justifyContent="center">
					<VStack space={3}>
						<Body color={textColor} fontWeight="bold">
							Font size
						</Body>
						<Body color={textColor} fontWeight="bold">
							Line height
						</Body>
						<Body color={textColor} fontWeight="bold">
							Letter spacing
						</Body>
					</VStack>
					<VStack space={3}>
						<Body color={textColor} fontWeight="light">
							{size.displayName}
						</Body>
						<Body color={textColor} fontWeight="light">
							{lineHeight.displayName}
						</Body>
						<Body color={textColor} fontWeight="light">
							{letterSpacing.displayName}
						</Body>
					</VStack>
				</HStack>
			</HStack>
		</VStack>
	)
}
