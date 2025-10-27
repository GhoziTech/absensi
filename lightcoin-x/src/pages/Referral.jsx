import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Copy, Check, Users, TrendingUp, Award } from 'lucide-react';

const Referral = () => {
  const { t } = useTranslation();
  const { userData } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://lightcoin-x.vercel.app/?ref=${userData?.referralCode || 'XXXXX'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalReferrals = userData?.referrals?.length || 0;
  const activeReferrals = userData?.referrals?.filter(r => r.active)?.length || 0;
  const totalEarned = totalReferrals * 50000;

  const getBadge = () => {
    if (totalReferrals >= 10) return { name: t('referral.badge.gold'), color: 'from-yellow-400 to-yellow-600', icon: '🥇' };
    if (totalReferrals >= 5) return { name: t('referral.badge.silver'), color: 'from-gray-300 to-gray-500', icon: '🥈' };
    if (totalReferrals >= 1) return { name: t('referral.badge.bronze'), color: 'from-orange-400 to-orange-600', icon: '🥉' };
    return null;
  };

  const badge = getBadge();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-purple-900 to-dark text-white pb-20">
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">{t('referral.title')}</h1>
          <p className="text-gray-300">{t('referral.description')}</p>
        </motion.div>

        {/* Referral Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6"
        >
          <p className="text-sm text-gray-300 mb-2">{t('referral.yourCode')}</p>
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-4 mb-4">
            <span className="text-2xl font-bold tracking-wider">{userData?.referralCode || 'XXXXX'}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white py-3 rounded-full font-bold shadow-neon transition-all duration-300 flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                {t('referral.copied')}
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                {t('referral.copyLink')}
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center"
          >
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <p className="text-2xl font-bold">{totalReferrals}</p>
            <p className="text-xs text-gray-400">{t('referral.stats.total')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center"
          >
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <p className="text-2xl font-bold">{activeReferrals}</p>
            <p className="text-xs text-gray-400">{t('referral.stats.active')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center"
          >
            <Award className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold">{totalEarned.toLocaleString()}</p>
            <p className="text-xs text-gray-400">{t('referral.stats.earned')}</p>
          </motion.div>
        </div>

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className={`bg-gradient-to-r ${badge.color} rounded-2xl p-6 text-center mb-6`}
          >
            <div className="text-6xl mb-2">{badge.icon}</div>
            <h3 className="text-xl font-bold text-white">{badge.name}</h3>
          </motion.div>
        )}

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold mb-4">How It Works</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <p className="text-sm text-gray-300">Share your referral link with friends</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <p className="text-sm text-gray-300">They sign up using your link</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <p className="text-sm text-gray-300">You both earn +50,000 Light instantly!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Referral;
