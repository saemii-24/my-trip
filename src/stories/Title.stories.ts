import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Title from '@components/Title';

// Storybook 메타 데이터 설정
const meta: Meta<typeof Title> = {
  title: 'Components/Title',
  component: Title,
  args: {
    children: '제목이 들어갑니다.',
    className: '',
  },
  argTypes: {
    as: {
      description: '렌더링할 HTML 태그를 설정합니다. 예: div, h1, span, button 등',
      control: { type: 'text' },
      defaultValue: 'div',
    },
    children: {
      description: '컴포넌트 내부에 표시될 콘텐츠입니다.',
      control: { type: 'text' },
    },
    className: {
      description: '추가할 Tailwind CSS 클래스 또는 커스텀 스타일입니다.',
      control: { type: 'text' },
    },
    onClick: {
      description: '클릭 이벤트를 처리할 핸들러 함수입니다.',
      action: 'clicked',
    },
  },
};

export default meta;

// 기본 스토리
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    as: 'div',
    children: '페이지의 제목이 들어갑니다.',
  },
};

