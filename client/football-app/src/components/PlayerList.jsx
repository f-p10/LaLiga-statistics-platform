import React from "react";

function PlayerList({ players }) {
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20,
  };

  const headerStyle = {
    textAlign: "left",
    padding: "8px",
    borderBottom: "1px solid #ccc",
    backgroundColor: "#f0f0f0",
  };

  const cellStyle = {
    padding: "8px",
    borderBottom: "1px solid #eee",
  };

  if (!players.length) {
    return <p style={{ marginTop: 20 }}>No players found.</p>;
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Player Data</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Team</th>
            <th style={headerStyle}>Nation</th>
            <th style={headerStyle}>Position</th>
            <th style={headerStyle}>Goals</th>
            <th style={headerStyle}>Assists</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id || p.name}>
              <td style={cellStyle}>{p.name}</td>
              <td style={cellStyle}>{p.team}</td>
              <td style={cellStyle}>{p.nation}</td>
              <td style={cellStyle}>{p.position}</td>
              <td style={cellStyle}>{p.gls}</td>
              <td style={cellStyle}>{p.ast}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerList;
