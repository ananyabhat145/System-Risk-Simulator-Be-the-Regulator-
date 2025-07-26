// Root React App File (src/App.jsx)
import React, { useState, useEffect } from 'react';
import NetworkMap from './components/NetworkMap';
import ControlDashboard from './components/ControlDashboard';
import Z3Console from './components/Z3Console';
import PolicyImpactMeter from './components/PolicyImpactMeter';
import ResultsScreen from './components/ResultsScreen';
import { initializeNetwork, simulateShock, applyIntervention, computeResults } from './engine/simulation';

function App() {
  const [network, setNetwork] = useState(null);
  const [constraints, setConstraints] = useState([]);
  const [shockType, setShockType] = useState(null);
  const [interventions, setInterventions] = useState({ capital: {}, regulations: { LCR: 0.25 } });
  const [round, setRound] = useState(0);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const net = initializeNetwork("Tightly Coupled");
    setNetwork(net);
  }, []);

  const triggerShock = type => {
    const shocked = simulateShock(network, type);
    setShockType(type);
    setNetwork(shocked.network);
    setConstraints(shocked.constraints);
    setRound(prev => prev + 1);
  };

  const intervene = newInterventions => {
    const updated = applyIntervention(network, newInterventions);
    setInterventions(newInterventions);
    setNetwork(updated.network);
    setConstraints(updated.constraints);
    setRound(prev => prev + 1);
  };

  const evaluateResults = () => {
    const score = computeResults(network);
    setResults(score);
  };

  return (
    <div className="w-full h-full p-4 bg-gray-900 text-white">
      {!results ? (
        <>
          <div className="grid grid-cols-3 gap-4">
            <NetworkMap network={network} />
            <ControlDashboard
              shockType={shockType}
              onTriggerShock={triggerShock}
              onIntervene={intervene}
              interventions={interventions}
            />
            <div>
              <Z3Console constraints={constraints} round={round} />
              <PolicyImpactMeter network={network} interventions={interventions} />
            </div>
          </div>
          <button
            className="mt-4 p-2 bg-green-600 rounded"
            onClick={evaluateResults}
          >
            View Results
          </button>
        </>
      ) : (
        <ResultsScreen results={results} />
      )}
    </div>
  );
}

export default App;

