import React from 'react';
import { createRoot } from 'react-dom/client';
import DiceApp from './DiceApp.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DiceApp />
  </React.StrictMode>,
);
