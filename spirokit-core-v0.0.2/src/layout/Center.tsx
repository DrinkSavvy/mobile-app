import React from "react"
import { Center as CenterNB } from "native-base"
import { CenterProps } from "./types"

const Center: React.FC<CenterProps> = (props) => {
	return <CenterNB {...props}></CenterNB>
}

export default Center
