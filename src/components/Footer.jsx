import React from 'react';
import './wandermindFooter.css';
import { FiGithub, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="minimal-footer">
      <div className="footer-content">
        <div className="social-row">
          <a href="https://github.com/tijani-web" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub className="social-icon" />
          </a>
          <a href="https://www.instagram.com/tijanidev?igsh=MWVpczc4eTBpM2xlYQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FiInstagram className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/in/basit-tijani-4362b3320/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin className="social-icon" />
          </a>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=basiittdev@gmail.com&su=Hello%20Basit" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <FiMail className="social-icon" /> 
          </a>
        </div>
        <div className="divider"></div>
        <div className="copyright">
          © {new Date().getFullYear()} Wandermind. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;