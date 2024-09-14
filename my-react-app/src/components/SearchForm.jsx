import { useState } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import clickSfx from '/soundFxs/clickSearchButton.mp3';





const SearchForm = ({ onSearch }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const encodedPlayerName = encodeURIComponent(playerName);
    onSearch(encodedPlayerName);
  };

  const [play] = useSound(clickSfx);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="dark-fantasy-search flex flex-col items-center space-y-4 p-6 shadow-lg w-full md:w-1/3"
      initial={{ opacity: 0.8, y: -50 }}
      animate={{ opacity: 0.8, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.label
        htmlFor="playerName"
        className="w-full"
        
        
      >
        <span className="sr-only">Search Player Name</span>
        <motion.input
          type="text"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter summoner name..."
          className="dark-fantasy-input px-4 py-2 w-full bg-transparent  text-white placeholder-gray-400 shadow-inner border-b border-l border-gray-700 focus:outline-none focus:none"
          
        />
      </motion.label>
      <motion.button
        type="submit"
        className="dark-fantasy-button px-6 py-2 bg-red-600 text-white font-bold  hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        whileHover={{ scale: 1.05, backgroundColor: "#ff4655" }}
        whileTap={{ scale: 0.95 }}
        onClick={play}
      >
        Search
      </motion.button>
      <motion.div
        className="absolute -z-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className="w-64 h-64 rounded-full bg-gradient-to-r from-black to-yellow opacity-20 blur-xl" />
      </motion.div>
    </motion.form>
  );
};

export default SearchForm;