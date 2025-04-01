import { useState } from "react";
import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RunSort = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [size, setSize] = useState(1000); // Default to 1000 for simplicity
  const [order, setOrder] = useState("random");
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  const handleRunDemo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/sort`, {
        size: parseInt(size), // Ensure number for API
        order,
      });
      setResult(response.data);
      toast.success("Sorted!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to sort.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 text-center bg-gray-900 text-white">
      <h2 className="text-xl font-semibold mb-4">Sorting Demo</h2>

      <div className="my-3">
        <label className="block">Size: {size}</label>
        <input
          type="range"
          min="1000"
          max="1000000"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="block w-full mt-2"
        />
      </div>

      <div className="my-3">
        <label className="mr-2">Order:</label>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="p-1 text-black"
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
          <option value="random">Random</option>
        </select>
      </div>

      <button
        onClick={handleRunDemo}
        disabled={isLoading}
        className={`px-5 py-2 text-white rounded-md ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {isLoading ? "Running..." : "Run"}
      </button>

      {result && result.mergeSortTime && result.parallelMergeSortTime && (
        <div className="mt-5 p-4 bg-gray-200 text-black rounded-lg">
          <h3 className="text-lg font-medium">Results</h3>
          <p>MergeSort: {result.mergeSortTime} sec</p>
          <p>Parallel MergeSort: {result.parallelMergeSortTime} sec</p>
          <p>
            Improvement: {((result.mergeSortTime / result.parallelMergeSortTime) * 100 - 100).toFixed(2)}%
          </p>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default RunSort;