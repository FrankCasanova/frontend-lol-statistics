import { useState, useEffect } from 'react';
import { Shield, Users, Target, TrendingUp} from 'lucide-react';

const PlayerCard = ({ playerName, onNotesUpdate }) => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch player data when playerName changes
  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!playerName) return; // Don't fetch if no playerName is provided

      setLoading(true);
      setError(null);

      try {
        const encodedPlayerName = encodeURIComponent(playerName);
        const response = await fetch(
          `https://player-value-e6pfvrexw-frankcasanovas-projects.vercel.app/api/v1/playerprofile-data?name=${encodedPlayerName}`
        );

        
        if (!response.ok) {
          setLoading(false);
          throw new Error('Player not found');
        }
        setLoading(false);
        const data = await response.json();
        setPlayerData(data);

        // Pass the player notes to the parent component
        if (onNotesUpdate && data.champ_info) {
          
          onNotesUpdate(data.champ_info.definitive_info);
        }
      } catch (err) {
        setError(err.message);
        if (onNotesUpdate) {
          onNotesUpdate(null); // Clear the notes on error
        }
      }
    };

    fetchPlayerData();
  }, [playerName, onNotesUpdate]);

  const hasData = playerData && playerData.champ_info;

  return (
   
  <>  
      {loading && (
        <div className="w-full h-full flex items-center justify-center ">
        <img src="/loading.gif" alt="Loading..." className="w-full h-full object-cover opacity-75 " />
      </div>
      )}

    {/* <div className={`w-96 rounded-lg  overflow-hidden shadow-lg font-serif ${hasData ? 'bg-gray-800  border-4 border-yellow-600 text-white' : 'bg-black'}`}> */}

      {error && <p className="text-red-500">{error}</p>}

      {hasData ? (
        <>
        <div className="w-[350px] bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-700">
      <div className="relative">
        <img src={playerData.champ_info.profile_image} alt={playerData.champ_info.name} className="w-full h-auto" />
        <div className="absolute top-0 left-0 p-2 bg-gray-900 w-full flex justify-between items-center">
          <h2 className="text-lg font-bold">{playerData.champ_info.name}</h2>
          <div className="flex space-x-1">
            <div className="">{playerData.champ_info.rank}</div>
            <div className="">{playerData.champ_info.lp}</div>
          </div>
        </div>
      </div>
      <div className="p-4">
      <div className="flex justify-between items-center ">
      <h3>Win Rate: {playerData.champ_info.win_rate}</h3>
      <img src={playerData.champ_info.rank_image} alt={playerData.champ_info.name} className="h-8 w-8 " />
    </div>
        <div className="mt-2 text-sm">
          <div>Champ 1: {playerData.champ_info.top_1_used_champ}</div>
          <div>Champ 2: {playerData.champ_info.top_2_used_champ}</div>
          <div>________________________________</div>
          <div className="flex items-center space-x-2">
          <Shield size={24} />
          <span className="text-lg">Main Role: {playerData.champ_info.main_role}</span>
        </div>
          <div className="flex items-center space-x-2">
            <Users size={20} />
            <span>Kill Participation: {playerData.champ_info.kill_participation}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target size={20} />
            <span>Objective Participation: {playerData.champ_info.objective_participation}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp size={20} />
            <span>XP Diff vs Enemy: {playerData.champ_info.xp_diff_vs_enemy}</span>
          </div>
        </div>
        <div>____________________________</div>
      </div>
      <div className="p-2 bg-gray-900 bg-opacity-75 text-xs flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>MMR Points: {playerData.mmr.mmr}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>MMR Rank: {playerData.mmr.rank}</span>
        </div>
      </div>
    </div>
            </>
          ) : (
            // Show black background and message when there's no data
            <div className="flex items-center justify-center text-white text-lg">
              <p>Find them...</p>
            </div>
          )}
        {/* </div> */}
      </>
    );
  };

  export default PlayerCard;
