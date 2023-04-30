import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/store';  
import { loadAthlete } from './features/athlete/athleteSlice';

declare module 'react-dom' { 
  export function createRoot(container: Element | Document | null, options?: any): { render: (element: React.ReactElement) => void };
}

store.dispatch(loadAthlete());

const rootElement = document.getElementById('root')as Element;
const root = createRoot(rootElement);
root.render(
  <Router>
  <Provider store={store}>
    <App />
  </Provider>
</Router>
);