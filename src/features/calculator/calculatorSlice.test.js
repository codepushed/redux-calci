import calculatorReducer, {
  appendDigit,
  appendDecimal,
  setOperation,
  calculate,
  clear,
  toggleSign,
  percentage,
  selectError
} from './calculatorSlice';

describe('calculator reducer', () => {
  const initialState = {
    currentValue: '0',
    previousValue: null,
    operation: null,
    shouldResetDisplay: false,
    expression: null,
    isResult: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(calculatorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle appendDigit with initial state', () => {
    const actual = calculatorReducer(initialState, appendDigit('5'));
    expect(actual.currentValue).toEqual('5');
  });

  it('should handle appendDigit with existing value', () => {
    const actual = calculatorReducer(
      { ...initialState, currentValue: '5' },
      appendDigit('7')
    );
    expect(actual.currentValue).toEqual('57');
  });

  it('should handle appendDigit with shouldResetDisplay', () => {
    const actual = calculatorReducer(
      { ...initialState, currentValue: '5', shouldResetDisplay: true },
      appendDigit('7')
    );
    expect(actual.currentValue).toEqual('7');
    expect(actual.shouldResetDisplay).toEqual(false);
  });

  it('should handle appendDecimal', () => {
    const actual = calculatorReducer(initialState, appendDecimal());
    expect(actual.currentValue).toEqual('0.');
  });

  it('should not append multiple decimals', () => {
    const actual = calculatorReducer(
      { ...initialState, currentValue: '5.2' },
      appendDecimal()
    );
    expect(actual.currentValue).toEqual('5.2');
  });

  it('should handle setOperation', () => {
    const actual = calculatorReducer(
      { ...initialState, currentValue: '5' },
      setOperation('+')
    );
    expect(actual.previousValue).toEqual('5');
    expect(actual.operation).toEqual('+');
    expect(actual.shouldResetDisplay).toEqual(true);
    expect(actual.expression).toEqual('5 +');
  });

  it('should handle calculate', () => {
    const actual = calculatorReducer(
      {
        ...initialState,
        currentValue: '7',
        previousValue: '5',
        operation: '+',
      },
      calculate()
    );
    expect(actual.currentValue).toEqual('12');
    expect(actual.expression).toEqual('5 + 7 =');
    expect(actual.isResult).toEqual(true);
  });

  it('should handle clear', () => {
    const actual = calculatorReducer(
      {
        currentValue: '5',
        previousValue: '10',
        operation: '+',
        shouldResetDisplay: true,
        expression: '10 +',
        isResult: false,
      },
      clear()
    );
    expect(actual).toEqual(initialState);
  });

  it('should handle toggleSign', () => {
    const actual = calculatorReducer(
      { ...initialState, currentValue: '5' },
      toggleSign()
    );
    expect(actual.currentValue).toEqual('-5');

    const toggledAgain = calculatorReducer(actual, toggleSign());
    expect(toggledAgain.currentValue).toEqual('5');
  });

  it('should handle percentage', () => {
    const actual = calculatorReducer(
      { ...initialState, currentValue: '50' },
      percentage()
    );
    expect(actual.currentValue).toEqual('0.5');
  });

  it('should handle chained operations', () => {
    let state = calculatorReducer(initialState, appendDigit('5'));
    state = calculatorReducer(state, setOperation('+'));
    state = calculatorReducer(state, appendDigit('3'));
    state = calculatorReducer(state, setOperation('×'));
    
    expect(state.currentValue).toEqual('8');
    expect(state.expression).toEqual('8 ×');
    
    state = calculatorReducer(state, appendDigit('2'));
    state = calculatorReducer(state, calculate());
    
    expect(state.currentValue).toEqual('16');
    expect(state.expression).toEqual('8 × 2 =');
  });
  
  it('should handle leading zeros correctly', () => {
    // First digit after 0 should replace the 0
    let state = calculatorReducer(initialState, appendDigit('0'));
    expect(state.currentValue).toEqual('0');
    
    state = calculatorReducer(state, appendDigit('0'));
    expect(state.currentValue).toEqual('0');
    
    state = calculatorReducer(state, appendDigit('5'));
    expect(state.currentValue).toEqual('5');
    
    // After non-zero digit, zeros should be appended normally
    state = calculatorReducer(state, appendDigit('0'));
    expect(state.currentValue).toEqual('50');
  });
  
  it('should handle division by zero with error message', () => {
    let state = calculatorReducer(initialState, appendDigit('5'));
    state = calculatorReducer(state, setOperation('÷'));
    state = calculatorReducer(state, appendDigit('0'));
    state = calculatorReducer(state, calculate());
    
    expect(state.error).toEqual('Cannot divide by 0');
    expect(state.currentValue).toEqual('0');
    expect(state.expression).toEqual('5 ÷ 0 =');
  });
  
  it('should clear error state when performing new operations', () => {
    // First create an error state
    let state = calculatorReducer(initialState, appendDigit('5'));
    state = calculatorReducer(state, setOperation('÷'));
    state = calculatorReducer(state, appendDigit('0'));
    state = calculatorReducer(state, calculate());
    
    expect(state.error).toEqual('Cannot divide by 0');
    
    // Now perform a new operation
    state = calculatorReducer(state, appendDigit('7'));
    expect(state.error).toBeNull();
    expect(state.currentValue).toEqual('7');
  });
});
