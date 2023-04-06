import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/Index.scss"
//인덱스는 모든 컴포넌트에 적용됨

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
