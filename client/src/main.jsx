import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'
import { UserContext } from './context/UserContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <Router forceRefresh>
    <UserContext>
      <App />
    </UserContext>
    // </Router>
  // </React.StrictMode>,
);