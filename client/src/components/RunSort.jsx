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
    <div style={{ padding: "20px", textAlign: "center", background: "#333", color: "#fff" }}>
      <h2>Sorting Demo</h2>

      <div style={{ margin: "10px 0" }}>
        <label>Size: {size}</label>
        <input
          type="range"
          min="1000"
          max="1000000" // Smaller max for simplicity
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={{ display: "block", margin: "10px auto" }}
        />
      </div>

      <div style={{ margin: "10px 0" }}>
        <label>Order: </label>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
          <option value="random">Random</option>
        </select>
      </div>

      <button
        onClick={handleRunDemo}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          background: isLoading ? "#666" : "#007BFF",
          color: "#fff",
          border: "none",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Running..." : "Run"}
      </button>

      {result && result.mergeSortTime && result.parallelMergeSortTime && (
        <div style={{ marginTop: "20px", background: "#ddd", padding: "10px", color: "#000" }}>
          <h3>Results</h3>
          <p>MergeSort: {result.mergeSortTime} sec</p>
          <p>Parallel MergeSort: {result.parallelMergeSortTime} sec</p>
          <p>
            Improvement:{" "}
            {((result.mergeSortTime / result.parallelMergeSortTime) * 100 - 100).toFixed(2)}%
          </p>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default RunSort;