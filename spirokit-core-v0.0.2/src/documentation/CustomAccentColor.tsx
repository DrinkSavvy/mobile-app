import { VStack } from "native-base"
import React from "react"
import { SpiroKitProvider } from "../theme/SpiroKitProvider"
import { useSpiroKitTheme } from "../theme/useSpiroKitTheme"
import { Footnote } from "../components/typography/footnote"
import { Subhead } from "../components/typography/subhead"
import { Button } from "../components/button"
import { Avatar } from "../components/avatar"
import { Badge } from "../components/badge"
import { HorizontalCard } from "../components/horizontal-card"
import { TitleThree } from "../components/typography/title-three"
import { useDarkMode } from "storybook-dark-mode"
import { AcademicCapIcon } from "react-native-heroicons/outline"

const myTheme = useSpiroKitTheme({
	colors: {
		primary: {
			100: "#c3dbef",
			200: "#a0c2de",
			300: "#7ca9ce",
			400: "#5a91bf",
			500: "#4077a5",
			600: "#305d82",
			700: "#20425e",
			800: "#0d283b",
			900: "#000e1a"
		},
		primaryGray: "warmGray"
	}
})

const CustomAccentColor: React.FC = () => {
	const colorMode = useDarkMode() ? "dark" : "light"

	return (
		<SpiroKitProvider theme={myTheme}>
			<VStack space={4} width={375}>
				<Button colorMode={colorMode}>Tap</Button>
				<HorizontalCard
					colorMode={colorMode}
					AssetRightComponent={AcademicCapIcon}
					DescriptionComponent={<Subhead>Lorem ipsum</Subhead>}
					userName="Mauro Garcia"
					UserAvatarComponent={
						<Avatar
							source={{
								uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
							}}></Avatar>
					}
					DateComponent={<Footnote>12/12/2022</Footnote>}
					BadgeComponent={<Badge>Hello</Badge>}
					TitleComponent={<TitleThree>Hello card</TitleThree>}></HorizontalCard>
			</VStack>
		</SpiroKitProvider>
	)
}

export { CustomAccentColor }
