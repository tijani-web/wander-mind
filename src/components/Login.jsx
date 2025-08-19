import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import logo from '/wandermindlogo.png'
import { Layout } from './Layout';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login successful! Redirecting...");

      // Delay before redirecting
      setTimeout(() => {
        navigate('/journal');
      }, 1500);
    } catch (err) {
      setError("Invalid Credentials!");
    }
  };

  return (
    <Layout>
    <div className="login-container">
      <div className="login-background"></div>

      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="WanderMind Logo" className="logo" />
          <h2>Welcome Back</h2>
          <p>Connect with mindful journeys</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <span className="input-icon">✉️</span>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <span className="input-icon">🔒</span>
          </div>

          {error && <span className='login-error'>{error}</span>}
          {success && <span className='login-success'>{success}</span>}

          <button type="submit" className="login-button">Sign In</button>
           <div className="login-footer">
             <NavLink to={`/reset-password`}
               type="button"
               className="reset-password-link"
               style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', padding: 0 }}
             >
               Forgot password?
             </NavLink>
             <span>•</span>
             <a href="/sign-up">Create account</a>
           </div>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default Login;
