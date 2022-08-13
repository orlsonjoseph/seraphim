import React from 'react';
import './button.css';

export const Button = ({ children, onClick, type = 'primary', className }) => {
  const baseClassName = 'nodraft-button';

  return (
    <button
      className={[baseClassName, baseClassName + '-' + type, className].join(
        ' '
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
