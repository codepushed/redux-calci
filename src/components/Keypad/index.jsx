import React from 'react';
import Button from '../Button';

/**
 * Keypad component that contains all calculator buttons
 * @param {Object} props - Component props
 * @param {function} props.onButtonClick - Function to handle button clicks
 */
const Keypad = ({ onButtonClick }) => {
  return (
    <div className="calculator-keypad" data-testid="calculator-keypad">
      <div className="keypad-row">
        <Button label="AC" type="function" onClick={onButtonClick} />
        <Button label="±" type="function" onClick={onButtonClick} />
        <Button label="%" type="function" onClick={onButtonClick} />
        <Button label="÷" type="operator" onClick={onButtonClick} />
      </div>
      <div className="keypad-row">
        <Button label="7" onClick={onButtonClick} />
        <Button label="8" onClick={onButtonClick} />
        <Button label="9" onClick={onButtonClick} />
        <Button label="×" type="operator" onClick={onButtonClick} />
      </div>
      <div className="keypad-row">
        <Button label="4" onClick={onButtonClick} />
        <Button label="5" onClick={onButtonClick} />
        <Button label="6" onClick={onButtonClick} />
        <Button label="-" type="operator" onClick={onButtonClick} />
      </div>
      <div className="keypad-row">
        <Button label="1" onClick={onButtonClick} />
        <Button label="2" onClick={onButtonClick} />
        <Button label="3" onClick={onButtonClick} />
        <Button label="+" type="operator" onClick={onButtonClick} />
      </div>
      <div className="keypad-row">
        <Button label="0" onClick={onButtonClick} wide />
        <Button label="." onClick={onButtonClick} />
        <Button label="=" type="operator" onClick={onButtonClick} />
      </div>
    </div>
  );
};

export default Keypad;
