import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DropdownProvider } from './Contextapi/DropdownContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DropdownProvider>
    <App />
    </DropdownProvider>
  </StrictMode>,
)
