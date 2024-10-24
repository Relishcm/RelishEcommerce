import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DropdownProvider } from './Contextapi/DropdownContext.jsx'
import { DropHoverProvider } from './Contextapi/CartDropDownHover.jsx'
import { CartContextProvider } from './Contextapi/CartContextapi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DropdownProvider>
      <DropHoverProvider>
        <CartContextProvider >
          <App />
        </CartContextProvider>
      </DropHoverProvider>
    </DropdownProvider>
  </StrictMode>,
)
