import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AuthContext from "@/Context/AuthContext.jsx"
import AdminCentralData from '@/Context/AdminCentralData.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AdminCentralData>
    <AuthContext>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </AuthContext>
  </AdminCentralData>
)
