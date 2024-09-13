import React from 'react';
import { Shield, Users, Target, TrendingUp, Star } from 'lucide-react';

const PlayerCard = ({ champ_info, mmr }) => {
  return (
    <div className="w-96 bg-gray-800 rounded-lg overflow-hidden shadow-lg border-4 border-yellow-600 font-serif text-white">
      {/* Card Header */}
      <div className="bg-red-800 p-3 flex justify-between items-center">
        <h2 className="text-2xl font-bold">{champ_info.name}</h2>
        <span className="text-lg">{champ_info.rank} - {champ_info.lp}</span>
      </div>
      
      {/* Player Image */}
      <div className="h-36 bg-cover bg-center" style={{backgroundImage: `url(${champ_info.profile_image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
      
      {/* Main Content */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-lg">Win Rate: {champ_info.win_rate}</span>
          <img src={champ_info.rank_image} alt="Rank" className="w-8 h-8" />
        </div>
        
        <div className="flex space-x-3">
          <img src={champ_info.top_1_used_champ_image} alt={champ_info.top_1_used_champ} className="w-12 h-12 rounded" />
          <img src={champ_info.top_2_used_champ_image} alt={champ_info.top_2_used_champ} className="w-12 h-12 rounded" />
        </div>
        
        <div className="flex items-center space-x-2">
          <Shield size={24} />
          <span className="text-lg">Main Role: {champ_info.main_role}</span>
        </div>
        
        <div className="space-y-2 text-base">
          <div className="flex items-center space-x-2">
            <Users size={20} />
            <span>Kill Participation: {champ_info.kill_participation}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target size={20} />
            <span>Objective Participation: {champ_info.objective_participation}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp size={20} />
            <span>XP Diff vs Enemy: {champ_info.xp_diff_vs_enemy}</span>
          </div>
        </div>
        
        {/* MMR Information */}
        <div className="mt-4 p-2 bg-gray-700 rounded">
          <div className="flex items-center space-x-2">
            <Star size={20} />
            <span className="text-lg font-bold">MMR Information</span>
          </div>
          <div className="mt-2">
            <p>MMR: {mmr.mmr !== 0 ? mmr.mmr : 'N/A'}</p>
            <p>Rank: {mmr.rank !== 'n/a' ? mmr.rank : 'Not Available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;