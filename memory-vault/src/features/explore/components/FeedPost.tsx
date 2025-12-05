import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { type ExplorePost } from '@/src/constants/mocks';

interface FeedPostProps {
  post: ExplorePost;
  index: number;
}

export function FeedPost({ post, index }: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 100,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 100,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Animated.View
      className="mb-6 bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden"
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim },
        ],
      }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-emerald-500 items-center justify-center">
            <Text className="text-white font-bold text-sm">
              {post.author.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <View className="flex-row items-center gap-1">
              <Text className="text-white font-semibold text-sm">{post.author.username}</Text>
              {post.author.isVerified && (
                <MaterialIcons name="verified" size={14} color="#10b981" />
              )}
            </View>
            {post.location && (
              <Text className="text-gray-400 text-xs">{post.location}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Media */}
      <View className="w-full aspect-square bg-black">
        <Image
          source={{ uri: post.imageUrl || 'https://picsum.photos/800' }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Actions */}
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={handleLike} activeOpacity={0.7}>
              <MaterialIcons
                name={isLiked ? 'favorite' : 'favorite-border'}
                size={26}
                color={isLiked ? '#ef4444' : '#ffffff'}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <MaterialIcons name="chat-bubble-outline" size={26} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <MaterialIcons name="send" size={26} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setIsSaved(!isSaved)} activeOpacity={0.7}>
            <MaterialIcons
              name={isSaved ? 'bookmark' : 'bookmark-border'}
              size={26}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>

        {/* Likes */}
        <Text className="text-white font-semibold text-sm mb-2">
          {likeCount.toLocaleString()} likes
        </Text>

        {/* Caption */}
        <View className="mb-2">
          <Text className="text-white text-sm">
            <Text className="font-semibold">{post.author.username} </Text>
            {post.caption}
          </Text>
        </View>

        {/* Comments */}
        {post.comments > 0 && (
          <TouchableOpacity className="mb-2">
            <Text className="text-gray-400 text-sm">
              View all {post.comments} comments
            </Text>
          </TouchableOpacity>
        )}

        {/* Timestamp */}
        <Text className="text-gray-400 text-xs uppercase">{post.timestamp}</Text>
      </View>
    </Animated.View>
  );
}

