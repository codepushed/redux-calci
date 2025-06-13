import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button Component', () => {
  test('renders with correct label', () => {
    render(<Button label="7" onClick={() => {}} />);
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  test('applies correct class based on type prop', () => {
    render(<Button label="+" type="operator" onClick={() => {}} />);
    const button = screen.getByText('+');
    expect(button).toHaveClass('calculator-button');
    expect(button).toHaveClass('operator');
  });

  test('applies wide class when wide prop is true', () => {
    render(<Button label="0" wide={true} onClick={() => {}} />);
    const button = screen.getByText('0');
    expect(button).toHaveClass('wide');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="5" onClick={handleClick} />);
    fireEvent.click(screen.getByText('5'));
    expect(handleClick).toHaveBeenCalledWith('5');
  });

  test('calls onClick handler on Enter key press', () => {
    const handleClick = jest.fn();
    render(<Button label="5" onClick={handleClick} />);
    fireEvent.keyDown(screen.getByText('5'), { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledWith('5');
  });
});
