# streamlit_app.py

import streamlit as st
from solver.z3_engine import evaluate_constraints

st.title("Systemic Risk Simulator")

# Example form
bank_data = [
    {"id": "BankA", "L": 100, "O": 400},
    {"id": "BankB", "L": 30, "O": 90},
]

if st.button("Evaluate Constraints"):
    results = evaluate_constraints(bank_data)
    for bank_id, result in results:
        st.write(f"{bank_id}: {'PASS ✅' if result == 'sat' else 'FAIL ❌'}")

