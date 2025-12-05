import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';

interface FeatureSlide {
  icon: string;
  title: string;
  description: string;
  gradientColors: string[];
}

const features: FeatureSlide[] = [
  {
    icon: '👨‍👩‍👧',
    title: 'Family Vaults',
    description: 'Create private spaces to organize memories with your family. Share special moments with those who matter most.',
    gradientColors: ['#10b981', '#06b6d4'],
  },
  {
    icon: '⏰',
    title: 'Time Capsules',
    description: 'Digital capsules that unlock at a future date. Perfect for birthdays, milestones, or messages to your future self.',
    gradientColors: ['#3b82f6', '#6366f1'],
  },
  {
    icon: '🔒',
    title: 'Legacy Mode',
    description: 'Your digital inheritance space. Assign legacy contacts and create a memorial vault for loved ones.',
    gradientColors: ['#ec4899', '#f97316'],
  },
  {
    icon: '📸',
    title: 'Memory Stream',
    description: 'A unified timeline of your life in chronological order. Smart search and organize by people, places, and events.',
    gradientColors: ['#06b6d4', '#3b82f6'],
  },
  {
    icon: '✨',
    title: 'AI Memory Tools',
    description: 'AI-powered features to enhance and organize memories. Auto-tagging, photo restoration, and highlight reels.',
    gradientColors: ['#a855f7', '#ec4899'],
  },
];

export function WelcomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / width);
        setCurrentPage(page);
      },
    }
  );

  const handleGetStarted = () => {
    router.push('/auth/sign-up');
  };

  const handleSignIn = () => {
    router.push('/auth/sign-in');
  };

  const totalPages = features.length + 2; // welcome + features + final slide

  return (
    <View className="flex-1 bg-[#0a0a0a]">
      {/* Base background */}
      <View className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Additional gradient overlay layers for depth */}
      <View
        className="absolute bg-emerald-500 rounded-full opacity-[0.08]"
        style={{
          top: -height * 0.3,
          left: -width * 0.2,
          width: width * 1.4,
          height: height * 0.8,
        }}
      />
      <View
        className="absolute bg-blue-500 rounded-full opacity-[0.06]"
        style={{
          bottom: -height * 0.3,
          right: -width * 0.2,
          width: width * 1.4,
          height: height * 0.8,
        }}
      />
      
      {/* Welcome slide background */}
      {(() => {
        const inputRange = [
          -width,
          0,
          width,
        ];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0],
          extrapolate: 'clamp',
        });
        
        return (
          <Animated.View
            className="absolute inset-0"
            style={{
              backgroundColor: '#10b981',
              opacity,
            }}
          />
        );
      })()}
      
      {/* Dynamic gradient backgrounds based on current page */}
      {features.map((feature, index) => {
        const inputRange = [
          index * width,
          (index + 1) * width,
          (index + 2) * width,
        ];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.25, 0],
          extrapolate: 'clamp',
        });
        
        return (
          <Animated.View
            key={`bg-${index}`}
            className="absolute inset-0"
            style={{
              backgroundColor: feature.gradientColors[0],
              opacity,
            }}
          />
        );
      })}
      
      {/* Final slide background */}
      {(() => {
        const finalIndex = features.length + 1;
        const inputRange = [
          finalIndex * width - width,
          finalIndex * width,
        ];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2],
          extrapolate: 'clamp',
        });
        
        return (
          <Animated.View
            className="absolute inset-0"
            style={{
              backgroundColor: '#10b981',
              opacity,
            }}
          />
        );
      })()}

      <SafeAreaView className="absolute top-0 left-0 right-0 z-10">
        <View className="w-full">
          {/* Skip Button */}
          {currentPage < totalPages - 1 && (
            <TouchableOpacity
              className="self-end px-4 py-2 mt-3 mr-5"
              onPress={handleSignIn}
              activeOpacity={0.7}
            >
              <Text className="text-white/70 text-base font-medium">Skip</Text>
            </TouchableOpacity>
          )}

          {/* Page Indicators - Below Skip Button */}
          <View className="flex-row justify-center items-center gap-2 pt-1 pb-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${
                  currentPage === index
                    ? 'w-6 bg-white/90'
                    : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
        bounces={false}
      >
        {/* Welcome Slide - First Slide */}
        <WelcomeIntroSlide isActive={currentPage === 0} width={width} height={height} />

        {/* Feature Slides */}
        {features.map((feature, index) => (
          <FeatureSlide
            key={index}
            feature={feature}
            isActive={currentPage === index + 1}
            width={width}
            height={height}
          />
        ))}

        {/* Final CTA Slide */}
        <FinalSlide
          onGetStarted={handleGetStarted}
          onSignIn={handleSignIn}
          isActive={currentPage === features.length + 1}
          width={width}
          height={height}
        />
      </ScrollView>
    </View>
  );
}

