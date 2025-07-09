import React from 'react';
import { cn } from '@utils/cn';

const Table = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('w-full', className)}>{children}</div>;
};

Table.Group = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'grid grid-cols-[1fr_120px_160px_80px] gap-[100px] w-full border-b border-zinc-600',
      className,
    )}
  >
    {children}
  </div>
);

Table.Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-[1fr_120px_160px_60px] w-full gap-[100px] '>
      {children}
    </div>
  );
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
    className={cn('px-3 py-4 text-lg  font-semibold text-gray-600', className)}
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
    className={cn(
      'h-[80px]  flex items-center font-semibold text-[30px] text-gray-800 px-3',
      className,
    )}
  >
    {children}
  </div>
);

Table.ExpandRow = ({ children }: { children: React.ReactNode }) => (
  <div className='col-span-4 border-b border-zinc-600 p-4  text-gray-700 text-lg'>
    {children}
  </div>
);

export default Table;
