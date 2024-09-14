import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PlayerCard from './components/PlayerCard';
import SearchForm from './components/SearchForm';
import StarryBackground from './components/StarryBackground';
import musicBackground from "/soundFxs/backGroundMusic.mp3"

import useSound from 'use-sound';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [playerNotes, setPlayerNotes] = useState('');

  const [play] = useSound(musicBackground, { volume: 0.5, loop: true });

  useEffect(() => {
    play();
  }, [play]);

  const handleSearch = (playerName) => {
    setPlayerName(playerName);
  };

  const handleNotesUpdate = (notes) => {
    setPlayerNotes(notes);
  };
  const combinedAnimations = {
    y: ["-2%", "2%"],
    boxShadow: [
      "0 0 20px rgba(255, 255, 255, 0.1)",
      "0 0 30px rgba(255, 255, 255, 0.2)",
      "0 0 20px rgba(255, 255, 255, 0.1)"
    ],
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      boxShadow: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="App min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <video
    autoPlay
    loop
    muted
    className="absolute w-full h-full object-cover"
    src="videoplayback.mp4"
    style={{opacity: 0.2}}
  />
      <StarryBackground />
      {/* <FloatingAsteroids /> */}

      <motion.div
        className="absolute top-8 left-8"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.5 }}
      >
        <SearchForm onSearch={handleSearch} />
      </motion.div>

      <motion.div
        className="flex items-start space-x-8 mt-16"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
      >
        <PlayerCard playerName={playerName} onNotesUpdate={handleNotesUpdate} />

        {playerNotes && (
          <motion.div
            className="w-full max-w-3xl mx-auto px-4 py-6 shadow-lg bg-gray-900 bg-opacity-80 rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1,...combinedAnimations }}
            transition={{ type: "spring", stiffness: 200, delay: 0.9 }}
          >
            <motion.p
              className="text-2xl md:text-3xl lg:text-4xl italic text-yellow-300 leading-relaxed tracking-wide"
              style={{ fontFamily: 'Beleren', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {playerNotes}
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default App;