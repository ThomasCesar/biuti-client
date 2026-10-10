import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "@/components/theme-provider";
import App from './components/app';
import { SheetProvider } from './components/sheet-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SheetProvider>
        <App />
      </SheetProvider>
    </ThemeProvider>
  </StrictMode>
)
