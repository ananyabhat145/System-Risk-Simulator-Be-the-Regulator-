from z3 import *

def evaluate_constraints(bank_data):
    s = Solver()
    constraints = []

    for bank in bank_data:
        L = Real(f"{bank['id']}_L")
        O = Real(f"{bank['id']}_O")
        s.add(L >= 0.25 * O)
        constraints.append((bank['id'], s.check()))

    return constraints

