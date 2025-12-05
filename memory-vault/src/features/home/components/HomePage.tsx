import { View, ScrollView, RefreshControl, Text } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native';

export function HomePage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]" edges={['top']}>
      <Animated.View
        className="flex-1"
        style={{
          opacity: fadeAnim,
        }}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor="#10b981"
              colors={['#10b981']}
            />
          }
        >
          <View className="items-center justify-center flex-1 py-20 pb-24">
            <Text className="text-white text-xl font-semibold">Home Feed</Text>
            <Text className="text-gray-400 text-sm mt-2">Coming soon...</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

