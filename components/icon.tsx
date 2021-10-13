import { IconProps } from 'types';

export const Icon = ({ as, ...props }: IconProps) => {
  const Comp = as;
  return <Comp {...props} />;
};
