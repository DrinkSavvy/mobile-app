import React from "react"
import { Flex as FlexNB } from "native-base"
import { FlexProps } from "./types"

const Flex: React.FC<FlexProps> = (props) => {
	return <FlexNB {...props}></FlexNB>
}

export default Flex
