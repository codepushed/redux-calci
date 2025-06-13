import React, { Suspense, lazy } from 'react';
import './App.css';

// Lazy load the Calculator component
const Calculator = lazy(() => import('./features/calculator'));

function App() {
  return (
    <div className="App">
      <main>
        <Suspense fallback={<div className="loading">Loading calculator...</div>}>
          <Calculator />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
