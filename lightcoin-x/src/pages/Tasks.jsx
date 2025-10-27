import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, Circle, Gift } from 'lucide-react';

const Tasks = () => {
  const { t } = useTranslation();
  const { userData, updateUserData } = useAuth();
  const [completedTasks, setCompletedTasks] = useState(userData?.completedTasks || []);

  const tasks = [
    {
      id: 'twitter',
      title: t('tasks.tasks.twitter'),
      reward: 10000,
      icon: '𝕏',
      link: 'https://x.com/lightcoinx'
    },
    {
      id: 'telegram',
      title: t('tasks.tasks.telegram'),
      reward: 10000,
      icon: '📱',
      link: 'https://t.me/lightcoinx'
    },
    {
      id: 'invite',
      title: t('tasks.tasks.invite'),
      reward: 50000,
      icon: '👥',
      condition: () => (userData?.referrals?.length || 0) >= 1
    },
    {
      id: 'daily',
      title: t('tasks.tasks.daily'),
      reward: 25000,
      icon: '📅',
      condition: () => (userData?.dailyBonusStreak || 0) >= 7
    },
    {
      id: 'mine',
      title: t('tasks.tasks.mine'),
      reward: 100000,
      icon: '⛏️',
      condition: () => (userData?.totalMined || 0) >= 100000
    }
  ];

  const handleClaimTask = (task) => {
    if (task.link) {
      window.open(task.link, '_blank');
    }

    if (!completedTasks.includes(task.id)) {
      const newCompletedTasks = [...completedTasks, task.id];
      setCompletedTasks(newCompletedTasks);
      
      updateUserData({
        light: (userData?.light || 0) + task.reward,
        completedTasks: newCompletedTasks
      });
    }
  };

  const isTaskCompleted = (task) => {
    if (completedTasks.includes(task.id)) return true;
    if (task.condition) return task.condition();
    return false;
  };

  const availableTasks = tasks.filter(task => !isTaskCompleted(task));
  const completedTasksList = tasks.filter(task => isTaskCompleted(task));

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-purple-900 to-dark text-white pb-20">
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">🏆 {t('tasks.title')}</h1>
        </motion.div>

        {/* Available Tasks */}
        {availableTasks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">{t('tasks.available')}</h2>
            <div className="space-y-3">
              {availableTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{task.icon}</div>
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-accent">+{task.reward.toLocaleString()} Light</p>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleClaimTask(task)}
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white px-6 py-2 rounded-full font-bold shadow-neon transition-all duration-300"
                    >
                      {t('tasks.claim')}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasksList.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">{t('tasks.completed')}</h2>
            <div className="space-y-3">
              {completedTasksList.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 opacity-60"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{task.icon}</div>
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-green-400">✓ {t('tasks.claimed')}</p>
                      </div>
                    </div>
                    
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {availableTasks.length === 0 && completedTasksList.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <Gift className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">No tasks available at the moment</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
