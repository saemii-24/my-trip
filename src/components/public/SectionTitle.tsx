import { cn } from '@utils/cn';
import { ReactElement, ReactNode, cloneElement } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  icon: ReactElement;
  className?: string;
}

export function SectionTitle({ children, icon, className }: SectionTitleProps) {
  const styledIcon = cloneElement(icon, {
    className: cn(
      'size-[62px] translate-y-[-8px] text-green-500 inline-block',
      icon.props.className,
    ),
  });

  return (
    <h1
      className={cn(
        'text-4xl md:text-6xl font-bold mb-4 max-w-[55%] !leading-[130%] text-start',
        className,
      )}
    >
      {styledIcon}
      <span className='ml-4'>{children}</span>
    </h1>
  );
}
