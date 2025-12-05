import { View, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
  footerLinkText,
}: AuthLayoutProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const { width, height } = useWindowDimensions();

  useEffect(() => {
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
  }, []);

  return (
    <View className="flex-1 bg-[#0a0a0a]">
      {/* Background gradients */}
      <View
        className="absolute bg-emerald-500 rounded-full opacity-[0.1]"
        style={{
          top: -height * 0.3,
          left: -width * 0.2,
          width: width * 1.4,
          height: height * 0.8,
        }}
      />
      <View
        className="absolute bg-blue-500 rounded-full opacity-[0.08]"
        style={{
          bottom: -height * 0.3,
          right: -width * 0.2,
          width: width * 1.4,
          height: height * 0.8,
        }}
      />

      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 z-20 px-4 py-2"
            activeOpacity={0.7}
          >
            <Text className="text-white/70 text-base"> Back</Text>
          </TouchableOpacity>

          {/* Content */}
          <Animated.View
            className="flex-1 justify-center gap-3 px-2 py-2"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              minHeight: height - 100,
            }}
          >
            <View className="bg-white/5 rounded-3xl border border-white/10 p-4 shadow-2xl">
              {/* Logo/Brand */}
              <View className="items-center mb-8">
                <TouchableOpacity onPress={() => router.push('/')}>
                  <View className="flex-row">
                    <Text className="text-3xl font-bold text-emerald-400">Memory</Text>
                    <Text className="text-3xl font-bold text-cyan-400">Vault</Text>
                  </View>
                </TouchableOpacity>
                <Text className="text-2xl font-semibold text-white mt-4 mb-2 text-center">
                  {title}
                </Text>
                <Text className="text-gray-400 text-sm text-center">{subtitle}</Text>
              </View>

              {/* Form content */}
              {children}

              {/* Footer */}
              <View className="mt-6 items-center">
                <View className="flex-row items-center justify-center">
                  <Text className="text-sm text-gray-400">{footerText} </Text>
                  <TouchableOpacity
                    onPress={() => router.push(footerLink as any)}
                    activeOpacity={0.7}
                  >
                    <Text className="text-sm text-emerald-400 font-medium">{footerLinkText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

