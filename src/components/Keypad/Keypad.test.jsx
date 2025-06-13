import React from 'react';
import { render, screen } from '@testing-library/react';
import Keypad from './index';

// Mock the Button component to simplify testing
jest.mock('../Button', () => {
  return function MockButton({ label, onClick }) {
    return (
      <button 
        data-testid={`mocked-button-${label}`}
        onClick={() => onClick(label)}
      >
        {label}
      </button>
    );
  };
});

describe('Keypad Component', () => {
  test('renders all calculator buttons', () => {
    render(<Keypad onButtonClick={() => {}} />);
    
    // Check for number buttons
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByTestId(`mocked-button-${i}`)).toBeInTheDocument();
    }
    
    // Check for operator buttons
    ['÷', '×', '-', '+', '='].forEach(op => {
      expect(screen.getByTestId(`mocked-button-${op}`)).toBeInTheDocument();
    });
    
    // Check for function buttons
    ['AC', '±', '%', '.'].forEach(func => {
      expect(screen.getByTestId(`mocked-button-${func}`)).toBeInTheDocument();
    });
  });
});
