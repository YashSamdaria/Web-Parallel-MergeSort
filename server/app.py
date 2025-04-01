from flask import Flask, jsonify, request
import subprocess
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS for frontend

# Ensure correct paths for Render
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EXECUTABLE_PATH = os.path.join(BASE_DIR, "sort", "main")

# Precompile C++ code if needed
def compile_cpp():
    if not os.path.exists(EXECUTABLE_PATH):  # Compile only if missing
        compile_process = subprocess.run(
            ["g++", "sort/main.cpp", "sort/mergesort.cpp", "sort/parallelmergesort.cpp", "-o", EXECUTABLE_PATH],
            capture_output=True, text=True
        )
        if compile_process.returncode != 0:
            return False, compile_process.stderr
    return True, None

@app.route("/")
def home():
    return "Flask Backend Running on Render!"

@app.route("/sort", methods=['POST'])
def sort():
    try:
        data = request.get_json()
        size = str(data.get('size', 1000000))
        order = data.get('order', 'random')

        # Compile if needed
        compiled, error_message = compile_cpp()
        if not compiled:
            return jsonify({"error": "Compilation failed", "details": error_message}), 500

        # Run the C++ executable
        result = subprocess.run(
            [EXECUTABLE_PATH, size, order],
            capture_output=True, text=True
        )

        if result.returncode != 0:
            return jsonify({"error": "Execution failed", "details": result.stderr}), 500

        # Parse output
        output_lines = result.stdout.strip().split("\n")
        merge_sort_time = float(output_lines[0].split(":")[1].strip().split()[0])
        parallel_sort_time = float(output_lines[1].split(":")[1].strip().split()[0])

        return jsonify({
            "mergeSortTime": merge_sort_time,
            "parallelMergeSortTime": parallel_sort_time
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Render automatically runs Gunicorn, so no need to call app.run()
if __name__ == "__main__":
    app.run(debug=True)  # Only for local testing
