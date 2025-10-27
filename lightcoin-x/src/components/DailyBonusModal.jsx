import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DailyBonusModal = ({ isOpen, onClose, onClaim, streak = 0 }) => {
  const { t } = useTranslation();
  const bonusAmount = 5000 + (streak * 1000); // Bonus increases with streak

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-dark via-purple-900 to-dark border-2 border-accent rounded-3xl max-w-md w-full shadow-2xl shadow-accent/50 overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-32 h-32 bg-accent/20 rounded-full blur-3xl top-0 left-0 animate-pulse-slow"></div>
                <div className="absolute w-32 h-32 bg-primary/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse-slow"></div>
              </div>

              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                  className="mb-6"
                >
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent to-yellow-600 rounded-full flex items-center justify-center shadow-glow">
                    <Gift className="w-12 h-12 text-dark" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mb-4 text-white"
                >
                  {t('dashboard.dailyBonus')} ✨
                </motion.h2>

                {/* Bonus Amount */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="mb-6"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-accent/30">
                    <p className="text-gray-300 mb-2">You've earned</p>
                    <p className="text-5xl font-bold text-accent flex items-center justify-center gap-2">
                      <Sparkles className="w-8 h-8" />
                      +{bonusAmount.toLocaleString()}
                      <Sparkles className="w-8 h-8" />
                    </p>
                    <p className="text-gray-300 mt-2">Light Coins!</p>
                  </div>
                </motion.div>

                {/* Streak Info */}
                {streak > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-6"
                  >
                    <div className="bg-primary/20 border border-primary/30 rounded-xl p-3">
                      <p className="text-sm text-purple-200">
                        🔥 {streak} Day Streak! Keep it up!
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Claim Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClaim}
                  className="w-full bg-gradient-to-r from-accent to-yellow-600 hover:from-yellow-600 hover:to-accent text-dark py-4 rounded-xl font-bold text-lg shadow-glow transition-all duration-300"
                >
                  {t('dashboard.claimBonus')}
                </motion.button>

                {/* Tip */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-sm text-gray-400 mt-4"
                >
                  💡 Come back tomorrow for more rewards!
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DailyBonusModal;
