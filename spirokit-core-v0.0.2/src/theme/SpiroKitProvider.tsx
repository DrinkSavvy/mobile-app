import { INativebaseConfig, NativeBaseProvider } from "native-base"
import React from "react"
import { IExtendedTheme } from "./types"

type SpiroKitProviderProps = {
	theme: IExtendedTheme
}

const getConfig = (options: { gradients: boolean }): INativebaseConfig => {
	if (!options.gradients) {
		return {}
	}
	try {
		const expoLinearGradient = require("expo-linear-gradient").LinearGradient
		return {
			dependencies: {
				"linear-gradient": expoLinearGradient
			}
		}
	} catch (error) {
		console.info("expo-linear-gradient not available")
	}

	return {}
}

const SpiroKitProvider: React.FC<SpiroKitProviderProps> = (props) => {
	const { theme } = props

	const config = getConfig({
		gradients: theme.preferences?.gradients || false
	})

	return (
		<NativeBaseProvider theme={theme} config={config}>
			{props.children}
		</NativeBaseProvider>
	)
}

export { SpiroKitProvider }
