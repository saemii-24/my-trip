import React, { ReactNode, ReactElement, isValidElement } from 'react';

interface RightSectionProps {
  children: ReactNode;
}

const RightSection = ({ children }: RightSectionProps) => {
  let titleElement: ReactNode = null;
  const contentElements: ReactNode[] = [];

  // children 순회, RightSection.Title 분리
  React.Children.forEach(children, (child) => {
    if (
      isValidElement(child) &&
      (child.type === RightSection.Title ||
        (child.type as any).displayName === 'RightSection.Title')
    ) {
      titleElement = child;
    } else {
      contentElements.push(child);
    }
  });

  return (
    <div className='bg-white p-4 rounded-xl shadow space-y-2'>
      {titleElement}
      <hr className='bg-gray-400' />
      <div className='pt-[6px]'>{contentElements}</div>
    </div>
  );
};

const Title = ({ children }: { children: ReactNode }) => {
  return <h3 className='font-bold mb-2 text-gray-950 text-xl'>{children}</h3>;
};

Title.displayName = 'RightSection.Title';
RightSection.Title = Title;

export default RightSection;
