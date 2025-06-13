import React from 'react';

/**
 * Button component for calculator keys
 * @param {Object} props - Component props
 * @param {string} props.label - Text to display on button
 * @param {string} props.type - Button type (number, operator, function)
 * @param {function} props.onClick - Click handler function
 * @param {boolean} props.wide - Whether button should be double width
 */
const Button = React.memo(({ label, type = 'number', onClick, wide = false }) => {
  const handleClick = () => {
    onClick(label);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick(label);
    }
  };

  return (
    <button
      className={`calculator-button ${type} ${wide ? 'wide' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={label}
      data-testid={`button-${label}`}
    >
      {label}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
