import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Battery, Crown, X, Copy, Check } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const Shop = () => {
  const { t } = useTranslation();
  const { userData, updateUserData } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const shopItems = [
    {
      id: 'energy-boost',
      name: t('shop.items.energyBoost.name'),
      description: t('shop.items.energyBoost.description'),
      price: 0.5,
      icon: <Battery className="w-12 h-12" />,
      color: 'from-blue-500 to-cyan-400',
      benefit: { type: 'energy', value: 1000 }
    },
    {
      id: 'tap-power',
      name: t('shop.items.tapPower.name'),
      description: t('shop.items.tapPower.description'),
      price: 1.0,
      icon: <Zap className="w-12 h-12" />,
      color: 'from-accent to-yellow-600',
      benefit: { type: 'tapPower', value: 2, duration: 86400000 } // 24 hours
    },
    {
      id: 'vip-pass',
      name: t('shop.items.vipPass.name'),
      description: t('shop.items.vipPass.description'),
      price: 5.0,
      icon: <Crown className="w-12 h-12" />,
      color: 'from-purple-500 to-pink-500',
      benefit: { type: 'vip', duration: 2592000000 } // 30 days
    }
  ];

  const handleBuyClick = (item) => {
    setSelectedItem(item);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (item) => {
    // Apply the benefit to user account
    const updates = {};
    
    switch (item.benefit.type) {
      case 'energy':
        updates.energy = Math.min(
          (userData?.energy || 0) + item.benefit.value,
          userData?.maxEnergy || 1000
        );
        break;
      case 'tapPower':
        updates.tapPower = item.benefit.value;
        updates.tapPowerExpiry = Date.now() + item.benefit.duration;
        break;
      case 'vip':
        updates.vipExpiry = Date.now() + item.benefit.duration;
        break;
    }

    updateUserData(updates);
    setShowPaymentModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-purple-900 to-dark text-white pb-20">
      {/* Header */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">{t('shop.title')}</h1>
          <p className="text-gray-300">{t('shop.description')}</p>
        </motion.div>

        {/* User Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-accent" />
              <span className="text-lg font-semibold">Your Balance</span>
            </div>
            <span className="text-2xl font-bold">{(userData?.light || 0).toLocaleString()}</span>
          </div>
        </motion.div>

        {/* Shop Items */}
        <div className="space-y-4">
          {shopItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`bg-gradient-to-br ${item.color} p-4 rounded-xl`}>
                  {item.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-accent">{item.price} TON</span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBuyClick(item)}
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white px-6 py-2 rounded-full font-bold shadow-neon transition-all duration-300"
                    >
                      {t('shop.buyNow')}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Shop;
