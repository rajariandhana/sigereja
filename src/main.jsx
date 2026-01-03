import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import { BrowserRouter } from 'react-router'
import { Providers } from './providers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
          <App />
      </Providers>
    </BrowserRouter>
  </StrictMode>,
)