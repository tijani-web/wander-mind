// src/components/Header.jsx
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase/firebase'; 
import { useState, useEffect } from 'react';
import wandermindLogo from '/wandermind logo.png';

const Header = () => {
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent flicker before we know the user state
  if (loading) return null;

  return (
    <header className={`nav-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo-container">
          <img src={wandermindLogo} alt="WanderMind Logo" width={75} />
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
          <NavLink to="/escapes" onClick={closeMobileMenu}>Escape List</NavLink>
          <NavLink to="/journal" onClick={closeMobileMenu}>Journal</NavLink>
          <NavLink to="/ai-companion" onClick={closeMobileMenu}>MindMate AI</NavLink>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="auth-buttons">
          {user ? (
            <>
              <button
                onClick={() => auth.signOut()}
                className="logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/sign-up">Sign Up</NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="menu-icon" />
          ) : (
            <FaBars className="menu-icon" />
          )}
        </button>

        {/* Mobile Navigation Overlay */}
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={closeMobileMenu}
          aria-hidden={!isMobileMenuOpen}
        ></div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav-links">
            <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
            <NavLink to="/escapes" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              Escape List
            </NavLink>
            <NavLink to="/journal" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              Journal
            </NavLink>
            <NavLink to="/ai-companion" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              MindMate AI
            </NavLink>
            
            <div className="mobile-auth-section">
              {user ? (
                <>
                  <NavLink 
                    to="/profile" 
                    onClick={closeMobileMenu} 
                    className={({ isActive }) => `mobile-profile-link ${isActive ? 'active' : ''}`}
                  >
                  </NavLink>
                  <button
                    onClick={() => {
                      auth.signOut();
                      closeMobileMenu();
                    }}
                    className="logout-button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/login" 
                    onClick={closeMobileMenu} 
                    className={({ isActive }) => `mobile-auth-link ${isActive ? 'active' : ''}`}
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/sign-up" 
                    onClick={closeMobileMenu} 
                    className={({ isActive }) => `mobile-auth-link ${isActive ? 'active' : ''}`}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;