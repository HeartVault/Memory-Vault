import { View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const glowPulseAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    // Initial fade in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo rotation animation
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Glow pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowPulseAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate after delay
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoRotation = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const glowOpacity = glowPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <View
      className="flex-1 bg-[#0a0a0a] justify-center items-center"
      style={{ width, height }}
    >
      {/* Background gradients */}
      <View
        className="absolute bg-emerald-500 rounded-full"
        style={{
          top: -height * 0.3,
          left: -width * 0.2,
          width: width * 1.4,
          height: height * 0.8,
          opacity: 0.15,
        }}
      />
      <View
        className="absolute bg-blue-500 rounded-full"
        style={{
          bottom: -height * 0.3,
          right: -width * 0.2,
          width: width * 1.4,
          height: height * 0.8,
          opacity: 0.1,
        }}
      />

      {/* Animated content */}
      <Animated.View
        className="items-center justify-center"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {/* Logo with rotation and glow */}
        <Animated.View
          className="w-[140px] h-[140px] rounded-[40px] bg-emerald-500 justify-center items-center relative overflow-visible"
          style={{
            transform: [{ rotate: logoRotation }],
            shadowColor: '#10b981',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.8,
            shadowRadius: 24,
            elevation: 16,
          }}
        >
          <Animated.View
            className="absolute w-[180px] h-[180px] rounded-[50px] bg-emerald-500"
            style={{
              top: -20,
              left: -20,
              opacity: glowOpacity,
            }}
          />
          <Text className="text-white text-[56px] font-bold z-10">MV</Text>
        </Animated.View>

        {/* Brand name */}
        <View className="flex-row items-center mt-8 mb-4">
          <Text className="text-[42px] font-bold text-emerald-400">Memory</Text>
          <Text className="text-[42px] font-bold text-cyan-400">Vault</Text>
        </View>

        {/* Subtitle */}
        <Text className="text-lg text-white/70 mt-2 font-medium">Preserve Your Legacy</Text>
      </Animated.View>
    </View>
  );
}
