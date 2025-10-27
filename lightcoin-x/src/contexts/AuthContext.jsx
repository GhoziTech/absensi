import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await loadUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loadUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        // Create default user data
        const defaultData = {
          light: 0,
          energy: 1000,
          maxEnergy: 1000,
          tapPower: 1,
          referralCode: generateReferralCode(),
          referrals: [],
          totalMined: 0,
          dailyBonusStreak: 0,
          lastDailyBonus: null,
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'users', uid), defaultData);
        setUserData(defaultData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password, name) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', result.user.uid), {
      name,
      email,
      light: 0,
      energy: 1000,
      maxEnergy: 1000,
      tapPower: 1,
      referralCode: generateReferralCode(),
      referrals: [],
      totalMined: 0,
      dailyBonusStreak: 0,
      lastDailyBonus: null,
      createdAt: new Date().toISOString()
    });
    return result;
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        light: 0,
        energy: 1000,
        maxEnergy: 1000,
        tapPower: 1,
        referralCode: generateReferralCode(),
        referrals: [],
        totalMined: 0,
        dailyBonusStreak: 0,
        lastDailyBonus: null,
        createdAt: new Date().toISOString()
      });
    }
    return result;
  };

  const signOut = () => {
    return firebaseSignOut(auth);
  };

  const updateUserData = async (updates) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
      setUserData(prev => ({ ...prev, ...updates }));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const value = {
    user,
    userData,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateUserData,
    loadUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
