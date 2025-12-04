'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Users, Unlock } from 'lucide-react';
import { FriendsFeedPost, type FriendsFeedPostData } from './FriendsFeedPost';
import { StoriesBar } from '@/src/features/explore/components/StoriesBar';
import { MOCK_FRIENDS_FEED_POSTS } from '@/src/constants/mocks';

export function FriendsFeedPage() {
  const [posts, setPosts] = useState<FriendsFeedPostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);

  const loadMorePosts = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add more posts from mock data
    const shuffled = [...MOCK_FRIENDS_FEED_POSTS].sort(() => Math.random() - 0.5);
    const newPosts = shuffled.map((post, index) => ({
      ...post,
      id: `${post.id}-${Date.now()}-${index}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    }));

    setPosts(prev => [...prev, ...newPosts]);
    setIsLoading(false);
    loadingRef.current = false;
  }, []);

  // Get recent capsule unlocks (within last 7 days)
  const recentCapsuleUnlocks = useMemo(() => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return posts.filter(
      (post) =>
        post.fromCapsule &&
        post.timestamp >= sevenDaysAgo &&
        post.timestamp <= new Date()
    );
  }, [posts]);

  useEffect(() => {
    // Initial load - sorted by priority: Friends' Memories > Capsule Unlocks > Tagged Memories > Moments > Your Recent
    const sortedPosts = [...MOCK_FRIENDS_FEED_POSTS].sort((a, b) => {
      // Priority weight
      const weightA = 
        (a.type === 'memory' && !a.isTagged ? 5 : 0) +
        (a.fromCapsule ? 4 : 0) +
        (a.isTagged ? 4 : 0) +
        (a.type === 'moment' ? 2 : 0) +
        (a.author.username === 'you' ? 1 : 0);

      const weightB = 
        (b.type === 'memory' && !b.isTagged ? 5 : 0) +
        (b.fromCapsule ? 4 : 0) +
        (b.isTagged ? 4 : 0) +
        (b.type === 'moment' ? 2 : 0) +
        (b.author.username === 'you' ? 1 : 0);

      // Sort by weight first, then by timestamp (newest first)
      if (weightA !== weightB) {
        return weightB - weightA;
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

    setPosts(sortedPosts);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 1000) {
        if (!loadingRef.current) {
          loadMorePosts();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  return (
    <div className="max-w-2xl mx-auto pt-6 pb-8 px-4">
      {/* Header */}
      <div className="mb-6 px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Friends Feed</h1>
            <p className="text-gray-400 text-sm">
              Casual updates and memories from your friends
            </p>
          </div>
        </div>
      </div>

      {/* Stories */}
      <StoriesBar />

      {/* Capsule Unlock Banner */}
      {recentCapsuleUnlocks.length > 0 && (
        <div className="mb-6 px-4">
          <div className="glass rounded-xl border border-blue-500/30 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Unlock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Recent Capsule Unlock{recentCapsuleUnlocks.length > 1 ? 's' : ''}</h3>
                <p className="text-gray-400 text-sm">
                  {recentCapsuleUnlocks.length === 1
                    ? 'A time capsule has been unlocked and shared with your friends!'
                    : `${recentCapsuleUnlocks.length} time capsules have been unlocked and shared with your friends!`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feed */}
      <div className="space-y-0">
        {posts.length > 0 ? (
          posts.map((post) => (
            <FriendsFeedPost key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">No friend posts yet</h3>
            <p className="text-gray-400 text-sm mb-4">
              Connect with friends to see their updates and memories here
            </p>
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading more posts...</p>
          </div>
        </div>
      )}
    </div>
  );
}

