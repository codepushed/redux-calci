import React, { useEffect } from 'react';
import Display from '../../../components/Display';
import Keypad from '../../../components/Keypad';

/**
 * Main Calculator component that combines Display and Keypad
 */
const Calculator = () => {
  // This is a placeholder for Redux state management
  // We'll implement the actual state management in the next task
  const [displayValue, setDisplayValue] = React.useState('0');
  const [expression, setExpression] = React.useState('');
  
  const handleButtonClick = (value) => {
    // This is a temporary implementation
    // We'll replace this with Redux actions in the next task
    if (value === 'AC') {
      setDisplayValue('0');
      setExpression('');
    } else if (value === '=') {
      setDisplayValue('Result');
      setExpression(`${expression} =`);
    } else {
      setDisplayValue(value);
      setExpression(prev => prev + value);
    }
  };
  
  // Keyboard event handling (will be improved in Task 6)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      // Map keyboard keys to calculator actions
      if (/[0-9]/.test(key)) {
        handleButtonClick(key);
      } else if (key === '+' || key === '-') {
        handleButtonClick(key);
      } else if (key === '*') {
        handleButtonClick('×');
      } else if (key === '/') {
        handleButtonClick('÷');
      } else if (key === 'Enter') {
        handleButtonClick('=');
      } else if (key === 'Escape') {
        handleButtonClick('AC');
      } else if (key === '.') {
        handleButtonClick('.');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <div className="calculator" data-testid="calculator">
      <Display value={displayValue} expression={expression} />
      <Keypad onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Calculator;
