import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { MOCK_STORIES, type Story } from '@/src/constants/mocks';

export function StoriesBar() {
  return (
    <View className="mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 16 }}
      >
        {MOCK_STORIES.map((story, index) => (
          <StoryItem key={story.id} story={story} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

interface StoryItemProps {
  story: Story;
  index: number;
}

function StoryItem({ story, index }: StoryItemProps) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 50,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        delay: index * 50,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.8} className="items-center gap-2">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: fadeAnim,
        }}
      >
        <View
          className={`w-16 h-16 rounded-full ${
            story.isViewed
              ? 'border-2 border-gray-600'
              : 'border-2 border-emerald-500'
          } p-0.5`}
        >
          <View className="w-full h-full rounded-full bg-[#0a0a0a] p-0.5">
            <View className="w-full h-full rounded-full bg-emerald-500 items-center justify-center">
              <Text className="text-white text-sm font-bold">
                {story.username.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
      <Text className="text-white/70 text-xs max-w-[64px]" numberOfLines={1}>
        {story.username}
      </Text>
    </TouchableOpacity>
  );
}
