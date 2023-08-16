import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Components/Main';
import './Styles/styles.css';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');
const appRoot = ReactDOM.createRoot(root);

appRoot.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);
