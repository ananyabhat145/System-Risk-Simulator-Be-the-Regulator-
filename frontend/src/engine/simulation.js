export function simulateShock(network, type) {
  // e.g., Mark a few banks as failed
  const updated = { ...network };
  updated.nodes.forEach(node => {
    if (Math.random() < 0.05) node.status = 'failed';
  });
  return { network: updated, constraints: [] };
}

export function applyIntervention(network, interventions) {
  // Reevaluate with constraints
  return { network, constraints: [] };
}

