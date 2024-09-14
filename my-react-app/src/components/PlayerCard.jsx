import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Target, TrendingUp } from 'lucide-react';
import CosmicLoader from './CosmicLoader';

const PlayerCard = ({ playerName, onNotesUpdate }) => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!playerName) {
        setPlayerData(null);
        setError(null);
        return;
      }

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

        if (onNotesUpdate && data.champ_info) {
          onNotesUpdate(data.champ_info.definitive_info);
        }
      } catch (err) {
        setError(err.message);
        if (onNotesUpdate) {
          onNotesUpdate(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerName, onNotesUpdate]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delayChildren: 0.3,
        staggerChildren: 0.1
      } 
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };



  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full flex items-center justify-center"
        >
          <CosmicLoader/>
        </motion.div>
      )}

      {error && !loading && (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-red-500 text-center p-4 bg-gray-800 rounded-lg"
        >
          <motion.p animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
            {error}
          </motion.p>
        </motion.div>
      )}

      {playerData && !loading && (
        <motion.div
          key="playerCard"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-[350px] bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-700"
        >
          <motion.div className="relative">
            <img src={playerData.champ_info.profile_image} alt={playerData.champ_info.name} className="w-full h-auto" />
            <motion.div
              variants={itemVariants}
              className="absolute top-0 left-0 p-2 bg-gray-900 w-full flex justify-between items-center"
            >
              <h2 className="text-lg font-bold">{playerData.champ_info.name}</h2>
              <div className="flex space-x-1">
                <div className="">{playerData.champ_info.rank}</div>
                <div className="">{playerData.champ_info.lp}</div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="p-4">
            <motion.div variants={itemVariants} className="flex justify-between items-center">
              <h3>Win Rate: {playerData.champ_info.win_rate}</h3>
              <img src={playerData.champ_info.rank_image} alt={playerData.champ_info.name} className="h-8 w-8" />
            </motion.div>
            <motion.div variants={itemVariants} className="mt-2 text-sm">
              <div>Champ 1: {playerData.champ_info.top_1_used_champ}</div>
              <div>Champ 2: {playerData.champ_info.top_2_used_champ}</div>
              <div>________________________________</div>
              <motion.div 
                className="flex items-center space-x-2" 
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Shield size={24} />
                <span className="text-lg">Main Role: {playerData.champ_info.main_role}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2" 
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Users size={20} />
                <span>Kill Participation: {playerData.champ_info.kill_participation}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2" 
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Target size={20} />
                <span>Objective Participation: {playerData.champ_info.objective_participation}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2" 
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <TrendingUp size={20} />
                <span>XP Diff vs Enemy: {playerData.champ_info.xp_diff_vs_enemy}</span>
              </motion.div>
            </motion.div>
            <div>____________________________</div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="p-2 bg-gray-900 bg-opacity-75 text-xs flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <span>MMR Points: {playerData.mmr.mmr}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>MMR Rank: {playerData.mmr.rank}</span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {!playerData && !loading && !error && (
        <motion.div
          key="noData"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center text-white text-lg"
        >
          <motion.p
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Find them in the cosmos...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlayerCard;