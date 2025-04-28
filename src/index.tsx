import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import Tailwind CSS
import './locomotive-scroll.css'; // Import Locomotive Scroll CSS
import App from './App'; // Removed .tsx extension
import { CursorProvider } from './context/CursorContext'; // Import provider


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CursorProvider> {/* Wrap App with Provider */}
      <App />
    </CursorProvider>
  </React.StrictMode>
);
