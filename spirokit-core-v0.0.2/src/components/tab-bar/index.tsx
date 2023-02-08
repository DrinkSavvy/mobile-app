import TabBarDefault from "./TabBar"
import { TabBarComponentType } from "./types"
import Tab from "./Tab"

let TabBarTemp: any = TabBarDefault
TabBarTemp.Tab = Tab

const TabBar = TabBarTemp as TabBarComponentType

export { TabBar }

export type { TabBarComponentType }
