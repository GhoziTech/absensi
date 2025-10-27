import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { X, Send, Zap } from 'lucide-react';

const LightBot = () => {
  const { t } = useTranslation();
  const { userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const tips = t('lightbot.tips', { returnObjects: true });

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Simple AI responses
    setTimeout(() => {
      const botResponse = getBotResponse(input.toLowerCase());
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);

    setInput('');
  };

  const getBotResponse = (input) => {
    if (input.includes('bonus') || input.includes('daily')) {
      return tips[0];
    } else if (input.includes('friend') || input.includes('referral')) {
      return tips[1];
    } else if (input.includes('task')) {
      return tips[2];
    } else if (input.includes('shop') || input.includes('upgrade')) {
      return tips[3];
    } else if (input.includes('hello') || input.includes('hi')) {
      return t('lightbot.greeting', { name: userData?.name || 'Friend' });
    } else {
      return t('lightbot.motivation');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-br from-accent to-yellow-600 rounded-full shadow-glow flex items-center justify-center"
      >
        <Zap className="w-7 h-7 text-dark" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-40 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-dark/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-neon overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-accent" />
                <div>
                  <h3 className="font-bold text-white">LightBot</h3>
                  <p className="text-xs text-gray-200">Your AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {/* Welcome Message */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/20 rounded-lg p-3 text-sm text-white"
                >
                  {t('lightbot.greeting', { name: userData?.name || 'Friend' })}
                </motion.div>
              )}

              {/* Chat Messages */}
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg p-3 text-sm ${
                    msg.type === 'user'
                      ? 'bg-accent/20 text-white ml-8'
                      : 'bg-primary/20 text-white mr-8'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('lightbot.placeholder')}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-lg"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LightBot;
