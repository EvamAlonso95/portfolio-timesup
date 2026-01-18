import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TimesUpApp } from './TimesUpApp'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <TimesUpApp />
  </StrictMode>,
)
