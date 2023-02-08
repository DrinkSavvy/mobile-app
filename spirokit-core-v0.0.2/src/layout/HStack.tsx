import React from "react"
import { HStack as HStackNB } from "native-base"
import { HStackProps } from "./types"

const HStack: React.FC<HStackProps> = (props) => {
	return <HStackNB {...props}></HStackNB>
}

export default HStack
