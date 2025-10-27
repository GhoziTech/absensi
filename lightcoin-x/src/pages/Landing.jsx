import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Users, Shield } from 'lucide-react';

const Landing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('landing.features.multiplatform.title'),
      description: t('landing.features.multiplatform.description')
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: t('landing.features.rewards.title'),
      description: t('landing.features.rewards.description')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('landing.features.community.title'),
      description: t('landing.features.community.description')
    }
  ];

  const socialLinks = [
    { name: t('landing.social.telegram'), url: 'https://t.me/lightcoinx', icon: '📱' },
    { name: t('landing.social.twitter'), url: 'https://x.com/lightcoinx', icon: '𝕏' },
    { name: t('landing.social.youtube'), url: 'https://youtube.com/@lightcoinx', icon: '▶️' },
    { name: t('landing.social.instagram'), url: 'https://instagram.com/lightcoinx', icon: '📷' },
    { name: t('landing.social.tiktok'), url: 'https://tiktok.com/@lightcoinx', icon: '🎵' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-purple-900 to-dark text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse-slow"></div>
          <div className="absolute w-96 h-96 bg-accent/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse-slow"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-8"
          >
            <Zap className="w-24 h-24 mx-auto text-accent animate-pulse" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            {t('landing.hero.title')}
          </h1>
          
          <p className="text-2xl md:text-3xl mb-4 text-purple-200 font-semibold">
            {t('landing.hero.subtitle')}
          </p>

          <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            {t('landing.hero.description')}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white px-12 py-4 rounded-full text-xl font-bold shadow-neon transition-all duration-300"
          >
            🔥 {t('landing.hero.cta')}
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            {t('landing.features.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-accent mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🚀 {t('landing.cta.title')}
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              {t('landing.cta.description')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="bg-accent hover:bg-yellow-500 text-dark px-12 py-4 rounded-full text-xl font-bold shadow-glow transition-all duration-300"
            >
              {t('landing.cta.button')}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            {t('landing.social.title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 hover:border-primary/50 transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-2xl">{social.icon}</span>
                <span>{social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>{t('landing.footer')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
