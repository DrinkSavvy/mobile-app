import React from "react"
import { Container as ContainerNB } from "native-base"
import { ContainerProps } from "./types"

const Container: React.FC<ContainerProps> = (props) => {
	return <ContainerNB {...props}></ContainerNB>
}

export default Container
