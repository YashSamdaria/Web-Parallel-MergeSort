import React from 'react';
import { motion } from 'framer-motion';
import '../header.css';

const Header = () => {
  const titleVariants = { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } };
  const subtitleVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.3 } } };
  const underlineVariants = { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, delay: 0.5 } } };
  const buttonVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1 } }, hover: { y: [0, 10, 0], transition: { repeat: Infinity, duration: 1.5 } } };
  const threadVariants = { animate: { x: ['-100%', '100%'], transition: { repeat: Infinity, duration: 5, ease: 'linear' } } };

  const scrollDown = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

  return (
    <motion.header className="header">
      <motion.div className="thread" variants={threadVariants} animate="animate" />
      <motion.div className="thread thread-2" variants={threadVariants} animate="animate" />
      <div className="content-wrapper">
        <motion.h1 className="title" variants={titleVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.05, color: '#b2fefa' }}>
          Parallel vs Normal Merge Sort
        </motion.h1>
        <motion.p className="subtitle" variants={subtitleVariants} initial="hidden" animate="visible">
          A <motion.span className="underline" whileHover={{ color: '#b2fefa' }}>dynamic comparison<motion.span className="underline-line" variants={underlineVariants} initial="hidden" animate="visible" /></motion.span>{' '}
          exploring the <motion.span className="underline" whileHover={{ color: '#b2fefa' }}>efficiency<motion.span className="underline-line" variants={underlineVariants} initial="hidden" animate="visible" /></motion.span>{' '}
          and <motion.span className="underline" whileHover={{ color: '#b2fefa' }}>speed<motion.span className="underline-line" variants={underlineVariants} initial="hidden" animate="visible" /></motion.span>{' '}
          of parallel processing versus traditional sorting.
        </motion.p>
        <motion.button className="scroll-button" variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover" onClick={scrollDown}>
          Scroll Down ↓
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;