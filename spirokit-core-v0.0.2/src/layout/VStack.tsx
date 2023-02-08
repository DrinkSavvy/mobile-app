import React from "react"
import { VStack as VStackNB } from "native-base"
import { VStackProps } from "./types"

const VStack: React.FC<VStackProps> = (props) => {
	return <VStackNB {...props}></VStackNB>
}

export default VStack
