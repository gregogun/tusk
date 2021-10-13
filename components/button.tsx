import { css } from 'stitches.config';

export const button = css({
  // resets
  cursor: 'pointer',
  background: 'transparent',
  border: 0,
  borderRadius: '10px',
  transitionDuration: '300ms',
  color: '$white',
  textDecoration: 'none',

  variants: {
    variant: {
      solid: {
        backgroundColor: '$gray',
        '&:hover': {
          backgroundColor: '$accent',
        },
      },
      brandSolid: {
        backgroundColor: '$gradient',
      },
      outline: {
        boxShadow: '0 0 0 1px var(--colors-gray)',
      },
      brandOutline: {
        // locally scoped tokens
        // change innerBorder value and outer one will scale with it as long as thickness is above 1px, otherwise change right value in outerBorder calc func to be 1px
        $$innerBorder: '10px',
        $$outerBorder: 'calc($$innerBorder + 2px)',
        $$thickness: '2px',

        backgroundColor: '#171717',
        position: 'relative',
        borderRadius: '$$innerBorder',

        '&::before': {
          backgroundImage: '$gradient',
          content: `''`,
          display: 'block',
          position: 'absolute',
          top: '-$$thickness',
          left: '-$$thickness',
          width: 'calc(100% +  ($$thickness * 2))',
          height: 'calc(100% +  ($$thickness * 2))',
          borderRadius: '$$outerBorder',
          zIndex: -1,
        },

        '&:hover': {
          backgroundColor: '#232323',
        },
      },
      ghost: {
        background: 'transparent',
        border: 0,

        '&:hover': {
          boxShadow: '0 0 0 1px $colors$gray',
        },
      },
    },
    size: {
      md: {
        fontSize: '1.125rem',
        padding: '$3 $6',
      },
      lg: {
        fontSize: '1.25rem',
        padding: '$4 $5',
        minWidth: '160px',
      },
      icon: {
        padding: '$2 $2',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
});
