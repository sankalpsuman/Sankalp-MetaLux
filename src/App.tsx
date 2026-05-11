import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/authService';
import { UserProfile } from './types';
import { User } from 'firebase/auth';

// Pages
import MallHome from './pages/MallHome';
import StoreFront from './pages/StoreFront';
import Onboarding from './pages/Onboarding';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import DashboardOverview from './pages/Dashboard/Overview';
import DashboardProducts from './pages/Dashboard/Products';
import DashboardSettings from './pages/Dashboard/Settings';
import { Toaster } from './components/ui/sonner';

// Context
interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    const userProfile = await authService.getUserProfile(uid);
    setProfile(userProfile);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuth(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchProfile(firebaseUser.uid);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.uid);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-cream">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-gold border-t-transparent animate-spin" />
          <p className="font-serif italic text-gold tracking-widest uppercase text-xs">Sankalp MetaLux</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>
      <Toaster />
      <Router>
        <Routes>
          {/* Public Mall */}
          <Route path="/" element={<MallHome />} />
          
          {/* Store Onboarding */}
          <Route 
            path="/onboarding" 
            element={user ? <Onboarding /> : <Navigate to="/" />} 
          />

          {/* Store Frontend - Dynamic Slug */}
          <Route path="/s/:slug" element={<StoreFront />} />

          {/* User Dashboard */}
          <Route 
            path="/dashboard" 
            element={user ? <DashboardLayout /> : <Navigate to="/" />}
          >
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}
