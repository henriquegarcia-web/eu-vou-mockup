import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import GlobalStyle from './utils/styles/globals.ts'

import { AdminProvider } from '@/contexts/AdminProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminProvider>
      <GlobalStyle />
      <App />
    </AdminProvider>
  </React.StrictMode>
)
