import { TabBarProps } from "./TabBar"
import { TabProps } from "./Tab"

export type TabBarComponentType = ((props: TabBarProps) => JSX.Element) & {
	Tab: (props: TabProps) => JSX.Element
}
