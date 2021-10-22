import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';

export default {
  title: 'Form/Button',
  component: Button,
  // parameters: {
  //   backgrounds: {
  //     values: [
  //       { name: 'red', value: '#f00' },
  //       { name: 'green', value: '#0f0' },
  //       { name: 'blue', value: '#00f' },
  //     ],
  //   },
  // },
  argTypes: {
    children: {
      defaultValue: 'defalt text',
    },
    onClick: { action: 'clicked' },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    // backgroundColor: {
    //   control: 'color',
    // },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
  },
  // args: {
  //   size: 'medium',
  // },
  //decorators: [(story) => <Center>{story()}</Center>],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} onClick={action('handleClick')} />
);

//export const Default = () => <Button variant="primary">CLICK ME</Button>;

//export const Secondary = () => <Button variant="secondary">I am button</Button>;

export const Default = Template.bind({});
export const Primary = Template.bind({});
export const Secondary = Template.bind({});

export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});

//export const HandleClick = Template.bind({});

Primary.args = {
  variant: 'primary',
  children: 'I am primary',
  //onClick: () => console.log('secondary button'),
};

Secondary.args = {
  variant: 'secondary',
  children: 'I am secondary',
};

Small.storyName = 'Small Button';
Small.args = {
  size: 'small',
  children: 'small button',
};

Medium.storyName = 'Medium Button';
Medium.args = {
  size: 'medium',
  children: 'medium button',
};

Large.storyName = 'Large Button';
Large.args = {
  size: 'large',
  children: 'large button',
};

//HandleClick.args = {};
