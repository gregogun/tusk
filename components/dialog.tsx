import React from 'react';
import { violet, blackA, mauve, green } from '@radix-ui/colors';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { button } from './button';
import { Collection } from '.prisma/client';
import { keyframes, styled } from 'stitches.config';
import { text } from './text';
import { svg } from '@/styles/svg';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

function Root({ children, ...props }) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$accent',
  color: '$white',
  borderRadius: '$md',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '512px',
  maxHeight: '512px',
  padding: '$6',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: 'transform',
  },
  '&:focus': { outline: 'none' },
});

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: '$white',
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 20px',
  color: '$lightGray',
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
const DialogWrapper = Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = StyledContent;
const DialogTitle = StyledTitle;
const DialogDescription = StyledDescription;
const DialogClose = DialogPrimitive.Close;

// Your app...
const Flex = styled('div', { display: 'flex' });

const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,
});

const Label = styled('label', {
  ...text,
});

const Input = styled('input', {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: '$white',
  boxShadow: `0 0 0 1px $colors$white`,
  height: 35,

  '&:focus': { boxShadow: `0 0 0 2px $colors$white` },
});

interface DialogProps {
  collections: Collection[];
  handleClick: () => Promise<void>;
  setCollectionName: React.Dispatch<React.SetStateAction<string>>;
}

export const Dialog = ({ collections, setCollectionName, handleClick }: DialogProps) => (
  <DialogWrapper>
    <DialogTrigger asChild>
      <button
        className={button({
          variant: 'brandOutline',
          size: collections ? 'fullLg' : 'lg',
          css: { m: 'auto', display: 'block' },
        })}
      >
        Add {collections ? `a` : `your first`} collection
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle asChild>
        <h2 className={text({ size: 'xl' })}>Add a collection</h2>
      </DialogTitle>
      <DialogDescription asChild>
        <p className={text({ size: 'md' })}>Create a collection to give better context to your tasks.</p>
      </DialogDescription>
      <Fieldset>
        <Label htmlFor="collection">Name</Label>
        <Input onChange={(e) => setCollectionName(e.target.value)} id="collection" placeholder="My Collection" />
      </Fieldset>
      <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
        <DialogClose asChild>
          <button
            aria-label="Close"
            onClick={handleClick}
            className={button({ variant: 'brandOutline', size: 'md', css: { mr: '$4' } })}
          >
            Create
          </button>
        </DialogClose>
        <DialogClose asChild>
          <button aria-label="Close" className={button({ variant: 'outline', size: 'md', css: {} })}>
            Cancel
          </button>
        </DialogClose>
      </Flex>
      <DialogClose asChild>
        <button
          className={button({
            size: 'icon',
            css: {
              position: 'absolute',
              top: 20,
              right: 20,
            },
          })}
        >
          <Cross2Icon
            className={svg({
              css: {
                boxSize: '$lg',
              },
            })}
          />
        </button>
      </DialogClose>
    </DialogContent>
  </DialogWrapper>
);
