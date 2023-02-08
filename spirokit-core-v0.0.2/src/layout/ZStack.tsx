import React from "react"
import { ZStack as ZStackNB } from "native-base"
import { ZStackProps } from "./types"

const ZStack: React.FC<ZStackProps> = (props) => {
	return <ZStackNB {...props}></ZStackNB>
}

export default ZStack
