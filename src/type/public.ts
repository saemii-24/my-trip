import { HTMLAttributes, ReactNode } from 'react';

export interface BasicProps {
  className?: string;
}

export interface ChildrenProps {
  children: ReactNode;
  className?: string;
}
