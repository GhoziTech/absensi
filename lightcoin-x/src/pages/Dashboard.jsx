import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Battery, Gift } from 'lucide-react';
import CoinAnimation from '../components/CoinAnimation';
import DailyBonusModal from '../components/DailyBonusModal';

const Dashboard = () => {
  const { t } = useTranslation();
  const { userData, updateUserData } = useAuth();
  const [showDailyBonus, setShowDailyBonus] = useState(false);
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [tapAnimation, setTapAnimation] = useState(false);

  useEffect(() => {
    // Check if user should receive daily bonus
    if (userData) {
      const lastBonus = userData.lastDailyBonus ? new Date(userData.lastDailyBonus) : null;
      const now = new Date();
      
      if (!lastBonus || now.getDate() !== lastBonus.getDate()) {
        setShowDailyBonus(true);
      }

      // Energy regeneration
      const interval = setInterval(() => {
        if (userData.energy < userData.maxEnergy) {
          updateUserData({
            energy: Math.min(userData.energy + 1, userData.maxEnergy)
          });
        }
      }, 3000); // Regenerate 1 energy every 3 seconds

      return () => clearInterval(interval);
    }
  }, [userData]);

  const handleTap = (e) => {
    if (!userData || userData.energy < 1) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const earnedLight = userData.tapPower || 1;

    // Add floating number animation
    const id = Date.now();
    setFloatingNumbers(prev => [...prev, { id, x, y, value: earnedLight }]);
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(num => num.id !== id));
    }, 1000);

    // Trigger tap animation
    setTapAnimation(true);
    setTimeout(() => setTapAnimation(false), 200);

    // Update user data
    updateUserData({
      light: (userData.light || 0) + earnedLight,
      energy: userData.energy - 1,
      totalMined: (userData.totalMined || 0) + earnedLight
    });
  };

  const handleClaimDailyBonus = () => {
    const bonusAmount = 5000;
    const newStreak = (userData.dailyBonusStreak || 0) + 1;
    
    updateUserData({
      light: (userData.light || 0) + bonusAmount,
      dailyBonusStreak: newStreak,
      lastDailyBonus: new Date().toISOString()
    });
    
    setShowDailyBonus(false);
  };

  const energyPercentage = userData ? (userData.energy / userData.maxEnergy) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-purple-900 to-dark text-white pb-20">
      {/* Header */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <p className="text-sm text-gray-300 mb-2">
            {t('dashboard.title')}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Light Balance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm text-gray-300">{t('dashboard.balance')}</span>
            </div>
            <p className="text-2xl font-bold">{(userData?.light || 0).toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">{t('dashboard.balanceDesc')}</p>
          </motion.div>

          {/* Energy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Battery className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">{t('dashboard.energy')}</span>
            </div>
            <p className="text-2xl font-bold">
              {userData?.energy || 0}/{userData?.maxEnergy || 1000}
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${energyPercentage}%` }}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{t('dashboard.energyDesc')}</p>
          </motion.div>
        </div>
      </div>

      {/* Tap Area */}
      <div className="flex items-center justify-center px-6 relative">
        <motion.div
          onClick={handleTap}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: tapAnimation ? 0.95 : 1 }}
          className="relative cursor-pointer"
        >
          <CoinAnimation />
          
          {/* Floating Numbers */}
          <AnimatePresence>
            {floatingNumbers.map(num => (
              <motion.div
                key={num.id}
                initial={{ opacity: 1, y: 0, x: num.x - 20, scale: 1 }}
                animate={{ opacity: 0, y: -100, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute text-accent font-bold text-2xl pointer-events-none"
                style={{ left: 0, top: num.y }}
              >
                +{num.value}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Tap Button */}
      <div className="px-6 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTap}
          disabled={!userData || userData.energy < 1}
          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white py-4 rounded-full text-xl font-bold shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⚡ {t('dashboard.tapToEarn')}
        </motion.button>
      </div>

      {/* Daily Bonus Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-6 mt-6 bg-accent/20 backdrop-blur-lg rounded-2xl p-4 border border-accent/30"
      >
        <div className="flex items-center gap-3">
          <Gift className="w-6 h-6 text-accent" />
          <p className="text-sm">{t('dashboard.floatingTip')}</p>
        </div>
      </motion.div>

      {/* Daily Bonus Modal */}
      <DailyBonusModal
        isOpen={showDailyBonus}
        onClose={() => setShowDailyBonus(false)}
        onClaim={handleClaimDailyBonus}
        streak={userData?.dailyBonusStreak || 0}
      />
    </div>
  );
};

export default Dashboard;
