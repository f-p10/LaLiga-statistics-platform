import React from "react";

function SearchBar({
  filters,
  onChange,
  onSearch,
  onClear,
  nations,
  teams,
  positions,
  nameSuggestions,
  onSuggestionSelect,
}) {
  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  };

  const suggestionsContainerStyle = {
    position: "relative",
  };

  const suggestionsListStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ccc",
    listStyleType: "none",
    padding: 0,
    margin: 0,
    maxHeight: "150px",
    overflowY: "auto",
    zIndex: 10,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const suggestionItemStyle = {
    padding: "10px",
    cursor: "pointer",
  };

  const handleSuggestionClick = (name) => {
    onSuggestionSelect(name);
  };

  return (
    <div style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
      <h2>Search Players</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          marginBottom: "15px",
        }}
      >
        <div style={suggestionsContainerStyle}>
          <input
            style={{ ...inputStyle, width: "95%" }}
            placeholder="Player Name"
            value={filters.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
          {nameSuggestions.length > 0 && (
            <ul style={suggestionsListStyle}>
              {nameSuggestions.map((name) => (
                <li
                  key={name}
                  style={suggestionItemStyle}
                  onClick={() => handleSuggestionClick(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <select
            style={inputStyle}
            value={filters.nation}
            onChange={(e) => onChange("nation", e.target.value)}
          >
            <option value="">Select Nation</option>
            {nations.map((nation) => (
              <option key={nation} value={nation}>
                {nation}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            style={inputStyle}
            value={filters.team}
            onChange={(e) => onChange("team", e.target.value)}
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            style={inputStyle}
            value={filters.position}
            onChange={(e) => onChange("position", e.target.value)}
          >
            <option value="">Select Position</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onSearch}>🔍 Search</button>
        <button onClick={onClear}>🔄 Clear</button>
      </div>
    </div>
  );
}

export default SearchBar;
