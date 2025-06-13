import React from 'react';
import { render, screen } from '@testing-library/react';
import Display from './index';

describe('Display Component', () => {
  test('renders with correct value', () => {
    render(<Display value="123" />);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  test('renders expression when provided', () => {
    render(<Display value="123" expression="100 + 23" />);
    expect(screen.getByText('100 + 23')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  test('does not render expression div when expression is empty', () => {
    const { container } = render(<Display value="123" />);
    expect(container.querySelector('.expression')).toBeNull();
  });
});
