function PolicyImpactMeter({ network, interventions }) {
  const savedEstimate = Math.max(0, 100 - network.nodes.filter(n => n.status === 'failed').length / network.nodes.length * 100);
  const cost = Object.values(interventions.capital).reduce((a, b) => a + b, 0);
  const efficiency = cost / (network.nodes.length * (savedEstimate / 100));

  return (
    <div className="bg-gray-800 p-4 rounded">
      <h3 className="text-lg font-semibold">Policy Impact Meter</h3>
      <p>Estimated Saved: {savedEstimate.toFixed(1)}%</p>
      <p>Public Cost: ${cost.toFixed(1)}M</p>
      <p>Efficiency: ${efficiency.toFixed(2)}M per bank saved</p>
    </div>
  );
}

export default PolicyImpactMeter;

