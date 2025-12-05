// Mock data for mobile app - Shared with web app structure

export interface Story {
  id: string;
  username: string;
  avatar?: string;
  isViewed: boolean;
}

export interface ExplorePost {
  id: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    isVerified?: boolean;
  };
  imageUrl?: string;
  videoUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  location?: string;
}

export interface HomeFeedPostData {
  id: string;
  type: 'memory' | 'moment';
  category: 'family' | 'friends' | 'own';
  author: {
    name: string;
    username: string;
    avatar?: string;
    isVerified?: boolean;
  };
  imageUrl?: string;
  videoUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: Date;
  location?: string;
  year?: string;
  taggedPeople?: string[];
  expiration?: string;
}

export interface TimeCapsule {
  id: string;
  title: string;
  description?: string;
  unlockDate: Date;
  createdAt: Date;
  coverImage?: string;
  mediaCount: {
    photos: number;
    videos: number;
    audio: number;
    letters: number;
  };
  sharedWith: string[];
  isUnlocked: boolean;
  createdBy: {
    username: string;
    avatar?: string;
  };
}

export interface Memory {
  id: string;
  title?: string;
  caption: string;
  imageUrl?: string;
  videoUrl?: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  date: Date;
  location?: string;
  year?: string;
  event?: string;
  taggedPeople?: string[];
  fromCapsule?: boolean;
  capsuleId?: string;
  likes: number;
  comments: number;
  category?: 'family' | 'friends';
}

export interface FamilyFeedPostData {
  id: string;
  type: 'memory' | 'moment';
  author: {
    name: string;
    username: string;
    avatar?: string;
    isVerified?: boolean;
  };
  imageUrl?: string;
  videoUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: Date;
  location?: string;
  year?: string;
  taggedPeople?: string[];
  fromCapsule?: boolean;
  capsuleId?: string;
  event?: string;
  visibility: 'family' | 'both';
}

export interface FriendsFeedPostData {
  id: string;
  type: 'memory' | 'moment';
  author: {
    name: string;
    username: string;
    avatar?: string;
    isVerified?: boolean;
  };
  imageUrl?: string;
  videoUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: Date;
  location?: string;
  year?: string;
  taggedPeople?: string[];
  fromCapsule?: boolean;
  capsuleId?: string;
  event?: string;
  visibility: 'friends' | 'both';
}

// Mock Data Arrays
export const MOCK_STORIES: Story[] = Array.from({ length: 10 }, (_, i) => ({
  id: `story-${i + 1}`,
  username: `user${i + 1}`,
  isViewed: i > 5,
}));

export const MOCK_EXPLORE_POSTS: ExplorePost[] = Array.from({ length: 15 }, (_, i) => ({
  id: `post-${i + 1}`,
  author: {
    name: `User ${i + 1}`,
    username: `user${i + 1}`,
    isVerified: i % 3 === 0,
  },
  imageUrl: `https://picsum.photos/800/800?random=${i + 1}`,
  caption: `Beautiful moment ${i + 1} captured! This is an amazing memory worth preserving.`,
  likes: Math.floor(Math.random() * 500) + 50,
  comments: Math.floor(Math.random() * 100) + 10,
  timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  location: i % 2 === 0 ? 'New York, NY' : undefined,
}));

export const MOCK_HOME_FEED_POSTS: HomeFeedPostData[] = Array.from({ length: 15 }, (_, i) => ({
  id: `home-${i + 1}`,
  type: i % 2 === 0 ? 'memory' : 'moment',
  category: ['family', 'friends', 'own'][i % 3] as 'family' | 'friends' | 'own',
  author: {
    name: `User ${i + 1}`,
    username: `user${i + 1}`,
    isVerified: i % 3 === 0,
  },
  imageUrl: `https://picsum.photos/800/800?random=${i + 100}`,
  caption: `This is a ${i % 2 === 0 ? 'memory' : 'moment'} post ${i + 1}`,
  likes: Math.floor(Math.random() * 500) + 50,
  comments: Math.floor(Math.random() * 100) + 10,
  timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  location: i % 2 === 0 ? 'San Francisco, CA' : undefined,
  year: i % 2 === 0 ? '2024' : undefined,
  taggedPeople: i % 2 === 0 ? [`user${i + 2}`, `user${i + 3}`] : undefined,
  expiration: i % 2 === 1 ? '24h' : undefined,
}));

