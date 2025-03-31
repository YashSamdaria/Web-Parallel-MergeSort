import React from 'react';
import { motion } from 'framer-motion';
import '../Footer.css';

const Footer = () => {
  return (
    <motion.footer 
      className="footer" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <p className="footer-text">
        Built by <span className='text-blue-700'>Yash Samdaria</span>
      </p>
      <div className="footer-links">
        <a href="https://github.com/YashSamdaria" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="mailto:yashsamdaria@gmail.com">Contact</a>
      </div>
    </motion.footer>
  );
};

export default Footer;
