from flask import Flask, jsonify, request
import subprocess
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # /app/server
EXECUTABLE_PATH = os.path.join(BASE_DIR, "main")       # /app/server/main
print(BASE_DIR + "\n" + EXECUTABLE_PATH)

@app.route("/")
def home():
    files = os.listdir(BASE_DIR)

    # Check if main exists and is executable
    main_exists = os.path.exists(EXECUTABLE_PATH)
    main_executable = os.access(EXECUTABLE_PATH, os.X_OK)

    return (
        "Flask Backend Running on Railway!\n"
        + f"BASE_DIR: {BASE_DIR}\n"
        + f"EXECUTABLE_PATH: {EXECUTABLE_PATH}\n"
        + f"Files: {str(files)}\n"
        + f"main exists: {main_exists}\n"
        + f"main is executable: {main_executable}"
    )



@app.route("/sort", methods=['POST'])
def sort():
    try:
        data = request.get_json()
        size = str(data.get('size', 1000000))
        order = data.get('order', 'random')

        result = subprocess.run(
            [EXECUTABLE_PATH, size, order],
            capture_output=True,
            text=True,
            timeout=10
        )

        if result.returncode != 0:
            return jsonify({"error": "Execution failed", "details": result.stderr}), 500

        output_lines = result.stdout.strip().split("\n")
        merge_sort_time = float(output_lines[0].split(":")[1].strip().split()[0])
        parallel_sort_time = float(output_lines[1].split(":")[1].strip().split()[0])

        return jsonify({
            "mergeSortTime": merge_sort_time,
            "parallelMergeSortTime": parallel_sort_time
        })

    except subprocess.TimeoutExpired:
        return jsonify({"error": "Execution timed out"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)