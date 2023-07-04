import './App.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { auth } from './config/firebase'
import Login from './page/Login.jsx'
import Dashboard from './page/Dashboard.jsx'

function App () {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(user !== null)
    })

    return () => unsubscribe()
  }, [])
  return (
    <Router>
      <div>
        <section>
          <Routes>
            {!isAuthenticated
              ? (
                <Route path='/' element={<Login />} />
                )
              : (
                <Route path='/' element={<Navigate to='/Dashboard' replace />} />
                )}
            <Route path='/Dashboard' element={<Dashboard />} />
          </Routes>
        </section>
      </div>
    </Router>
  )
}

export default App
