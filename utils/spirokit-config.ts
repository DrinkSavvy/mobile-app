import { Theme } from "@spirokit/core/typescript/theme/types"

export const SPIROKIT_CONFIG: Theme = {
  config: {
    colors: {
      primary: "orange",
      primaryGray: "warmGray",
    },
    fonts: {
      body: "Inter",
      heading: "Inter",
    },
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  resources: {
    fonts: {
      Inter: {
        light: {
          normal: "Inter_Light",
        },
        regular: {
          normal: "Inter",
        },
        medium: {
          normal: "Inter_Medium",
        },
        semiBold: {
          normal: "Inter_SemiBold",
        },
        bold: {
          normal: "Inter_Bold",
        },
        extraBold: {
          normal: "Inter_ExtraBold",
        },
      },
    },
  },
}
