import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './features/calculator/calculatorSlice';
import App from './App';

function renderWithRedux(ui) {
  const store = configureStore({
    reducer: {
      calculator: calculatorReducer
    }
  });
  
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

test('renders calculator app', () => {
  renderWithRedux(<App />);
  const calculatorElement = screen.getByTestId('calculator');
  expect(calculatorElement).toBeInTheDocument();
});
