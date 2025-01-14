import sizes, { gr } from "@/styles/sizes";
import colors from "@/styles/colors";
import { createStitches } from "@stitches/react";
import fonts from "@/styles/fonts";
import media from "@/styles/media";

export type { VariantProps } from "@stitches/react";

export const { styled, keyframes } = createStitches({
  media: media,
  theme: {
    colors: { ...colors },
    fontSizes: {
      gr1: "0.611rem",
      gr2: "0.722rem",
      gr3: "0.833rem",
      gr4: "1rem",
      gr5: `1.177rem`,
      gr6: `1.318rem`,
      gr7: `calc(1rem * ${gr(1)})`,
      gr8: `calc(1rem * ${gr(2)})`,
      gr9: `calc(1rem * ${gr(3)})`,
    },
    fonts: { ...fonts },
    sizes: { ...sizes },
    space: { ...sizes },
    transitions: {
      all: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
  utils: {
    marginX: (value: number) => ({ marginLeft: value, marginRight: value }),
  },
});
