import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import PlayerList from "./components/PlayerList";
import Navbar from "./Navbar";

// A simple debounce function to limit API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

function App() {
  const [filters, setFilters] = useState({
    name: "",
    nation: "",
    team: "",
    position: "",
  });
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  const [nations, setNations] = useState([]);
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [nameSuggestions, setNameSuggestions] = useState([]);

  // Fetches players based on filters and populates the PlayerList
  const fetchPlayers = (currentFilters) => {
    const params = Object.entries(currentFilters)
      .filter(([_, val]) => val.trim() !== "")
      .map(([key, val]) => `${key}=${encodeURIComponent(val.trim())}`)
      .join("&");
    const url = `http://localhost:8080/api/v1/player?${params}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("No players found");
        return res.json();
      })
      .then((data) => {
        setPlayers(Array.isArray(data) ? data : [data]);
        setError("");
      })
      .catch((err) => {
        setPlayers([]);
        setError(err.message || "Error fetching players");
      });
  };

  // Debounced function to fetch name suggestions as the user types
  const fetchNameSuggestions = debounce((name) => {
    const isNameAlreadySelected = players.some(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    if (name.length < 2 || isNameAlreadySelected) {
      setNameSuggestions([]);
      return;
    }

    const url = `http://localhost:8080/api/v1/player?name=${encodeURIComponent(
      name
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNameSuggestions(data.map((p) => p.name));
      })
      .catch((err) => console.error("Failed to fetch name suggestions:", err));
  }, 300);

  // Initial data fetch: players, nations, teams, and positions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8080/api/v1/player";
        const response = await fetch(url);
        const allPlayersData = await response.json();

        setPlayers(allPlayersData);
        setNations([...new Set(allPlayersData.map((p) => p.nation))]);
        setTeams([...new Set(allPlayersData.map((p) => p.team))]);
        setPositions([...new Set(allPlayersData.map((p) => p.position))]);
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
      }
    };
    fetchData();
  }, []);

  // UseEffect to trigger name suggestions on input change
  useEffect(() => {
    fetchNameSuggestions(filters.name);
  }, [filters.name]);

  const updateFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // New handler to clear suggestions when a name is selected
  const handleSuggestionSelect = (name) => {
    setFilters((prev) => ({ ...prev, name: name }));
    setNameSuggestions([]);
  };

  const handleSearch = () => {
    fetchPlayers(filters);
  };

  const handleClear = () => {
    setFilters({ name: "", nation: "", team: "", position: "" });
    fetchPlayers({});
    setNameSuggestions([]);
    setError("");
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <Navbar></Navbar>
      <SearchBar
        filters={filters}
        onChange={updateFilter}
        onSearch={handleSearch}
        onClear={handleClear}
        nations={nations}
        teams={teams}
        positions={positions}
        nameSuggestions={nameSuggestions}
        onSuggestionSelect={handleSuggestionSelect}
      />
      {error && <p style={{ color: "red", marginTop: 20 }}>{error}</p>}
      <PlayerList players={players} />
    </div>
  );
}

export default App;
