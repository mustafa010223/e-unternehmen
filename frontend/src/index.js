import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global stiller buraya dahil ediliyor
import App from './App'; // Ana uygulamanızın bileşeni

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Ana uygulamanızı render ediyoruz */}
  </React.StrictMode>
);
