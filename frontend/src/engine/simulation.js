export function initializeNetwork(type) {
  const nodes = Array.from({ length: 50 }, (_, i) => ({
    id: `Bank${i + 1}`,
    assets: Math.random() * 1000 + 100,
    obligations: Math.random() * 500 + 50,
    exposures: [],
    status: 'healthy',
    capital: Math.random() * 100 + 20
  }));

  // Random exposures
  for (let i = 0; i < nodes.length; i++) {
    const other = Math.floor(Math.random() * nodes.length);
    if (other !== i) {
      nodes[i].exposures.push({ target: `Bank${other + 1}`, amount: Math.random() * 100 });
    }
  }

  return { nodes };
}

export function simulateShock(network, type) {
  const newNet = JSON.parse(JSON.stringify(network));

  if (type === 'liquidity') {
    newNet.nodes.forEach(bank => bank.obligations *= 1.3);
  } else if (type === 'asset') {
    newNet.nodes.forEach(bank => bank.assets *= 0.6);
  }

  newNet.nodes.forEach(bank => {
    const liquidityRatio = bank.assets / bank.obligations;
    const capitalRatio = bank.capital / bank.assets;

    if (liquidityRatio < 0.25 || capitalRatio < 0.08) {
      bank.status = 'failed';
    }
  });

  return { network: newNet, constraints: newNet.nodes.map(b => [b.id, b.status === 'failed' ? 'unsat' : 'sat']) };
}

export function applyIntervention(network, interventions) {
  const newNet = JSON.parse(JSON.stringify(network));

  newNet.nodes.forEach(bank => {
    if (interventions.capital[bank.id]) {
      bank.capital += interventions.capital[bank.id];
    }

    const lcr = interventions.regulations.LCR || 0.25;
    const liquidityRatio = bank.assets / bank.obligations;
    const capitalRatio = bank.capital / bank.assets;

    bank.status = (liquidityRatio < lcr || capitalRatio < 0.08) ? 'failed' : 'healthy';
  });

  return { network: newNet, constraints: newNet.nodes.map(b => [b.id, b.status === 'failed' ? 'unsat' : 'sat']) };
}

export function computeResults(network) {
  const total = network.nodes.length;
  const failed = network.nodes.filter(n => n.status === 'failed').length;
  const saved = total - failed;
  const fragile = network.nodes.find(n => n.status === 'failed' && n.exposures.length < 3);

  return {
    savedPercent: (saved / total * 100).toFixed(1),
    costPerBank: (50 / saved).toFixed(2),
    fragileNode: fragile ? fragile.id : 'N/A'
  };
}
