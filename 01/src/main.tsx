import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Chai from './Chai.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Chai />
  </StrictMode>,
)