export const MOCK_TIME_CAPSULES: TimeCapsule[] = Array.from({ length: 15 }, (_, i) => ({
  id: `capsule-${i + 1}`,
  title: `Time Capsule ${i + 1}`,
  description: `A special capsule for future memories ${i + 1}`,
  unlockDate: new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000),
  createdAt: new Date(Date.now() - i * 10 * 24 * 60 * 60 * 1000),
  coverImage: `https://picsum.photos/400/400?random=${i + 200}`,
  mediaCount: {
    photos: Math.floor(Math.random() * 20) + 5,
    videos: Math.floor(Math.random() * 5),
    audio: Math.floor(Math.random() * 3),
    letters: Math.floor(Math.random() * 5),
  },
  sharedWith: [`user${i + 2}`, `user${i + 3}`],
  isUnlocked: i > 10,
  createdBy: {
    username: `user${i + 1}`,
  },
}));

export const MOCK_MEMORIES: Memory[] = Array.from({ length: 15 }, (_, i) => ({
  id: `memory-${i + 1}`,
  caption: `This is a beautiful memory ${i + 1} worth preserving forever.`,
  imageUrl: `https://picsum.photos/800/800?random=${i + 300}`,
  author: {
    name: `User ${i + 1}`,
    username: `user${i + 1}`,
  },
  date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000),
  location: i % 2 === 0 ? 'Los Angeles, CA' : undefined,
  year: '2024',
  event: i % 3 === 0 ? 'Birthday' : i % 3 === 1 ? 'Anniversary' : undefined,
  taggedPeople: [`user${i + 2}`],
  fromCapsule: i > 12,
  capsuleId: i > 12 ? `capsule-${i - 12}` : undefined,
  likes: Math.floor(Math.random() * 500) + 50,
  comments: Math.floor(Math.random() * 100) + 10,
  category: i % 2 === 0 ? 'family' : 'friends',
}));

export const MOCK_FAMILY_FEED_POSTS: FamilyFeedPostData[] = Array.from({ length: 15 }, (_, i) => ({
  id: `family-${i + 1}`,
  type: i % 2 === 0 ? 'memory' : 'moment',
  author: {
    name: `Family Member ${i + 1}`,
    username: `family${i + 1}`,
    isVerified: true,
  },
  imageUrl: `https://picsum.photos/800/800?random=${i + 400}`,
  caption: `Family moment ${i + 1} - creating memories together!`,
  likes: Math.floor(Math.random() * 300) + 50,
  comments: Math.floor(Math.random() * 50) + 10,
  timestamp: new Date(Date.now() - i * 2 * 60 * 60 * 1000),
  location: 'Home',
  year: '2024',
  taggedPeople: [`family${i + 2}`],
  fromCapsule: i === 0,
  capsuleId: i === 0 ? 'capsule-1' : undefined,
  event: i % 3 === 0 ? 'Family Gathering' : undefined,
  visibility: i % 2 === 0 ? 'family' : 'both',
}));

export const MOCK_FRIENDS_FEED_POSTS: FriendsFeedPostData[] = Array.from({ length: 15 }, (_, i) => ({
  id: `friend-${i + 1}`,
  type: i % 2 === 0 ? 'memory' : 'moment',
  author: {
    name: `Friend ${i + 1}`,
    username: `friend${i + 1}`,
  },
  imageUrl: `https://picsum.photos/800/800?random=${i + 500}`,
  caption: `Friend moment ${i + 1} - having fun together!`,
  likes: Math.floor(Math.random() * 400) + 50,
  comments: Math.floor(Math.random() * 80) + 10,
  timestamp: new Date(Date.now() - i * 3 * 60 * 60 * 1000),
  location: 'Coffee Shop',
  year: '2024',
  taggedPeople: [`friend${i + 2}`],
  fromCapsule: i === 1,
  capsuleId: i === 1 ? 'capsule-2' : undefined,
  event: i % 4 === 0 ? 'Friends Reunion' : undefined,
  visibility: i % 2 === 0 ? 'friends' : 'both',
}));
