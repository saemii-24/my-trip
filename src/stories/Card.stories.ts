
import { Meta, StoryObj } from '@storybook/react';
import Card from '@components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {},
  //추후 카드 props 내용이 들어간다.
  argTypes: {
  },
};

export default meta;


type Story = StoryObj<typeof Card>;

export const Default: Story = {};
