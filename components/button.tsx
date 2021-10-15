import { css, styled } from 'stitches.config';

export const button = css({
  // resets
  cursor: 'pointer',
  background: 'transparent',
  border: 0,
  transitionDuration: '500ms',
  color: '$white',
  textDecoration: 'none',

  variants: {
    variant: {
      solid: {
        backgroundColor: '$gray',
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: '$accent',
        },
      },
      brandSolid: {
        borderRadius: '10px',
        backgroundColor: '$gradient',
      },
      outline: {
        borderRadius: '10px',
        boxShadow: '0 0 0 1px var(--colors-gray)',
        '&:hover': {
          boxShadow: '0 0 0 1px var(--colors-lightGray)',
        },
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
          backgroundColor: '#191919',
        },
      },
      ghost: {
        background: 'transparent',
        border: 0,

        '&:hover': {
          boxShadow: '0 0 0 1px $colors$gray',
        },
      },
      unstyled: {
        padding: 0,
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
      fullMd: {
        fontSize: '1.125rem',
        padding: '$3 $6',
        width: '100%',
      },
      fullLg: {
        fontSize: '1.25rem',
        padding: '$4 $5',
        width: '100%',
      },
      icon: {
        borderRadius: '10px',
        padding: '$2 $2',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
});

export const Button = styled('button', {
  ...button,
});
