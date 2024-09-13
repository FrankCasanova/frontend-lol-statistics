import { useState } from 'react';
import PlayerCard from './components/PlayerCard';
import SearchForm from './components/SearchForm';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [playerNotes, setPlayerNotes] = useState('');

  const handleSearch = (playerName) => {
    setPlayerName(playerName); // Set the player name to trigger fetching in PlayerCard
  };

  // Callback function to update player notes
  const handleNotesUpdate = (notes) => {
    setPlayerNotes(notes);
  };

  return (
    <div className="App min-h-screen bg-gray-900 flex flex-col items-center justify-center  relative" style={{backgroundImage: `url('/background.gif')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* Position the search form at the top-left */}
      <div className="absolute top-8 left-8">
        <SearchForm onSearch={handleSearch} />
      </div>

      {/* Display the PlayerCard and Notes side by side */}
      <div className="flex items-start space-x-8 mt-16">
        {/* Player Card */}
        <PlayerCard playerName={playerName} onNotesUpdate={handleNotesUpdate} />

        {/* Conditionally render Player Notes only if playerNotes is not empty */}
        {playerNotes && (
          <div className="w-64 pl-32 shadow-lg ">
            <p className="text-3xl italic text-yellow-300" style={{ fontFamily: 'Beleren' }}>
              {playerNotes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


