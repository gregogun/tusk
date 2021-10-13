import { css } from 'stitches.config';

export const textBaseSizes = {
  xs: {
    fontSize: '0.75rem',
  },
  sm: {
    fontSize: '0.875rem',
  },
  md: {
    fontSize: '1.125rem',
  },
  lg: {
    fontSize: '1.25rem',
  },
  xl: {
    fontSize: '1.5rem',
  },
  '2xl': {
    fontSize: '2.25rem',
  },
  '3xl': {
    fontSize: '2.5rem',
  },
  '4xl': {
    fontSize: '4rem',
  },
};

export const text = css({
  margin: 0,

  variants: {
    size: {
      ...textBaseSizes,
    },
    weight: {
      regular: {
        fontWeight: 400,
      },
      bold: {
        fontWeight: 700,
      },
    },
  },
  defaultVariants: {
    weight: 'regular',
  },
});
