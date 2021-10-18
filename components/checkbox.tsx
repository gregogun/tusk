import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { styled } from 'stitches.config';

export const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  cursor: 'pointer',
  width: '$xl',
  height: '$xl',
  borderRadius: '$md',
  boxShadow: '0 0 0 1px $colors$gray',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '$5',
  position: 'relative',

  '&:hover': {
    backgroundColor: '$darkGray',
  },

  '&:focus': {
    outline: '1px solid $white',
    outlineOffset: '2px',
  },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: '$white',
});

// Exports
//   const Checkbox = StyledCheckbox;
export const CheckboxIndicator = StyledIndicator;
