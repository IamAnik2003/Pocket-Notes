import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../src/contexts/ThemeContext.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
 <ThemeProvider>

    <App />
 </ThemeProvider>
      <Toaster position="top-center" />
    </BrowserRouter>
  </StrictMode>,
)
