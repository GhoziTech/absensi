import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboard = () => {
  const { t } = useTranslation();
  const { user, userData } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('totalMined', 'desc'),
        limit(50)
      );
      
      const snapshot = await getDocs(q);
      const leaderboardData = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        rank: index + 1,
        ...doc.data()
      }));
      
      setLeaders(leaderboardData);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      // Mock data for demo
      setLeaders([
        { id: '1', rank: 1, name: 'CryptoKing', totalMined: 5000000 },
        { id: '2', rank: 2, name: 'MoonMiner', totalMined: 3500000 },
        { id: '3', rank: 3, name: 'DiamondHands', totalMined: 2800000 },
        { id: '4', rank: 4, name: 'LightMaster', totalMined: 2100000 },
        { id: '5', rank: 5, name: 'TapLegend', totalMined: 1800000 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-300" />;
      case 3:
        return <Award className="w-8 h-8 text-orange-400" />;
      default:
        return <span className="text-2xl font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-purple-500 to-purple-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-purple-900 to-dark text-white pb-20">
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">{t('leaderboard.title')}</h1>
        </motion.div>

        {/* Top 3 Podium */}
        {leaders.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-8">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 text-center"
            >
              <div className="bg-gradient-to-br from-gray-300 to-gray-500 rounded-2xl p-4 mb-2">
                <Medal className="w-12 h-12 mx-auto mb-2" />
                <p className="font-bold truncate">{leaders[1].name || 'Anonymous'}</p>
                <p className="text-sm">{leaders[1].totalMined?.toLocaleString() || 0}</p>
              </div>
              <div className="bg-gray-600 h-20 rounded-t-lg flex items-center justify-center">
                <span className="text-3xl font-bold">2</span>
              </div>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1 text-center"
            >
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-4 mb-2">
                <Trophy className="w-16 h-16 mx-auto mb-2" />
                <p className="font-bold truncate">{leaders[0].name || 'Anonymous'}</p>
                <p className="text-sm">{leaders[0].totalMined?.toLocaleString() || 0}</p>
              </div>
              <div className="bg-yellow-600 h-32 rounded-t-lg flex items-center justify-center">
                <span className="text-4xl font-bold">1</span>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 text-center"
            >
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-4 mb-2">
                <Award className="w-12 h-12 mx-auto mb-2" />
                <p className="font-bold truncate">{leaders[2].name || 'Anonymous'}</p>
                <p className="text-sm">{leaders[2].totalMined?.toLocaleString() || 0}</p>
              </div>
              <div className="bg-orange-600 h-16 rounded-t-lg flex items-center justify-center">
                <span className="text-3xl font-bold">3</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Leaderboard List */}
        <div className="space-y-2">
          {leaders.slice(3).map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 3) * 0.05 }}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 ${
                leader.id === user?.uid ? 'border-accent shadow-glow' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 text-center">
                    {getRankIcon(leader.rank)}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {leader.name || 'Anonymous'}
                      {leader.id === user?.uid && (
                        <span className="ml-2 text-xs bg-accent text-dark px-2 py-1 rounded-full">
                          {t('leaderboard.you')}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-400">
                      {t('leaderboard.light')}: {leader.totalMined?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
