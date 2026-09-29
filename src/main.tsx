import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function renderApp() {
  const container = document.getElementById('root');
  if (container) {
    createRoot(container).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
