# Redux Calculator

A production-ready, accessible iOS-style calculator built with React and Redux Toolkit.

## Features

- iOS-style calculator UI with a clean, modern design
- Complete arithmetic operations (addition, subtraction, multiplication, division)
- Special operations (percentage, sign toggle)
- Responsive design that works on all device sizes
- Full keyboard support for improved accessibility
- State management with Redux Toolkit
- Comprehensive test coverage
- Continuous Integration with GitHub Actions

## Tech Stack

- React 18
- Redux Toolkit for state management
- SCSS with modular architecture
- Jest and React Testing Library for testing
- GitHub Actions for CI/CD

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codepushed/redux-calci.git
   cd redux-calci
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
redux-calci/
├── .github/
│   └── workflows/       # GitHub Actions workflows
├── public/              # Static files
├── src/
│   ├── app/             # Redux store configuration
│   ├── components/      # Reusable UI components
│   │   ├── Button/
│   │   ├── Display/
│   │   └── Keypad/
│   ├── features/        # Feature-based modules
│   │   └── calculator/  # Calculator feature
│   │       ├── components/
│   │       ├── calculatorSlice.js
│   │       └── calculatorSlice.test.js
│   ├── styles/          # SCSS styles
│   │   ├── abstracts/   # Variables, mixins
│   │   ├── base/        # Reset, typography
│   │   ├── components/  # Component styles
│   │   ├── layout/      # Layout styles
│   │   └── main.scss    # Main stylesheet
│   ├── App.jsx          # Root App component
│   ├── index.jsx        # Entry point
│   └── ...
├── package.json
└── README.md
```

## Keyboard Support

The calculator supports the following keyboard inputs:

- Numbers (0-9): Input digits
- Operators (+, -, *, /): Perform operations
- Enter or =: Calculate result
- Escape or C: Clear all
- Backspace or Delete: Clear current input
- Period (.): Decimal point
- Percentage (%): Convert to percentage
- N or underscore (_): Toggle sign (positive/negative)

## Accessibility Features

- Proper ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- High contrast color scheme
- Responsive design for all device sizes

## Redux Implementation

The calculator uses Redux Toolkit for state management with the following structure:

- **Initial State**: Manages current value, expression, operation, and calculation states
- **Reducers**: 
  - `appendDigit`: Adds a digit to the current value
  - `appendDecimal`: Adds a decimal point if not already present
  - `setOperation`: Sets the current operation (+, -, ×, ÷)
  - `calculate`: Performs the calculation based on current state
  - `clear`: Resets the calculator state
  - `toggleSign`: Changes the sign of the current value
  - `percentage`: Converts the current value to a percentage

## Testing

The application includes comprehensive tests for:

- Redux slice reducers and actions
- React components with Redux integration
- Edge cases and error handling

## License

MIT

## Author

[Your Name]
