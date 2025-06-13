import React, { useEffect, useCallback } from 'react';
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
  selectExpression
} from '../calculatorSlice';

const Calculator = () => {
  const dispatch = useDispatch();
  const currentValue = useSelector(selectCurrentValue);
  const expression = useSelector(selectExpression);
  
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
      } else if (key === '%') {
        handleButtonClick('%');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleButtonClick]);
  
  return (
    <div className="calculator" data-testid="calculator">
      <Display value={currentValue} expression={expression || ''} />
      <Keypad onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Calculator;
