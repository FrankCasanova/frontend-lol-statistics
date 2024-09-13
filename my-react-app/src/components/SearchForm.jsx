import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const encodedPlayerName = encodeURIComponent(playerName); // Encode special characters
    onSearch(encodedPlayerName);
  };

  return (
    <form onSubmit={handleSubmit} className="dark-fantasy-search">
      <label htmlFor="playerName">
        <span className="sr-only">Search Player Name</span>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Let's see if they are worth it..."
          className="dark-fantasy-input px-4 py-2 w-full   bg-slate-800  shadow-inner focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </label>
      <button
        type="submit"
        className="dark-fantasy-button px-4 py-2  bg-red-500 text-black hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Seek Them!
      </button>
    </form>
  );
};

export default SearchForm;