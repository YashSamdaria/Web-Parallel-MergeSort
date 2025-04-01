// Remove this line
import React, { useState } from "react";
import { useState } from "react"; // Only import what you need
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Demo1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [size, setSize] = useState(100);
  const [order, setOrder] = useState("random");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleRunDemo = async () => {
    setIsLoading(true);
    console.log(BASE_URL);
    try {
      const response = await axios.post(`${BASE_URL}/sort`, {
        size: size,
        order: order,
      });
      setResult(response.data);
      toast.success("Sorting completed successfully!");
    } catch (error) {
      console.error("Error fetching sorting data:", error);
      toast.error("An error occurred while sorting.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4">See It in Action</h2>

        {/* Controls */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Array Size: {size}</label>
          <input
            type="range"
            min="1000"
            max="10000000"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Sorting Order</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-lg"
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            <option value="random">Random</option>
          </select>
        </div>

        {/* Run Button */}
        <motion.button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition disabled:bg-gray-600 disabled:cursor-not-allowed`}
          onClick={handleRunDemo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? "Running..." : "Run Demo"}
        </motion.button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-[#c2bfb6] shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Sorting Performance Results
            </h3>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left text-black">
                    Sorting Method
                  </th>
                  <th className="py-2 px-4 border-b text-left text-black">
                    Time Taken (in seconds)
                  </th>
                  <th className="py-2 px-4 border-b text-left text-black">
                    Performance Improvement
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-black">MergeSort</td>
                  <td className="py-2 px-4 border-b text-black">
                    {result.mergeSortTime} seconds
                  </td>
                  <td className="py-2 px-4 border-b text-black"></td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-black">
                    Parallel MergeSort
                  </td>
                  <td className="py-2 px-4 border-b text-black">
                    {result.parallelMergeSortTime} seconds
                  </td>
                  <td className="py-2 px-4 border-b text-black">
                    {(
                      (result.mergeSortTime / result.parallelMergeSortTime) *
                        100 -
                      100
                    ).toFixed(2)}
                    % faster
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      <ToastContainer />
    </section>
  );
};

export default Demo1;