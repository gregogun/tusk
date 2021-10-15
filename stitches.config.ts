import { createStitches, PropertyValue, ScaleValue } from '@stitches/react';
import { blackA, whiteA, grayDark } from '@radix-ui/colors';
import type * as Stitches from '@stitches/react';

export const stitchesConfig = createStitches({
  theme: {
    colors: {
      black: blackA.blackA12,
      white: whiteA.whiteA12,
      accent: grayDark.gray1,
      gray: grayDark.gray7,
      darkGray: grayDark.gray3,
      lightGray: grayDark.gray10,
      gradient: 'linear-gradient(0deg, #f77062 0%, #fe5196 100%)',
    },
    fonts: {
      heading: 'PP Object Sans, apple-system, sans-serif',
      body: 'PP Object Sans, apple-system, sans-serif',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '24px',
      6: '32px',
      7: '40px',
      8: '64px',
      9: '96px',
      10: '128px',
      11: '256px',
      12: '512px',
    },
    sizes: {
      max: 'max-content',
      min: 'min-content',
      full: '100%',
      xs: '0.125rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
      '3xl': '3rem',
      '4xl': '4rem',
      '5xl': '5rem',
      '6xl': '6rem',
      '7xl': '8rem',
      '8xl': '16rem',
    },
    radii: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '24px',
      full: '9999px',
    },
    zIndices: {
      hide: -1,
      auto: 'auto',
      base: 0,
      docked: 10,
      dropdown: 1000,
      sticky: 1100,
      banner: 1200,
      overlay: 1300,
      modal: 1400,
      popover: 1500,
      skipLink: 1600,
      toast: 1700,
      tooltip: 1800,
    },
  },
  media: {
    dark: '(prefers-color-scheme: dark)',
    bp1: '(min-width: 280px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
    bp4: '(min-width: 1440px)',
  },
  utils: {
    p: (value: ScaleValue<'space'> | PropertyValue<'padding'>) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: ScaleValue<'space'> | PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: ScaleValue<'space'> | PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: ScaleValue<'space'> | PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: ScaleValue<'space'> | PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: ScaleValue<'space'> | PropertyValue<'paddingLeft' & 'paddingRight'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: ScaleValue<'space'> | PropertyValue<'paddingTop' & 'paddingBottom'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value: ScaleValue<'space'> | PropertyValue<'margin'>) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (value: ScaleValue<'space'>) => ({
      marginTop: value,
    }),
    mr: (value: ScaleValue<'space'>) => ({
      marginRight: value,
    }),
    mb: (value: ScaleValue<'space'>) => ({
      marginBottom: value,
    }),
    ml: (value: ScaleValue<'space'>) => ({
      marginLeft: value,
    }),
    mx: (value: ScaleValue<'space'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: ScaleValue<'space'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    boxSize: (value: ScaleValue<'sizes'>) => ({
      width: value,
      height: value,
    }),
    bg: (value: PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),
  },
});

export const globalStyles = stitchesConfig.globalCss({
  // Makes every element inherit box-sizing from the body
  '*, *::before, *::after': {
    boxSizing: 'inherit',
  },
  html: {
    minWidth: '360px',
    scrollBehavior: 'smooth',
    overflowX: 'hidden',
  },
  body: {
    boxSizing: 'border-box',
    backgroundColor: '$black',
    color: '$white',
    fontFamily: '$body',
    margin: 0,
  },
  '::selection': {
    backgroundColor: '$white',
    color: '$black',
  },
  '*:focus': {
    outline: '2px solid $white',
    outlineOffset: '2px',
  },
  svg: { display: 'inline-block', verticalAlign: 'middle' },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    textAlign: 'left',
    marginBottom: '4rem',
  },
  li: {
    listStyleType: 'none',
  },
});

globalStyles();

export const { styled, css, getCssText, keyframes, config } = stitchesConfig;

export type CSS = Stitches.CSS<typeof config>;
