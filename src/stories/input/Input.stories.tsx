import { Meta, Story, ComponentMeta } from '@storybook/react';
import { Input, InputProps } from './input';

export default {
  title: 'Form/Input',
  component: Input,
  argTypes: {
    size: {
      defaultValue: 'medium',
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});

Small.storyName = 'Small Input';
Small.args = {
  size: 'small',
};

Medium.storyName = 'Medium Input';
Medium.args = {
  size: 'medium',
};

Large.storyName = 'Large Input';
Large.args = {
  size: 'large',
};
