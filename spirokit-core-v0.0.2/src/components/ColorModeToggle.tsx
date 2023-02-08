import { useColorMode, Box } from "native-base"
import React, { useEffect } from "react"

type ColorModeToggleProps = {
	colorMode: string
}

const ColorModeToggle: React.FC<ColorModeToggleProps> = (props) => {
	const { setColorMode } = useColorMode()

	useEffect(() => {
		setColorMode(props.colorMode)
	}, [props.colorMode])

	return <Box padding={4}>{props.children}</Box>
}

export default ColorModeToggle
