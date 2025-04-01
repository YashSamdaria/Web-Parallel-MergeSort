import { useState } from "react";
import { motion } from "framer-motion";

const Demo = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4">See It in Action</h2>
      </motion.div>
    </section>
  );
};

export default Demo;