import React from "react"
import { Radio as RadioNB } from "native-base"
import { RadioProps } from "./types"
import { getRadioSize } from "./Group"
import { Subhead } from "../typography/subhead"
import { useColorModeValue } from "../../hooks"

const Radio = (props: RadioProps) => {
	const {
		size = "md",
		children,
		space = 3,
		colorMode,
		isFocusVisible = props.isFocused,
		...otherProps
	} = props
	const radioSize: number = React.useMemo(() => getRadioSize(size), [size])

	const accentColor = props.accentColor || "primary"
	const color = useColorModeValue(`${accentColor}.700`, `${accentColor}.300`, colorMode)
	const hoveredColor = useColorModeValue(`${accentColor}.500`, `${accentColor}.400`, colorMode)

	return (
		<RadioNB
			isFocusVisible={isFocusVisible}
			_icon={{
				color: color,
				borderColor: color
			}}
			backgroundColor="transparent"
			_checked={{
				borderColor: color
			}}
			_hover={{
				borderColor: hoveredColor
			}}
			_interactionBox={{ bgColor: "amber.700" }}
			borderColor={color}
			size={radioSize}
			{...otherProps}>
			{children ? (
				<Subhead colorMode={colorMode} paddingLeft={space}>
					{children}
				</Subhead>
			) : null}
		</RadioNB>
	)
}

export default Radio
