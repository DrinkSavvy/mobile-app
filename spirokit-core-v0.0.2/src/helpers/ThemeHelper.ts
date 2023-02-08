export class ThemeHelper {
	/**
	 *
	 * @param name The name of the token you want to get the hex value. E.g.: "primary-500"
	 * @param source The theme object where the token will be obtained from. E.g.: "colors"
	 */
	static getTokenHexValue = (name: string, source: any): string => {
		const path = name.split(".")
		let buffer = source
		for (const element of path) {
			buffer = buffer[element]
		}
		return buffer
	}
}
