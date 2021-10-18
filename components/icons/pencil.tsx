import { svg } from '@/styles/svg';
import { IconProps } from 'types';

export const Pencil = ({ ...props }: IconProps) => {
  return (
    <svg
      className={svg({
        css: {
          ...props.css,
        },
      })}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        d="M5.223 21.884H2.645v-2.578L17.183 4.732l2.614 2.615L5.223 21.884zM20.351 6.791l-2.612-2.612 1.484-1.437a1.31 1.31 0 01.906-.358 1.215 1.215 0 01.864.358l.797.797a1.212 1.212 0 01.355.861c0 .328-.127.677-.357.908L20.35 6.79z"
        fill="currentColor"
      />
    </svg>
  );
};
