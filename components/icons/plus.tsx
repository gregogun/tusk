import { svg } from "@/styles/svg";
import { IconProps } from "types";

export const Plus = ({ ...props }: IconProps) => {
  return (
    <svg
      className={svg({
        css: {
          ...props.css,
        },
      })}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        d="M14.5 7.75H1M7.75 1v13.5V1z"
        stroke="var(--colors-white)"
        strokeOpacity={0.923}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
