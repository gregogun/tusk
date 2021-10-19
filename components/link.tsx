import { css } from 'stitches.config';
import { button } from './button';

export const link = css({
  variants: {
    type: {
      line: {
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        color: 'inherit',
        boxShadow: '0px 1px 0px 0px $colors$gray',
        transition: 'all 200ms linear 0ms',
        fontWeight: 'bold',
        textDecoration: 'none',

        '&:hover': {
          color: '$gray',
          transition: 'all 200ms linear 0ms',
        },
      },
      noLine: {
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        color: 'inherit',
        transition: 'all 200ms linear 0ms',
        fontWeight: 'bold',
        textDecoration: 'none',

        '&:hover': {
          color: '$gray',
          transition: 'all 200ms linear 0ms',
        },
      },
      ghost: {
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        color: 'inherit',
        transition: 'all 200ms linear 0ms',
        fontWeight: 'bold',
        textDecoration: 'none',
      },
    },
  },

  defaultVariants: {
    type: 'line',
  },
});

export const linkButton = css({
  ...button,
});
