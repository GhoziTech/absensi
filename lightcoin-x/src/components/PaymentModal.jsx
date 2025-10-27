import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Loader, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TON_WALLET_ADDRESS = '0xC86487140F25468D3Def86A96760968DA4481584';

const PaymentModal = ({ isOpen, onClose, item, onSuccess }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, verifying, success, failed
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPaymentStatus('pending');
      setTransactionHash('');
      setVerifying(false);
      setCopied(false);
    }
  }, [isOpen]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleVerifyPayment = async () => {
    if (!transactionHash.trim()) {
      alert(t('payment.enterTxHash'));
      return;
    }

    setVerifying(true);
    setPaymentStatus('verifying');

    // Simulate payment verification
    // In production, this would call a backend API to verify the transaction on TON blockchain
    setTimeout(() => {
      // Simulate successful verification (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setPaymentStatus('success');
        setTimeout(() => {
          onSuccess(item);
          onClose();
        }, 2000);
      } else {
        setPaymentStatus('failed');
        setVerifying(false);
      }
    }, 3000);
  };

  const handleManualVerification = () => {
    // For demo purposes, allow manual confirmation
    setPaymentStatus('success');
    setTimeout(() => {
      onSuccess(item);
      onClose();
    }, 1500);
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-dark via-purple-900 to-dark border border-white/20 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-dark/90 backdrop-blur-lg border-b border-white/10 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{t('payment.title')}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Item Info */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">{t('payment.item')}</span>
                    <span className="text-white font-bold">{item.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">{t('payment.amount')}</span>
                    <span className="text-accent text-2xl font-bold">{item.price} TON</span>
                  </div>
                </div>

                {paymentStatus === 'pending' && (
                  <>
                    {/* Payment Instructions */}
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                        <p className="text-sm text-blue-200">
                          {t('payment.instructions')}
                        </p>
                      </div>

                      {/* Wallet Address */}
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          {t('payment.walletAddress')}
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-sm text-white break-all">
                            {TON_WALLET_ADDRESS}
                          </div>
                          <button
                            onClick={() => copyToClipboard(TON_WALLET_ADDRESS)}
                            className="bg-primary hover:bg-primary/80 text-white p-3 rounded-lg transition-colors"
                          >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* QR Code Placeholder */}
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-3">
                          <div className="text-center p-4">
                            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
                              <span className="text-white text-xs font-mono break-all p-4">
                                {TON_WALLET_ADDRESS}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-sm text-gray-300">
                          {t('payment.scanQR')}
                        </p>
                      </div>

                      {/* Transaction Hash Input */}
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          {t('payment.txHashLabel')}
                        </label>
                        <input
                          type="text"
                          value={transactionHash}
                          onChange={(e) => setTransactionHash(e.target.value)}
                          placeholder={t('payment.txHashPlaceholder')}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>

                      {/* Verify Button */}
                      <button
                        onClick={handleVerifyPayment}
                        disabled={verifying || !transactionHash.trim()}
                        className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white py-4 rounded-xl font-bold shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t('payment.verifyButton')}
                      </button>

                      {/* Demo: Manual Confirmation */}
                      <button
                        onClick={handleManualVerification}
                        className="w-full bg-white/5 hover:bg-white/10 text-gray-300 py-3 rounded-xl font-medium transition-all duration-300 text-sm"
                      >
                        {t('payment.demoConfirm')} (Demo Only)
                      </button>
                    </div>
                  </>
                )}

                {paymentStatus === 'verifying' && (
                  <div className="py-12 text-center">
                    <Loader className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {t('payment.verifying')}
                    </h3>
                    <p className="text-gray-300">
                      {t('payment.verifyingDesc')}
                    </p>
                  </div>
                )}

                {paymentStatus === 'success' && (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {t('payment.success')}
                    </h3>
                    <p className="text-gray-300">
                      {t('payment.successDesc')}
                    </p>
                  </div>
                )}

                {paymentStatus === 'failed' && (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {t('payment.failed')}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {t('payment.failedDesc')}
                    </p>
                    <button
                      onClick={() => setPaymentStatus('pending')}
                      className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                      {t('payment.tryAgain')}
                    </button>
                  </div>
                )}

                {/* Help Link */}
                <div className="text-center">
                  <a
                    href="https://ton.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-purple-400 transition-colors"
                  >
                    {t('payment.needHelp')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
