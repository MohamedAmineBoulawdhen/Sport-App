import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/store';  
import { loadAthlete } from './features/athlete/athleteSlice';
import { loadSesssions } from './features/session/sessionSlice';

declare module 'react-dom' { 
  export function createRoot(container: Element | Document | null, options?: any): { render: (element: React.ReactElement) => void };
}

// await store.dispatch(loadAthlete());
// await store.dispatch(loadSesssions());

// const rootElement = document.getElementById('root')as Element;
// const root = createRoot(rootElement);
// root.render(
//   <Router>
//   <Provider store={store}>
//     <App />
//   </Provider>
// </Router>
// );
//wait instance make error in the build process
async function loadApp() {
  await store.dispatch(loadAthlete());
  await store.dispatch(loadSesssions());

  const rootElement = document.getElementById('root') as Element;
  const root = createRoot(rootElement);
  root.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
}

loadApp();