import AvatarDefault from "./Avatar"
import AvatarGroup from "./Group"
import { AvatarComponentType } from "./types"

let AvatarTemp: any = AvatarDefault
AvatarTemp.Group = AvatarGroup

const Avatar = AvatarTemp as AvatarComponentType

export { Avatar }

export type { AvatarComponentType }
