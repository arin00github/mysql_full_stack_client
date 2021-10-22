import React, { HTMLAttributes, ReactNode } from 'react';

import './button.css';

export interface ButtonProps {
  /**
   *  Provide a text for the button
   */
  children: ReactNode;
  /**
   * Which variant look would you like use
   */
  variant?: 'primary' | 'secondary';
  /**
   * 3 kind of size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Mouse Click Event
   */
  onClick?: () => void;
  //backgroundColor: string;
}

export const Button = ({ children, variant, onClick, size = 'medium', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      style={
        {
          //backgroundColor: backgroundColor,
          // color: 'white',
          // border: 'none',
          // borderRadius: 10,
          // padding: 10,
          // cursor: 'pointer',
        }
      }
      className={`storybook-button storybook-button--${variant} storybook-button--${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
