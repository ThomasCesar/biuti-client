import './index.css';
import App from './components/app';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/theme-provider';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
