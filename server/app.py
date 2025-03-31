from flask import Flask,jsonify,request  
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows CORS for all routes and domains

@app.route("/")
def home():
    return "Flask is running!"

@app.route("/sort", methods=['POST'])
def sort():
    try:
        # Get size and order from the request
        data = request.get_json()
        size = data.get('size', 1000000)  # Default: 1 million
        order = data.get('order', 'random')  # Default: random

        # Compile the C++ files (only if needed)
        compile_process = subprocess.run(
            ["g++", "sort/main.cpp", "sort/mergesort.cpp", "sort/parallelmergesort.cpp", "-o", "sort/main.exe"],
            capture_output=True, text=True
        )

        if compile_process.returncode != 0:
            return jsonify({"error": "Compilation failed", "details": compile_process.stderr}), 500

        # Run the compiled executable with size and order as arguments
        result = subprocess.run(
            ["sort/main.exe", str(size), order],
            capture_output=True, text=True
        )

        if result.returncode != 0:
            return jsonify({"error": "Execution failed", "details": result.stderr}), 500

        # Extract output and format it properly
        output_lines = result.stdout.strip().split("\n")
        merge_sort_time = float(output_lines[0].split(":")[1].strip().split()[0])
        parallel_sort_time = float(output_lines[1].split(":")[1].strip().split()[0])

        return jsonify({
            "mergeSortTime": merge_sort_time,
            "parallelMergeSortTime": parallel_sort_time
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
