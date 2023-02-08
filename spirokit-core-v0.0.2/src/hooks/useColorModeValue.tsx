import { ColorMode } from "native-base"
import { useColorModeValue as useColorModeValueNB } from "native-base"

export const useColorModeValue = (light: any, dark: any, colorMode?: ColorMode): any => {
	if (!colorMode) return useColorModeValueNB(light, dark)

	return colorMode === "light" ? light : dark
}
