function Z3Console({ constraints, round }) {
  return (
    <div className="bg-black text-green-300 p-2 font-mono">
      <h3>Round {round}</h3>
      {constraints.map(([bank, status]) => (
        <p key={bank}>{bank}: Liquidity ≥ 0.25 × Obligations → {status === 'sat' ? '✅' : '❌ FAIL'}</p>
      ))}
    </div>
  );
}

