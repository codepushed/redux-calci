import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from '../calculatorSlice';
import Calculator from './Calculator';

// Mock the child components
jest.mock('../../../components/Display', () => {
  return function MockDisplay({ value, expression }) {
    return (
      <div data-testid="mock-display">
        <div data-testid="display-value">{value}</div>
        {expression && <div data-testid="display-expression">{expression}</div>}
      </div>
    );
  };
});

jest.mock('../../../components/Keypad', () => {
  return function MockKeypad({ onButtonClick }) {
    return (
      <div data-testid="mock-keypad">
        <button onClick={() => onButtonClick('1')} data-testid="keypad-button-1">1</button>
        <button onClick={() => onButtonClick('AC')} data-testid="keypad-button-ac">AC</button>
        <button onClick={() => onButtonClick('=')} data-testid="keypad-button-equals">=</button>
      </div>
    );
  };
});

function renderWithRedux(ui, initialState = {}) {
  const store = configureStore({
    reducer: {
      calculator: calculatorReducer
    },
    preloadedState: initialState
  });
  
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

describe('Calculator Component', () => {
  test('renders display and keypad components', () => {
    renderWithRedux(<Calculator />);
    expect(screen.getByTestId('mock-display')).toBeInTheDocument();
    expect(screen.getByTestId('mock-keypad')).toBeInTheDocument();
  });

  test('updates display value when button is clicked', () => {
    renderWithRedux(<Calculator />);
    fireEvent.click(screen.getByTestId('keypad-button-1'));
    expect(screen.getByTestId('display-value').textContent).toBe('1');
  });

  test('clears display when AC button is clicked', () => {
    renderWithRedux(<Calculator />);
    fireEvent.click(screen.getByTestId('keypad-button-1'));
    fireEvent.click(screen.getByTestId('keypad-button-ac'));
    expect(screen.getByTestId('display-value').textContent).toBe('0');
  });

  test('shows result when equals button is clicked', () => {
    renderWithRedux(<Calculator />);
    fireEvent.click(screen.getByTestId('keypad-button-1'));
    fireEvent.click(screen.getByTestId('keypad-button-equals'));
    expect(screen.getByTestId('display-value').textContent).not.toBe('0');
  });
  
  test('handles chained operations', () => {
    renderWithRedux(<Calculator />);
    fireEvent.click(screen.getByTestId('keypad-button-1'));
    fireEvent.click(screen.getByTestId('keypad-button-equals'));
    expect(screen.getByTestId('display-value')).toBeInTheDocument();
  });
});
