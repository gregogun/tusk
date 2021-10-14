import { InputHTMLAttributes } from 'react';
import { CSS, css } from 'stitches.config';
import { textBaseSizes } from './text';

const input = css({
  variants: {
    fontSize: {
      ...textBaseSizes,
    },
    variant: {
      text: {
        padding: '$1',
        background: 'none',
        border: 'none',
        borderRadius: '$md',
        color: '$white',

        '&:focus': {
          outline: 'none',
        },
      },
      checkbox: {
        opacity: 0,
        padding: '$3 $3',
        width: '$2xl',
        height: '$2xl',

        '&::before': {
          border: '1px solid white',
          left: 0,
          position: 'absolute',
          top: 0,
        },
      },
    },
  },
  defaultVariants: {
    fontSize: 'lg',
  },
});

type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  css?: CSS;
  variant?: 'text' | 'checkbox';
  type: InputType;
  name: string;
  id?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  placeholder?: string;
}

export const Input = ({ ...props }: InputProps) => {
  return <input className={input({ css: props.css, variant: props.variant })} {...props} />;
};
