import Gallery from '@components/Gallery';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta<typeof Gallery> = {
  title: 'Component/Gallery',
  component: Gallery,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    numImages: {
      control: { type: 'number' },
      description: '갤러리에 보여질 랜덤 이미지 수를 선택합니다.',
      defaultValue: 12,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Gallery>;

export const Default: Story = {
  render: (args) => {
    const [reloadKey, setReloadKey] = useState(0); 

    const reloadImages = () => {
      setReloadKey((prev) => prev + 1); 
    };

    return (
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={reloadImages}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          새로운 랜덤 이미지 불러오기
        </button>
        <Gallery key={reloadKey} {...args} />
      </div>
    );
  },
  args: {
    numImages: 12,
  },
};
