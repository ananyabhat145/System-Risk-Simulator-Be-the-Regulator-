function ResultsScreen({ results }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Results</h1>
      <p>Network Saved: {results.savedPercent}%</p>
      <p>Cost Efficiency: ${results.costPerBank} per bank saved</p>
      <p>Latent Fragility Node: {results.fragileNode}</p>
    </div>
  );
}

