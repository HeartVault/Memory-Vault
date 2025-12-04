'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { StoriesBar } from './StoriesBar';
import { FeedPost } from './FeedPost';
import { RightSidebar } from './RightSidebar';
import { MOCK_EXPLORE_POSTS } from '@/src/constants/mocks';

export function ExplorePage() {
  const [posts, setPosts] = useState(MOCK_EXPLORE_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);

  const loadMorePosts = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Shuffle and add more posts (simulating random posts)
    const shuffled = [...MOCK_EXPLORE_POSTS].sort(() => Math.random() - 0.5);
    const newPosts = shuffled.map((post, index) => ({
      ...post,
      id: `${post.id}-${Date.now()}-${index}`,
    }));

    setPosts(prev => [...prev, ...newPosts]);
    setIsLoading(false);
    loadingRef.current = false;
  }, []);

  useEffect(() => {
    // Shuffle initial posts for randomness
    const shuffled = [...MOCK_EXPLORE_POSTS].sort(() => Math.random() - 0.5);
    setPosts(shuffled);
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
    <>
      <div className="w-full flex  justify-center pt-6 pb-8 px-4">
        <div className=" w-full max-w-2xl mx-auto ">
          {/* Stories */}
          <StoriesBar />

          {/* Feed */}
          <div className="space-y-0">
            {posts.map((post) => (
              <FeedPost key={post.id} {...post} />
            ))}
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
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </>
  );
}
