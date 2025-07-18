import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {Object} CalculatorState
 * @property {string} currentValue 
 * @property {string|null} previousValue 
 * @property {string|null} operation 
 * @property {boolean} shouldResetDisplay 
 * @property {string|null} expression 
 * @property {boolean} isResult 
 * @property {string|null} error
 */
const initialState = {
  currentValue: '0',
  previousValue: null,
  operation: null,
  shouldResetDisplay: false,
  expression: null,
  isResult: false,
  error: null,
};


export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    /**
     * @param {CalculatorState} state 
     * @param {Object} action 
     */
    appendDigit: (state, action) => {
      const digit = action.payload;
      
      // Clear any previous error
      state.error = null;
    
      if (state.shouldResetDisplay) {
        state.currentValue = digit;
        state.shouldResetDisplay = false;
        state.isResult = false;
        return;
      }
      
      if (state.currentValue === '0') {
        state.currentValue = digit;
      } else {
        state.currentValue = `${state.currentValue}${digit}`;
      }
      
      state.isResult = false;
    },
    
    /**
     * @param {CalculatorState} state 
     */
    appendDecimal: (state) => {
      // Clear any previous error
      state.error = null;
      
      if (state.shouldResetDisplay) {
        state.currentValue = '0.';
        state.shouldResetDisplay = false;
        state.isResult = false;
        return;
      }
      
      if (state.currentValue.includes('.')) {
        return;
      }
      
      state.currentValue = `${state.currentValue}.`;
      state.isResult = false;
    },
    
    /**
     * @param {CalculatorState} state 
     * @param {Object} action 
     */
    setOperation: (state, action) => {
      const operation = action.payload;
      
      if (state.operation && state.previousValue) {
        const result = performCalculation(
          parseFloat(state.previousValue),
          parseFloat(state.currentValue),
          state.operation
        );
        
        state.currentValue = result.toString();
        state.expression = `${result} ${operation}`;
      } else {
        state.expression = `${state.currentValue} ${operation}`;
      }
      
      state.previousValue = state.currentValue;
      state.operation = operation;
      state.shouldResetDisplay = true;
      state.isResult = false;
    },
    
    /**
     * @param {CalculatorState} state 
     */
    calculate: (state) => {
      if (!state.operation || !state.previousValue) {
        return;
      }
      
      const result = performCalculation(
        parseFloat(state.previousValue),
        parseFloat(state.currentValue),
        state.operation
      );
      
      state.expression = `${state.previousValue} ${state.operation} ${state.currentValue} =`;
      
      if (result === 'Error') {
        state.error = 'Cannot divide by 0';
        state.currentValue = '0';
      } else {
        state.currentValue = result.toString();
      }
      
      state.previousValue = null;
      state.operation = null;
      state.shouldResetDisplay = true;
      state.isResult = true;
    },
    
    /**
     * @param {CalculatorState} state 
     */
    clear: (state) => {
      state.currentValue = '0';
      state.previousValue = null;
      state.operation = null;
      state.shouldResetDisplay = false;
      state.expression = null;
      state.isResult = false;
      state.error = null;
    },
    
    /**
     * @param {CalculatorState} state 
     */
    toggleSign: (state) => {
      if (state.currentValue === '0') {
        return;
      }
      
      if (state.currentValue.startsWith('-')) {
        state.currentValue = state.currentValue.slice(1);
      } else {
        state.currentValue = `-${state.currentValue}`;
      }
    },
    
    /**
     * @param {CalculatorState} state 
     */
    percentage: (state) => {
      const value = parseFloat(state.currentValue);
      state.currentValue = (value / 100).toString();
    },
  },
});

/**
 * @param {number} a 
 * @param {number} b 
 * @param {string} operation 
 * @returns {number} 
 */
const performCalculation = (a, b, operation) => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return b !== 0 ? a / b : 'Error';
    default:
      return b;
  }
};

export const {
  appendDigit,
  appendDecimal,
  setOperation,
  calculate,
  clear,
  toggleSign,
  percentage,
} = calculatorSlice.actions;

export const selectCurrentValue = (state) => state.calculator.currentValue;
export const selectExpression = (state) => state.calculator.expression;
export const selectIsResult = (state) => state.calculator.isResult;
export const selectError = (state) => state.calculator.error;
export default calculatorSlice.reducer;
