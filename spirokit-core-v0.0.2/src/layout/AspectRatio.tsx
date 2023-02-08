import React from "react"
import { AspectRatio as AspectRatioNB } from "native-base"
import { AspectRatioProps } from "./types"

const AspectRatio: React.FC<AspectRatioProps> = (props) => {
	return <AspectRatioNB {...props}></AspectRatioNB>
}

export default AspectRatio
