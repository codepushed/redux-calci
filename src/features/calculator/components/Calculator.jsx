import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Display from '../../../components/Display';
import Keypad from '../../../components/Keypad';
import {
  appendDigit,
  appendDecimal,
  setOperation,
  calculate,
  clear,
  toggleSign,
  percentage,
  selectCurrentValue,
  selectExpression,
  selectError
} from '../calculatorSlice';

const Calculator = () => {
  const dispatch = useDispatch();
  const currentValue = useSelector(selectCurrentValue);
  const expression = useSelector(selectExpression);
  const error = useSelector(selectError);
  const [showError, setShowError] = useState(false);
  
  // Show error message when error state changes
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000); // Hide error after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  const handleButtonClick = useCallback((value) => {
    if (/^[0-9]$/.test(value)) {
      dispatch(appendDigit(value));
    } else if (value === '.') {
      dispatch(appendDecimal());
    } else if (['+', '-', '×', '÷'].includes(value)) {
      dispatch(setOperation(value));
    } else if (value === '=') {
      dispatch(calculate());
    } else if (value === 'AC') {
      dispatch(clear());
    } else if (value === '+/-') {
      dispatch(toggleSign());
    } else if (value === '%') {
      dispatch(percentage());
    }
  }, [dispatch]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      // Map keyboard keys to calculator actions
      if (/[0-9]/.test(key)) {
        // Numbers
        handleButtonClick(key);
      } else if (key === '+' || key === '-') {
        // Basic operators
        handleButtonClick(key);
      } else if (key === '*' || key === 'x' || key === 'X') {
        // Multiplication - support multiple key options
        handleButtonClick('×');
      } else if (key === '/' || key === '÷') {
        // Division - support multiple key options
        handleButtonClick('÷');
      } else if (key === 'Enter' || key === '=') {
        // Calculate result
        e.preventDefault(); // Prevent form submission if within a form
        handleButtonClick('=');
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        // Clear - support multiple key options
        handleButtonClick('AC');
      } else if (key === '.') {
        // Decimal point
        handleButtonClick('.');
      } else if (key === '%') {
        // Percentage
        handleButtonClick('%');
      } else if (key === 'Backspace' || key === 'Delete') {
        // Handle backspace/delete as clear
        handleButtonClick('AC');
      } else if (key === '_' || key === 'n' || key === 'N') {
        // Toggle sign (negative/positive)
        handleButtonClick('+/-');
      }
    };
    
    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Focus the calculator container for better keyboard accessibility
    const calculatorElement = document.querySelector('.calculator');
    if (calculatorElement) {
      calculatorElement.setAttribute('tabIndex', '0');
      calculatorElement.focus();
    }
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleButtonClick]);
  
  return (
    <div className="calculator" data-testid="calculator">
      {showError && (
        <div className="calculator-error" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      <Display value={currentValue} expression={expression || ''} />
      <Keypad onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Calculator;
