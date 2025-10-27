import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Zap, Users, Gift, Globe, Bell, Volume2, LogOut } from 'lucide-react';

const Profile = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, userData, signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const stats = [
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      label: t('profile.stats.totalMined'),
      value: (userData?.totalMined || 0).toLocaleString()
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      label: t('profile.stats.activeReferrals'),
      value: userData?.referrals?.length || 0
    },
    {
      icon: <Gift className="w-8 h-8 text-purple-400" />,
      label: t('profile.stats.dailyBonus'),
      value: `${userData?.dailyBonusStreak || 0} days`
    }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-purple-900 to-dark text-white pb-20">
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">{t('profile.title')}</h1>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-1">{userData?.name || user?.email || 'Anonymous'}</h2>
          <p className="text-gray-300 text-sm">{user?.email}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <p className="text-xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            {t('profile.settings.title')}
          </h3>

          {/* Language */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">{t('profile.settings.language')}</label>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    i18n.language === lang.code
                      ? 'bg-primary border-primary shadow-neon'
                      : 'bg-white/5 border-white/20 hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <div className="text-xs">{lang.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <span>{t('profile.settings.notifications')}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-primary' : 'bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: notifications ? 24 : 0 }}
                className="w-6 h-6 bg-white rounded-full shadow-lg"
              />
            </motion.button>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              <span>{t('profile.settings.sound')}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSound(!sound)}
              className={`w-12 h-6 rounded-full transition-colors ${
                sound ? 'bg-primary' : 'bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: sound ? 24 : 0 }}
                className="w-6 h-6 bg-white rounded-full shadow-lg"
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          {t('profile.logout')}
        </motion.button>
      </div>
    </div>
  );
};

export default Profile;
