import './index.css';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "@/components/theme-provider";
import App from './components/app';
import { SheetProvider } from './components/sheet-provider';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
