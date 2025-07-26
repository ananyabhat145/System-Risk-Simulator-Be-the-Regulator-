function ControlDashboard({ onTriggerShock, onIntervene, interventions }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Control Dashboard</h2>

      <div>
        <button onClick={() => onTriggerShock('liquidity')}>Liquidity Crisis</button>
        <button onClick={() => onTriggerShock('asset')}>Asset Crash</button>
      </div>

      <div>
        <label>Bank A Capital:</label>
        <input type="range" min="0" max="50" value={interventions.capital.A || 0}
          onChange={(e) => onIntervene({...interventions, capital: { ...interventions.capital, A: +e.target.value }})} />
      </div>

      <div>
        <label>LCR Requirement</label>
        <select onChange={(e) => onIntervene({...interventions, regulations: { LCR: +e.target.value }})}>
          <option value="0.25">25%</option>
          <option value="0.40">40%</option>
        </select>
      </div>
    </div>
  );
}

