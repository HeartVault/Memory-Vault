import { View, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
import { StoriesBar } from './StoriesBar';
import { FeedPost } from './FeedPost';
import { MOCK_EXPLORE_POSTS, type ExplorePost } from '@/src/constants/mocks';

export function ExplorePage() {
  const [posts, setPosts] = useState<ExplorePost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Shuffle initial posts for randomness
    const shuffled = [...MOCK_EXPLORE_POSTS].sort(() => Math.random() - 0.5);
    setPosts(shuffled);

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const shuffled = [...MOCK_EXPLORE_POSTS].sort(() => Math.random() - 0.5);
    setPosts(shuffled);
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
          {/* Stories */}
          <StoriesBar />

          {/* Feed */}
          <View className="pb-24">
            {posts.map((post, index) => (
              <FeedPost key={post.id} post={post} index={index} />
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

