import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

// Mock the Calculator component
jest.mock('./features/calculator', () => {
  return function MockCalculator() {
    return <div data-testid="mock-calculator">Calculator Component</div>;
  };
});

test('renders calculator app', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  expect(screen.getByTestId('mock-calculator')).toBeInTheDocument();
});
