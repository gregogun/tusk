import { svg } from '@/styles/svg';
import { IconProps } from 'types';

export const EllipsisVertical = ({ ...props }: IconProps) => {
  return (
    <svg
      className={svg({
        css: {
          ...props.css,
        },
      })}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 25"
      {...props}
    >
      <path
        d="M12 15a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm0 7.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm0-15A2.25 2.25 0 1012 3a2.25 2.25 0 000 4.5z"
        fill="currentColor"
      />
    </svg>
  );
};
