import { AvatarProps } from "./Avatar"
import { GroupProps } from "./Group"

export type AvatarComponentType = React.FC<AvatarProps> & {
	Group: (props: GroupProps) => JSX.Element
}
