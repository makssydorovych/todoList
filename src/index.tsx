import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppWithReducer from "./AppWithReducer";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<AppWithReducer />)

// ReactDOM.render(<App />,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
