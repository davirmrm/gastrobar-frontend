import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.scss';

export const Button = ({
  children,
  type = 'btn',
  color = 'default',
  variant = 'normal',
  size = 'medium',
  disabled = false,
  cy = '',
  ...props
}) => {
  return (
    <button
      {...props}
      data-cy={`Button${cy}`}
      className={props.className ? props.className : `${type} ${color} ${variant} ${size} `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
