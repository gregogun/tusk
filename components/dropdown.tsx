import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CSS, keyframes, styled } from 'stitches.config';
import { textBaseSizes } from './text';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: '$8xl',
  backgroundColor: '$darkGray',
  borderRadius: '$md',
  boxShadow: '0px 10px 16px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

export const itemStyles: CSS = {
  ...textBaseSizes,
  all: 'unset',
  color: '$lightGray',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',

  '&:hover': {
    color: '$white',
    backgroundColor: '$gray',
  },

  '&:focus': {
    color: '$white',
    backgroundColor: '$gray',
  },
};

const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    color: '$lightGray',
  },
  ...itemStyles,
});
const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuTriggerItem = StyledTriggerItem;
