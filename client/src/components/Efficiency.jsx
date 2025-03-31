import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../Efficiency.css";

const Efficiency = () => {
  const performanceData = [
    { size: 100, Normal: 0.02, Parallel: 0.02 },
    { size: 1000, Normal: 0.2, Parallel: 0.18 },
    { size: 10000, Normal: 2.5, Parallel: 1.8 },
    { size: 100000, Normal: 30, Parallel: 2 },
    { size: 500000, Normal: 160, Parallel: 10.5 },
    { size: 1000000, Normal: 320, Parallel: 21 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  return (
    <section className="efficiency">
      <motion.div
        className="efficiency-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 variants={itemVariants} className="efficiency-title">
          Efficiency Unleashed
        </motion.h2>
        <motion.div variants={itemVariants} className="efficiency-summary">
          <p className="summary-text">
            Parallel merge sort dominates with scale.
          </p>
          <p className="summary-highlight">15x faster beyond 10⁵</p>
        </motion.div>

        <motion.div variants={chartVariants} className="efficiency-chart">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={performanceData}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid stroke="#ffffff33" strokeDasharray="3 3" />
              <XAxis
                dataKey="size"
                stroke="#ffffff"
                tick={{ fontSize: 12 }}
                label={{
                  value: "Array Size",
                  position: "insideBottom",
                  offset: -3,
                  fill: "#ffffff",
                  fontSize: 12,
                }}
              />
              <YAxis
                stroke="#ffffff"
                tick={{ fontSize: 12 }}
                label={{
                  value: "Time (ms)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#ffffff",
                  fontSize: 12,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  color: "#1a2a6c",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: 12,
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ marginTop: 20 }}
              />
              <Bar
                dataKey="Normal"
                fill="#1a2a6c"
                name="Normal Merge Sort"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="Parallel"
                fill="#ff6f61"
                name="Parallel Merge Sort"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={itemVariants} className="efficiency-insights">
          <div className="insight-card">
            <h3>Complexity</h3>
            <p>O(n log n)</p>
          </div>
          <div className="insight-card">
            <h3>Peak Speedup</h3>
            <p>15x at 10⁵+</p>
          </div>
          <div className="insight-card">
            <h3>Small Arrays</h3>
            <p>~2x gain</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Efficiency;
