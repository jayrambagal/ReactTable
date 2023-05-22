import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'tailwindcss/tailwind.css';
import {QueryClientProvider,QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
    <App />
    </QueryClientProvider>
   
  </React.StrictMode>
);
