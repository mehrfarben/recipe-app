import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './App.css';
import { MantineProvider, createTheme, virtualColor, MantineColorsTuple } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop"
import { ModalsProvider } from '@mantine/modals';

const cesniRed: MantineColorsTuple = [
  '#ffe7e7',
  '#ffcece',
  '#ff9b9b',
  '#ff6363',
  '#ff3636',
  '#ff1818',
  '#ff0307',
  '#e40000',
  '#cc0000',
  '#b20000'
];

const cesniOrange: MantineColorsTuple = [
  "#fff9e1",
  "#fff2cc",
  "#ffe39b",
  "#ffd464",
  "#ffc738",
  "#ffbe1c",
  "#ffba09",
  "#e3a400",
  "#ca9100",
  "#af7c00"
];

const theme = createTheme({
  colors: {
    cesniRed,
    cesniOrange,
    primary: virtualColor({
      name: 'primary',
      dark: 'cesniRed',
      light: 'cesniRed',
    }),
    secondary: virtualColor({
      name: 'secondary',
      dark: 'cesniOrange',
      light: 'cesniOrange',
    }),
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={theme}
        defaultColorScheme="auto">
        <ModalsProvider>
          
        <ScrollToTop/>
        <App />

        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
