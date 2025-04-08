from flask import Flask, jsonify, request
import subprocess
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EXECUTABLE_PATH = os.path.join(BASE_DIR, "main")  # Points to the binary
print(BASE_DIR + "\n" + EXECUTABLE_PATH)
@app.route("/")
def home():
    return "Flask Backend Running on Railway!" + BASE_DIR + "\n" + EXECUTABLE_PATH

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