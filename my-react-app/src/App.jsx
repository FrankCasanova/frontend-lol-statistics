import React, { useState } from 'react';
import PlayerCard from './components/PlayerCard';
import SearchForm from './components/SearchForm';

function App() {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (playerName) => {
    setLoading(true);
    setError(null);
    try {
      const encodedPlayerName = encodeURIComponent(playerName);
      const response = await fetch(
        `https://player-value-e6pfvrexw-frankcasanovas-projects.vercel.app/api/v1/playerprofile-data?name=${encodedPlayerName}`
      );
      if (!response.ok) {
        throw new Error('Player not found');
      }
      const data = await response.json();
      setPlayerData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <SearchForm onSearch={handleSearch} />
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {playerData && (
        <div className="flex items-start space-x-8">
          <PlayerCard champ_info={playerData.champ_info} mmr={playerData.mmr} />
          <div className="w-64 bg-[#f4e1c1] p-6 rounded-lg shadow-lg transform rotate-2" style={{
            backgroundImage: `
              linear-gradient(to right, #d9c7a3 2px, transparent 2px),
              linear-gradient(to bottom, #d9c7a3 2px, transparent 2px)
            `,
            backgroundSize: '20px 20px',
          }}>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Player Notes</h3>
            <p className="text-sm italic text-gray-700" style={{ fontFamily: 'Papyrus, fantasy' }}>
              {playerData.champ_info.definitive_info}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;