import React from 'react';
import { motion } from 'framer-motion';
import '../Introduction.css';

const Introduction = () => {
  // Animation variants for the section content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger child animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Thread animation for visual flair
  const threadVariants = {
    animate: {
      x: ['-100%', '100%'],
      transition: { repeat: Infinity, duration: 6, ease: 'linear' },
    },
  };

  return (
    <section className="introduction">
      <motion.div
        className="intro-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger when 30% in view
      >
        <motion.div className="thread" variants={threadVariants} animate="animate" />
        <motion.h2 variants={itemVariants} className="intro-heading">
          What’s This All About?
        </motion.h2>
        <motion.p variants={itemVariants} className="intro-text">
          Merge sort is a classic divide-and-conquer algorithm that splits an array into smaller chunks, sorts them, and merges them back together. In its traditional form, it runs on a single thread—steady, reliable, but limited by sequential processing.
        </motion.p>
        <motion.p variants={itemVariants} className="intro-text">
          Enter <span className="highlight">parallel merge sort</span>: by spinning up multiple threads, it tackles subarrays concurrently, merging them with impressive speed. This project compares their efficiency, showcasing how parallelism can transform sorting performance.
        </motion.p>
        <motion.p variants={itemVariants} className="intro-cta">
          Let’s dive into the details.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Introduction;