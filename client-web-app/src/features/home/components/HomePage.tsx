'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { HomeFeedPost, type HomeFeedPostData } from './HomeFeedPost';
import { StoriesBar } from '@/src/features/explore/components/StoriesBar';
import { MOCK_HOME_FEED_POSTS } from '@/src/constants/mocks';

export function HomePage() {
  const [posts, setPosts] = useState<HomeFeedPostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);

  const loadMorePosts = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add more posts from mock data
    const shuffled = [...MOCK_HOME_FEED_POSTS].sort(() => Math.random() - 0.5);
    const newPosts = shuffled.map((post, index) => ({
      ...post,
      id: `${post.id}-${Date.now()}-${index}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last 7 days
    }));

    setPosts(prev => [...prev, ...newPosts]);
    setIsLoading(false);
    loadingRef.current = false;
  }, []);

  useEffect(() => {
    // Initial load - weighted by type and category
    const sortedPosts = [...MOCK_HOME_FEED_POSTS].sort((a, b) => {
      // Weight: Family Memories > Friends Memories > Family Moments > Friends Moments > Own
      const weightA = 
        (a.category === 'family' && a.type === 'memory' ? 5 : 0) +
        (a.category === 'friends' && a.type === 'memory' ? 4 : 0) +
        (a.category === 'family' && a.type === 'moment' ? 3 : 0) +
        (a.category === 'friends' && a.type === 'moment' ? 2 : 0) +
        (a.category === 'own' ? 1 : 0);

      const weightB = 
        (b.category === 'family' && b.type === 'memory' ? 5 : 0) +
        (b.category === 'friends' && b.type === 'memory' ? 4 : 0) +
        (b.category === 'family' && b.type === 'moment' ? 3 : 0) +
        (b.category === 'friends' && b.type === 'moment' ? 2 : 0) +
        (b.category === 'own' ? 1 : 0);

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
    <div className="max-w-2xl mx-auto pt-6 pb-8">
      {/* Stories */}
      <StoriesBar />

      {/* Welcome Message */}
      <div className="mb-6 px-4">
        <h1 className="text-2xl font-bold text-white mb-1">Home</h1>
        <p className="text-gray-400 text-sm">
          Your personal feed from family and friends
        </p>
      </div>

      {/* Feed */}
      <div className="space-y-0">
        {posts.length > 0 ? (
          posts.map((post) => (
            <HomeFeedPost key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">No posts yet</h3>
            <p className="text-gray-400 text-sm mb-4">
              Start following family and friends to see their posts here
            </p>
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading more posts...</p>
          </div>
        </div>
      )}
    </div>
  );
}

