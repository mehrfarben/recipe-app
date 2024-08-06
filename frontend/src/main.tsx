import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <MantineProvider
    theme={{
      fontFamily: "Roboto, monospace, sans-serif",
    }}
    defaultColorScheme="auto">
    <App />
    </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
