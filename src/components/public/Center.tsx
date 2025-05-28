import { cn } from '@utils/cn';
import { ElementType, HTMLAttributes, ReactNode } from 'react';

interface CenterProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

const Center = ({
  as: Component = 'div',
  className,
  children,
  ...props
}: CenterProps) => {
  return (
    <Component className={cn('flex items-center justify-center', className)} {...props}>
      {children}
    </Component>
  );
};

export default Center;
