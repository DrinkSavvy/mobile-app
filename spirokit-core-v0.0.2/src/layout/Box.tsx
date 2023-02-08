import React from "react"
import { Box as BoxNB } from "native-base"
import { BoxProps } from "./types"

const Box: React.FC<BoxProps> = (props) => {
	return <BoxNB {...props}></BoxNB>
}

export default Box
