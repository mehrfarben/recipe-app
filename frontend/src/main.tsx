import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './App.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop"
import { ModalsProvider } from '@mantine/modals';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        defaultColorScheme="auto">
        <ModalsProvider>
          
        <ScrollToTop/>
        <App />

        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
