import { ReactNode } from 'react';

export type Path = {
  label: string;
  path: string;
  icon: ReactNode;
  subPaths?: Path[];
};
