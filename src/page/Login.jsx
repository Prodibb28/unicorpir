import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import '../styles/Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/Dashboard')
      console.log('Login successful')
    } catch (error) {
      console.error('Login error:')
    }
  }

  return (
    <div className='login-container'>
      <form onSubmit={handleLogin} className='form-container'>
        <label className='tittle-login'>Iniciar sesión en PIR PAS Unicor</label>
        <input
          type='email'
          placeholder='Correo electrónico'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='input-text'
        />
        <input
          type='password'
          required
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input-text'
        />
        <button type='submit' className='bttnForm'>Entrar</button>
      </form>
    </div>
  )
}

export default Login
