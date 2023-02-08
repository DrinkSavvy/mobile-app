import { Box, HStack, VStack } from "native-base"
import { Body, TitleThree } from ".."
import { spacing } from "native-base/src/theme/base/space"
import React from "react"
import { useColorModeValue } from "../hooks"
import { useDarkMode } from "storybook-dark-mode"
import { Leaves } from "native-base/lib/typescript/theme/base/types"

type SpacingLeave = Leaves<typeof spacing>

const SpaceTokens: React.FC = () => {
	const colorMode = useDarkMode() ? "dark" : "light"

	const barColor = useColorModeValue("primary.500", "primary.300", colorMode)
	const separatorColor = useColorModeValue("primaryGray.300", "primaryGray.700", colorMode)

	return (
		<VStack space={4}>
			<HStack space={6} justifyContent={"space-between"}>
				<TitleThree width={20}>Value</TitleThree>
				<TitleThree width={20}>Pixels</TitleThree>
				<TitleThree flex={1}>Representation</TitleThree>
			</HStack>
			{Object.keys(spacing).map((key: string) => (
				<>
					<HStack space={6} justifyContent={"space-between"}>
						<Body width={20}>{key}</Body>
						<Body width={20}>{spacing[key as SpacingLeave]}</Body>
						<Box justifyContent={"center"} flex={1} w="full">
							<Box
								borderRadius={"md"}
								width={key}
								height={4}
								bgColor={barColor}></Box>
						</Box>
					</HStack>
					<Box height={0.5} bgColor={separatorColor}></Box>
				</>
			))}
		</VStack>
	)
}

export { SpaceTokens }
