import React from 'react';
import cn from 'classnames'; 

type TitleProps<T extends React.ElementType = 'div'> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<T>;

const Title = <T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: TitleProps<T>) => {
  const Component = as || 'div';

  return (
    <Component
      className={cn('px-4 rounded text-black cursor-pointer', className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Title;