interface WelcomeIntroSlideProps {
  isActive: boolean;
  width: number;
  height: number;
}

function WelcomeIntroSlide({ isActive, width, height }: WelcomeIntroSlideProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
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
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(300),
          Animated.timing(logoRotateAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      slideAnim.setValue(50);
      logoRotateAnim.setValue(0);
    }
  }, [isActive]);

  const logoRotation = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="justify-center items-center px-8" style={{ width, height }}>
      <Animated.View
        className="items-center max-w-[320px]"
        style={{
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: slideAnim },
          ],
        }}
      >
        {/* Logo with rotation animation */}
        <Animated.View
          className="w-[120px] h-[120px] rounded-[32px] bg-emerald-500 justify-center items-center mb-12 relative overflow-visible"
          style={{
            transform: [{ rotate: logoRotation }],
            shadowColor: '#10b981',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.6,
            shadowRadius: 20,
            elevation: 12,
          }}
        >
          <Text className="text-white text-[48px] font-bold z-10">MV</Text>
          <View className="absolute w-[140px] h-[140px] rounded-[40px] bg-emerald-500 opacity-30 -top-[10px] -left-[10px]" />
        </Animated.View>

        {/* Main Heading */}
        <Text className="text-[28px] font-semibold text-white/90 text-center mb-2">
          Welcome to
        </Text>
        <Text className="text-[48px] font-bold text-emerald-500 text-center mb-6 leading-[56px]">
          MemoryVault
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-white/70 text-center leading-[28px] mb-8">
          Preserve your most precious memories, share with loved ones, and create your digital legacy.
        </Text>

        {/* Beta Badge */}
        <View className="flex-row items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
          <View className="w-2 h-2 rounded-full bg-emerald-500" />
          <Text className="text-white/80 text-sm font-medium">Now in Public Beta</Text>
        </View>
      </Animated.View>
    </View>
  );
}

interface FeatureSlideProps {
  feature: FeatureSlide;
  isActive: boolean;
  width: number;
  height: number;
}

function FeatureSlide({ feature, isActive, width, height }: FeatureSlideProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (isActive) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(30);
    }
  }, [isActive]);

  return (
    <View className="justify-center items-center px-8" style={{ width, height }}>
      <Animated.View
        className="items-center max-w-[320px]"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Icon Container with gradient background */}
        <View
          className="w-[140px] h-[140px] rounded-full justify-center items-center mb-12 border-2"
          style={{
            backgroundColor: `${feature.gradientColors[0]}25`,
            borderColor: `${feature.gradientColors[0]}40`,
          }}
        >
          <Text className="text-[72px]">{feature.icon}</Text>
        </View>

        {/* Title */}
        <Text className="text-[40px] font-bold text-white text-center mb-6 leading-[48px]">
          {feature.title}
        </Text>

        {/* Description */}
        <Text className="text-lg text-white/80 text-center leading-[28px]">
          {feature.description}
        </Text>
      </Animated.View>
    </View>
  );
}

interface FinalSlideProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  isActive: boolean;
  width: number;
  height: number;
}

function FinalSlide({ onGetStarted, onSignIn, isActive, width, height }: FinalSlideProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (isActive) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [isActive]);

  return (
    <View className="justify-center w-full items-center px-8" style={{ width, height }}>
      <Animated.View
        className="items-center w-full"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {/* Logo */}
        <View
          className="w-[100px] h-[100px] rounded-[30px] bg-emerald-500 justify-center items-center mb-10"
          style={{
            shadowColor: '#10b981',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.5,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          <Text className="text-white text-[40px] font-bold">MV</Text>
        </View>

        {/* Title */}
        <Text className="text-[40px] font-bold text-white text-center mb-4">
          Ready to Start?
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-white/70 text-center leading-[28px] mb-12">
          Join MemoryVault and start preserving your most precious moments today.
        </Text>

        {/* CTA Buttons */}
        <View className="w-full px-1">
          <TouchableOpacity
            onPress={onGetStarted}
            className="w-full py-4 rounded-2xl bg-white items-center justify-center mb-3"
            activeOpacity={0.9}
            style={{
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text className="text-black text-[17px] font-bold tracking-wider">
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSignIn}
            className="w-full py-4 rounded-2xl bg-transparent border-[1.5px] border-white/40 items-center justify-center"
            activeOpacity={0.8}
          >
            <Text className="text-white text-[17px] font-semibold tracking-wide">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
