import { cn } from '@utils/cn';
import { ReactNode } from 'react';

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  return <div className={cn('container mx-auto px-4', className)}>{children}</div>;
}
