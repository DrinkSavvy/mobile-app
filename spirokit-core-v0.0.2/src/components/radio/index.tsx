import RadioDefault from "./Radio"
import { Group } from "./Group"
import { RadioComponentType } from "./types"

let RadioTemp: any = RadioDefault
RadioTemp.Group = Group

const Radio = RadioTemp as RadioComponentType

export { Radio }

export type { RadioComponentType }
