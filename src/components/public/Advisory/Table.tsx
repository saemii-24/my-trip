import React from 'react';
import { ChildrenProps } from '@type/public';
import { cn } from '@utils/cn';

const Table = ({ children, className = '' }: ChildrenProps & { className?: string }) => {
  // 기본 3열 그리드
  return <div className={cn('grid grid-cols-3 ', className)}>{children}</div>;
};

Table.Row = ({ children }: { children: React.ReactNode }) => {
  // 'contents'를 쓰면 부모 grid의 행 요소가 됨
  return <div className='contents'>{children}</div>;
};

Table.Th = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    role='columnheader'
    className={cn(
      'p-3 font-semibold text-gray-700 border-b border-gray-300 bg-gray-100',
      className,
    )}
  >
    {children}
  </div>
);

Table.Td = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    role='cell'
    className={cn('p-3 text-gray-800 border-b border-gray-200', className)}
  >
    {children}
  </div>
);

export default Table;
