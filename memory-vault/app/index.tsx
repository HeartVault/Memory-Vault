import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { SplashScreen } from '@/src/features/splash';
import { WelcomeScreen } from '@/src/features/welcome';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return <WelcomeScreen />;
}
