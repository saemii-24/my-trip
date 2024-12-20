import React from 'react';
import cn from 'classNames';

type TitleProps<T extends React.ElementType = 'div'> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & React.ComponentProps<T>;

const Title = <T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  onClick,
  ...props
}: TitleProps<T>) => {
  const Component = as || 'div'; 

  return (
    <Component
      className={cn('px-4 px-2 rounded text-black cursor-pointer',className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Title;
