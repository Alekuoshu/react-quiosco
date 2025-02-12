import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { QuiscoProvider } from './context/QuioscoProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuiscoProvider>
      <RouterProvider router={router} />
    </QuiscoProvider>
  </StrictMode>,
)
