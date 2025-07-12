import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AuthContext from './Auth/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContext>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AuthContext>

)
