from flask import Flask, request, jsonify
from solver.z3_engine import evaluate_constraints

app = Flask(__name__)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    results = evaluate_constraints(data['banks'])
    return jsonify(results)
