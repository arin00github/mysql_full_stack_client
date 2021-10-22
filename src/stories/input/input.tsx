import React from 'react';
import './input.css';

export interface InputProps {
  size: 'small' | 'medium' | 'large';
}

export const Input = ({ size, ...props }: InputProps) => {
  return (
    <input className={`storybook-input input--${size}`} {...props} placeholder={`${size} input`} />
  );
};
