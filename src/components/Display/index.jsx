import React from 'react';

/**
 * Display component for calculator
 * @param {Object} props - Component props
 * @param {string} props.value - Value to display
 * @param {string} props.expression - Current expression (optional)
 */
const Display = ({ value, expression = '' }) => {
  return (
    <div 
      className="calculator-display" 
      data-testid="calculator-display"
      role="region"
      aria-label="Calculator display"
    >
      {expression && (
        <div 
          className="expression" 
          aria-live="polite"
          aria-label="Current expression"
        >
          {expression}
        </div>
      )}
      <output 
        className="value" 
        aria-live="assertive"
        aria-atomic="true"
        aria-label="Calculator result"
      >
        {value}
      </output>
    </div>
  );
};

export default Display;
