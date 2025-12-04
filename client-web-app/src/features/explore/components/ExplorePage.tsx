'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { StoriesBar } from './StoriesBar';
import { FeedPost } from './FeedPost';
import { RightSidebar } from './RightSidebar';

// Mock data - only posts (no memories) for the "All" page
const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      username: 'sarahj',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    caption: 'Beautiful moments captured during our annual family gathering. Three generations together, creating memories that will last forever. #family #summer #reunion',
    likes: 124,
    comments: 23,
    timestamp: '2 HOURS AGO',
    location: 'Lake Tahoe, CA',
  },
  {
    id: '2',
    author: {
      name: 'Emily Rodriguez',
      username: 'emilyr',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    caption: 'My little one\'s first day of kindergarten. Time flies so fast, but these memories will be preserved forever. #family #school #milestone',
    likes: 256,
    comments: 45,
    timestamp: '5 HOURS AGO',
    location: 'Austin, TX',
  },
  {
    id: '3',
    author: {
      name: 'David & Lisa Thompson',
      username: 'thompsons',
    },
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    caption: '10 years together, and counting. I love you more every day. #love #anniversary',
    likes: 312,
    comments: 67,
    timestamp: '1 DAY AGO',
    location: 'Napa Valley, CA',
  },
  {
    id: '4',
    author: {
      name: 'Maria Garcia',
      username: 'mariag',
    },
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    caption: 'Preserving generations of family recipes. These are the flavors of my childhood, now saved for my children. #family #recipes #heritage',
    likes: 178,
    comments: 34,
    timestamp: '2 DAYS AGO',
  },
  {
    id: '5',
    author: {
      name: 'James Wilson',
      username: 'jwilson',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    caption: 'Sun, sand, and unforgettable moments with the family. These are the days we\'ll remember forever. #vacation #family #beach',
    likes: 95,
    comments: 18,
    timestamp: '3 DAYS AGO',
    location: 'Miami Beach, FL',
  },
  {
    id: '6',
    author: {
      name: 'Alex Chen',
      username: 'alexc',
    },
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    caption: 'Celebrating another year of life, love, and laughter. Grateful for all the beautiful memories. #birthday #celebration',
    likes: 142,
    comments: 28,
    timestamp: '4 DAYS AGO',
  },
];

export function ExplorePage() {
  const [posts, setPosts] = useState(mockPosts);
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);

  const loadMorePosts = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Shuffle and add more posts (simulating random posts)
    const shuffled = [...mockPosts].sort(() => Math.random() - 0.5);
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
    const shuffled = [...mockPosts].sort(() => Math.random() - 0.5);
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
      <div className="max-w-2xl mx-auto pt-6 pb-8 lg:mr-80">
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

      {/* Right Sidebar */}
      <RightSidebar />
    </>
  );
}
