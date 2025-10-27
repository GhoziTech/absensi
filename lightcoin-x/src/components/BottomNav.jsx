import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ListTodo, Users, ShoppingBag, User, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('nav.home') },
    { path: '/tasks', icon: ListTodo, label: t('nav.tasks') },
    { path: '/referral', icon: Users, label: t('nav.referral') },
    { path: '/shop', icon: ShoppingBag, label: t('nav.shop') },
    { path: '/profile', icon: User, label: t('nav.profile') }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark/90 backdrop-blur-lg border-t border-white/10 z-40">
      <div className="max-w-lg mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.button
                key={item.path}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-accent'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                    />
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
