import React from 'react';
import { CSS } from 'stitches.config';

export interface IconChild extends React.SVGAttributes<SVGElement> {
  children?: never;
  css?: CSS;
}

export interface IconProps {
  children: IconChild;
  as: React.FC;
}
