import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import React from 'react'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Mood from './components/Mood.jsx'
import JournalPage from './pages/JournalPage.jsx'
import MoodPage from './pages/MoodPage.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import Companion from './components/Companion.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import EscapesList from './components/MyEscape.jsx'
import EscapeDetails from './components/EscapeDetails.jsx'
import React from 'react'

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  { path: '/login', element: <Login/>},
  { path: '/sign-up', element: <SignUp/> }, 
  { path: '/mood/:mood', element: <MoodPage/> },
  { path: '/journal', element: <JournalPage/> },
  { path: '/reset-password', element: <ResetPassword/> },
  { path: '/ai-companion', element: <Companion/> },
  { path: '/escapes', element: <EscapesList/> },
  { path: '/escape/:id', element: <EscapeDetails/> }
],
  {
    basename: '/wander-mind'
  }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
