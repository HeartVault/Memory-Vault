// Mock data for development and UI demonstration
// In production, this would be replaced with API calls

// Types (re-exported for convenience)
export interface Story {
  id: string;
  username: string;
  avatar?: string;
  isViewed: boolean;
}

export interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  isVerified?: boolean;
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

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    isVerified?: boolean;
    isOnline?: boolean;
    category: 'family' | 'friend';
  };
  lastMessage: {
    text: string;
    timestamp: Date;
    isRead: boolean;
    senderId: string;
  };
  unreadCount: number;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'video';
  mediaUrl?: string;
}

export interface Memory {
  id: string;
  caption: string;
  imageUrl?: string;
  videoUrl?: string;
  timestamp: Date;
  location?: string;
  year: string;
  taggedPeople?: string[];
  visibility: 'family' | 'friends' | 'private';
  isPinned?: boolean;
  fromCapsule?: boolean;
  capsuleId?: string;
  event?: string;
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
  isTagged?: boolean;
}

// Mock Data

export const MOCK_STORIES: Story[] = [
  { id: '1', username: 'sarahj', isViewed: false },
  { id: '2', username: 'mchen', isViewed: false },
  { id: '3', username: 'emilyr', isViewed: true },
  { id: '4', username: 'dthompson', isViewed: false },
  { id: '5', username: 'mariag', isViewed: true },
  { id: '6', username: 'jwilson', isViewed: false },
  { id: '7', username: 'alexc', isViewed: false },
  { id: '8', username: 'jmartinez', isViewed: false },
  { id: '9', username: 'rbrown', isViewed: true },
  { id: '10', username: 'landerson', isViewed: false },
  { id: '11', username: 'clee', isViewed: false },
  { id: '12', username: 'pwilliams', isViewed: true },
  { id: '13', username: 'jtaylor', isViewed: false },
  { id: '14', username: 'msmith', isViewed: false },
  { id: '15', username: 'rdavis', isViewed: true },
];

export const MOCK_SUGGESTED_USERS: SuggestedUser[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahj',
    isVerified: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    username: 'mchen',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    username: 'emilyr',
    isVerified: true,
  },
  {
    id: '4',
    name: 'David Thompson',
    username: 'dthompson',
  },
  {
    id: '5',
    name: 'Maria Garcia',
    username: 'mariag',
  },
  {
    id: '6',
    name: 'James Wilson',
    username: 'jwilson',
    isVerified: true,
  },
  {
    id: '7',
    name: 'Alex Chen',
    username: 'alexc',
  },
  {
    id: '8',
    name: 'Jessica Martinez',
    username: 'jmartinez',
    isVerified: true,
  },
  {
    id: '9',
    name: 'Robert Brown',
    username: 'rbrown',
  },
  {
    id: '10',
    name: 'Lisa Anderson',
    username: 'landerson',
    isVerified: true,
  },
  {
    id: '11',
    name: 'Chris Lee',
    username: 'clee',
  },
  {
    id: '12',
    name: 'Patricia Williams',
    username: 'pwilliams',
  },
  {
    id: '13',
    name: 'Jennifer Taylor',
    username: 'jtaylor',
    isVerified: true,
  },
  {
    id: '14',
    name: 'Mark Smith',
    username: 'msmith',
  },
  {
    id: '15',
    name: 'Rachel Davis',
    username: 'rdavis',
    isVerified: true,
  },
];

export const MOCK_EXPLORE_POSTS: ExplorePost[] = [
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
  {
    id: '7',
    author: {
      name: 'Jessica Martinez',
      username: 'jmartinez',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    caption: 'College reunion after 5 years! Still the same amazing people. #college #friends #reunion',
    likes: 278,
    comments: 56,
    timestamp: '6 HOURS AGO',
    location: 'Boston, MA',
  },
  {
    id: '8',
    author: {
      name: 'Robert Brown',
      username: 'rbrown',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800',
    caption: 'Weekend vibes! Just living in the moment and enjoying life. #weekend #vibes',
    likes: 73,
    comments: 15,
    timestamp: '8 HOURS AGO',
    location: 'Portland, OR',
  },
  {
    id: '9',
    author: {
      name: 'Lisa Anderson',
      username: 'landerson',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    caption: 'Nature\'s beauty never fails to amaze me. Feeling grateful for these peaceful moments. #nature #grateful',
    likes: 192,
    comments: 41,
    timestamp: '1 DAY AGO',
    location: 'Grand Canyon, AZ',
  },
  {
    id: '10',
    author: {
      name: 'Chris Lee',
      username: 'clee',
    },
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
    caption: 'Perfect day for some outdoor adventures! 🌲',
    likes: 84,
    comments: 22,
    timestamp: '1 DAY AGO',
    location: 'Seattle, WA',
  },
  {
    id: '11',
    author: {
      name: 'Patricia Williams',
      username: 'pwilliams',
    },
    imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
    caption: 'Celebrating my grandmother\'s 90th birthday! Three generations of strong women. #family #birthday #love',
    likes: 521,
    comments: 134,
    timestamp: '2 DAYS AGO',
    location: 'Chicago, IL',
  },
  {
    id: '12',
    author: {
      name: 'Jennifer Taylor',
      username: 'jtaylor',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    caption: '10 years of friendship! Through thick and thin, these amazing people have been my rock. #friendship #grateful',
    likes: 389,
    comments: 78,
    timestamp: '2 DAYS AGO',
    location: 'Denver, CO',
  },
  {
    id: '13',
    author: {
      name: 'Mark Smith',
      username: 'msmith',
    },
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    caption: 'Sunrise hike was worth the early wake-up call! 🌅',
    likes: 156,
    comments: 32,
    timestamp: '3 DAYS AGO',
    location: 'Yosemite, CA',
  },
  {
    id: '14',
    author: {
      name: 'Rachel Davis',
      username: 'rdavis',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    caption: 'Finding peace in the simple moments. Morning walk through the park. ☀️',
    likes: 98,
    comments: 21,
    timestamp: '3 DAYS AGO',
    location: 'Seattle, WA',
  },
  {
    id: '15',
    author: {
      name: 'Thomas Moore',
      username: 'tmoore',
    },
    imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800',
    caption: 'City lights never looked so good. Night walks hit different. ✨',
    likes: 167,
    comments: 38,
    timestamp: '4 DAYS AGO',
    location: 'New York, NY',
  },
];

export const MOCK_HOME_FEED_POSTS: HomeFeedPostData[] = [
  {
    id: '1',
    type: 'memory',
    category: 'family',
    author: {
      name: 'Sarah Johnson',
      username: 'sarahj',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    caption: 'Beautiful moments captured during our annual family gathering. Three generations together, creating memories that will last forever. #family #summer #reunion',
    likes: 124,
    comments: 23,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    location: 'Lake Tahoe, CA',
    year: '2024',
    taggedPeople: ['emilyr', 'dthompson'],
  },
  {
    id: '2',
    type: 'memory',
    category: 'family',
    author: {
      name: 'Emily Rodriguez',
      username: 'emilyr',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    caption: 'My little one\'s first day of kindergarten. Time flies so fast, but these memories will be preserved forever. #family #school #milestone',
    likes: 256,
    comments: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    location: 'Austin, TX',
    year: '2024',
    taggedPeople: ['sarahj'],
  },
  {
    id: '3',
    type: 'moment',
    category: 'friends',
    author: {
      name: 'Michael Chen',
      username: 'mchen',
    },
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    caption: 'Just had the best coffee! ☕ Starting the day right!',
    likes: 42,
    comments: 8,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    location: 'San Francisco, CA',
    expiration: '24h',
  },
  {
    id: '4',
    type: 'moment',
    category: 'family',
    author: {
      name: 'Maria Garcia',
      username: 'mariag',
    },
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    caption: 'Sunday baking session with the kids! 🍪',
    likes: 89,
    comments: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    expiration: '7d',
  },
  {
    id: '5',
    type: 'memory',
    category: 'friends',
    author: {
      name: 'David Thompson',
      username: 'dthompson',
    },
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    caption: '10 years together, and counting. I love you more every day. #love #anniversary',
    likes: 312,
    comments: 67,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    location: 'Napa Valley, CA',
    year: '2024',
    taggedPeople: ['thompsons'],
  },
  {
    id: '6',
    type: 'moment',
    category: 'own',
    author: {
      name: 'You',
      username: 'you',
    },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    caption: 'Beautiful sunset today! 🌅',
    likes: 15,
    comments: 3,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    location: 'Miami Beach, FL',
  },
  {
    id: '7',
    type: 'memory',
    category: 'family',
    author: {
      name: 'James Wilson',
      username: 'jwilson',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800',
    caption: 'Four generations in one photo. This is what legacy looks like. Forever grateful for this moment. #family #generations #legacy',
    likes: 445,
    comments: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    location: 'New York, NY',
    year: '2024',
    taggedPeople: ['sarahj', 'emilyr', 'mariag'],
  },
  {
    id: '8',
    type: 'moment',
    category: 'friends',
    author: {
      name: 'Alex Chen',
      username: 'alexc',
    },
    imageUrl: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=800',
    caption: 'Weekend vibes with the squad! 🎉',
    likes: 67,
    comments: 14,
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    location: 'Los Angeles, CA',
    expiration: '24h',
  },
  {
    id: '9',
    type: 'memory',
    category: 'friends',
    author: {
      name: 'Jessica Martinez',
      username: 'jmartinez',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    caption: 'College reunion after 5 years! Still the same amazing people. #college #friends #reunion',
    likes: 278,
    comments: 56,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    location: 'Boston, MA',
    year: '2024',
    taggedPeople: ['mchen', 'alexc'],
  },
  {
    id: '10',
    type: 'moment',
    category: 'family',
    author: {
      name: 'Robert Brown',
      username: 'rbrown',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800',
    caption: 'Pizza night with the family! 🍕',
    likes: 95,
    comments: 19,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    expiration: '7d',
  },
  {
    id: '11',
    type: 'memory',
    category: 'family',
    author: {
      name: 'Lisa Anderson',
      username: 'landerson',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    caption: 'Our family\'s first trip to the Grand Canyon. The kids were in awe, and so were we. Nature\'s beauty captured forever. #family #adventure #nature',
    likes: 334,
    comments: 72,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    location: 'Grand Canyon, AZ',
    year: '2024',
    taggedPeople: ['rbrown'],
  },
  {
    id: '12',
    type: 'moment',
    category: 'friends',
    author: {
      name: 'Chris Lee',
      username: 'clee',
    },
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
    caption: 'Game night! 🎮',
    likes: 52,
    comments: 11,
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    expiration: '24h',
  },
  {
    id: '13',
    type: 'memory',
    category: 'family',
    author: {
      name: 'Patricia Williams',
      username: 'pwilliams',
    },
    imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
    caption: 'My grandmother\'s 90th birthday celebration. Three generations of strong women. These memories are our greatest treasure. #family #birthday #love',
    likes: 521,
    comments: 134,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
    location: 'Chicago, IL',
    year: '2024',
    taggedPeople: ['sarahj', 'emilyr'],
  },
  {
    id: '14',
    type: 'moment',
    category: 'own',
    author: {
      name: 'You',
      username: 'you',
    },
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    caption: 'Morning walk through the park. Finding peace in the simple moments. ☀️',
    likes: 28,
    comments: 5,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    location: 'Seattle, WA',
  },
  {
    id: '15',
    type: 'memory',
    category: 'friends',
    author: {
      name: 'Jennifer Taylor',
      username: 'jtaylor',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    caption: 'Celebrating 10 years of friendship! Through thick and thin, these amazing people have been my rock. Here\'s to many more years! #friendship #grateful #memories',
    likes: 389,
    comments: 78,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    location: 'Denver, CO',
    year: '2024',
    taggedPeople: ['mchen', 'dthompson', 'alexc'],
  },
];

export const MOCK_TIME_CAPSULES: TimeCapsule[] = [
  {
    id: '1',
    title: 'My 25th Birthday',
    description: 'A collection of memories from my 25th birthday celebration with friends and family.',
    unlockDate: new Date('2025-12-25T00:00:00'),
    createdAt: new Date('2024-01-15'),
    coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    mediaCount: { photos: 12, videos: 2, audio: 1, letters: 3 },
    sharedWith: ['sarahj', 'emilyr'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '2',
    title: 'College Graduation',
    description: 'Memories from my college graduation day and all the achievements.',
    unlockDate: new Date('2026-06-15T12:00:00'),
    createdAt: new Date('2024-02-20'),
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    mediaCount: { photos: 25, videos: 5, audio: 0, letters: 5 },
    sharedWith: ['mchen', 'dthompson', 'mariag'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '3',
    title: 'Summer 2024',
    description: 'All the amazing adventures from summer 2024.',
    unlockDate: new Date('2024-08-01T00:00:00'),
    createdAt: new Date('2024-07-01'),
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    mediaCount: { photos: 50, videos: 10, audio: 3, letters: 2 },
    sharedWith: ['alexc'],
    isUnlocked: true,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '4',
    title: 'New Year 2025',
    description: 'Welcoming the new year with hope and dreams.',
    unlockDate: new Date('2026-01-01T00:00:00'),
    createdAt: new Date('2024-12-31'),
    mediaCount: { photos: 8, videos: 1, audio: 0, letters: 1 },
    sharedWith: [],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '5',
    title: 'Family Reunion 2024',
    description: 'The best family reunion ever with three generations together.',
    unlockDate: new Date('2025-07-04T00:00:00'),
    createdAt: new Date('2024-07-04'),
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    mediaCount: { photos: 35, videos: 8, audio: 5, letters: 10 },
    sharedWith: ['sarahj', 'emilyr', 'mchen', 'dthompson', 'mariag'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '6',
    title: 'My First Job',
    description: 'Memories from starting my first professional job and all the experiences.',
    unlockDate: new Date('2026-03-01T00:00:00'),
    createdAt: new Date('2024-03-01'),
    coverImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
    mediaCount: { photos: 18, videos: 3, audio: 2, letters: 4 },
    sharedWith: ['mchen', 'dthompson'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '7',
    title: 'Wedding Day',
    description: 'The most beautiful day of my life, surrounded by love and family.',
    unlockDate: new Date('2027-06-15T00:00:00'),
    createdAt: new Date('2024-06-15'),
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    mediaCount: { photos: 150, videos: 12, audio: 8, letters: 25 },
    sharedWith: ['sarahj', 'emilyr', 'mariag', 'jmartinez', 'landerson'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '8',
    title: 'Trip to Japan',
    description: 'An unforgettable journey through Japan, capturing every moment.',
    unlockDate: new Date('2025-09-01T00:00:00'),
    createdAt: new Date('2024-09-01'),
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    mediaCount: { photos: 200, videos: 25, audio: 5, letters: 8 },
    sharedWith: ['alexc', 'clee'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '9',
    title: 'High School Graduation',
    description: 'The end of one chapter and the beginning of another.',
    unlockDate: new Date('2025-05-20T00:00:00'),
    createdAt: new Date('2024-05-20'),
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    mediaCount: { photos: 30, videos: 6, audio: 1, letters: 6 },
    sharedWith: ['jwilson', 'jtaylor'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '10',
    title: 'Baby\'s First Year',
    description: 'Every milestone, every smile, every moment of my baby\'s first year.',
    unlockDate: new Date('2026-01-01T00:00:00'),
    createdAt: new Date('2024-01-01'),
    coverImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    mediaCount: { photos: 365, videos: 50, audio: 30, letters: 52 },
    sharedWith: ['sarahj', 'emilyr', 'mariag', 'pwilliams'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '11',
    title: 'My 30th Birthday',
    description: 'Celebrating three decades of life with all my favorite people.',
    unlockDate: new Date('2026-08-10T00:00:00'),
    createdAt: new Date('2024-08-10'),
    coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    mediaCount: { photos: 45, videos: 8, audio: 3, letters: 15 },
    sharedWith: ['sarahj', 'emilyr', 'mchen', 'dthompson', 'mariag', 'alexc'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '12',
    title: 'Sister\'s Wedding',
    description: 'Watching my sister walk down the aisle was the most emotional moment.',
    unlockDate: new Date('2025-10-05T00:00:00'),
    createdAt: new Date('2024-10-05'),
    coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
    mediaCount: { photos: 120, videos: 15, audio: 4, letters: 10 },
    sharedWith: ['sarahj'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '13',
    title: 'Europe Backpacking Adventure',
    description: 'Three months exploring Europe with nothing but a backpack and a camera.',
    unlockDate: new Date('2026-07-01T00:00:00'),
    createdAt: new Date('2024-07-01'),
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    mediaCount: { photos: 500, videos: 40, audio: 10, letters: 20 },
    sharedWith: ['mchen', 'dthompson', 'clee'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '14',
    title: 'First Home Purchase',
    description: 'The keys to my first home. A milestone worth celebrating!',
    unlockDate: new Date('2027-01-15T00:00:00'),
    createdAt: new Date('2024-01-15'),
    coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    mediaCount: { photos: 60, videos: 10, audio: 2, letters: 5 },
    sharedWith: ['sarahj', 'emilyr', 'rbrown'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
  {
    id: '15',
    title: 'Dad\'s Retirement Party',
    description: 'Celebrating 40 years of hard work and dedication. So proud of you, Dad!',
    unlockDate: new Date('2025-11-30T00:00:00'),
    createdAt: new Date('2024-11-30'),
    coverImage: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800',
    mediaCount: { photos: 75, videos: 12, audio: 6, letters: 18 },
    sharedWith: ['sarahj', 'emilyr', 'mariag', 'landerson', 'pwilliams'],
    isUnlocked: false,
    createdBy: { username: 'johndoe' },
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    participant: {
      id: 'user1',
      name: 'Sarah Johnson',
      username: 'sarahj',
      isVerified: true,
      isOnline: true,
      category: 'family',
    },
    lastMessage: {
      text: 'Hey! Did you see the photos from the reunion?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false,
      senderId: 'user1',
    },
    unreadCount: 2,
  },
  {
    id: '2',
    participant: {
      id: 'user2',
      name: 'Emily Rodriguez',
      username: 'emilyr',
      isVerified: true,
      isOnline: false,
      category: 'family',
    },
    lastMessage: {
      text: 'Thanks for the birthday wishes! ❤️',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true,
      senderId: 'user2',
    },
    unreadCount: 0,
  },
  {
    id: '3',
    participant: {
      id: 'user3',
      name: 'Michael Chen',
      username: 'mchen',
      isOnline: true,
      category: 'friend',
    },
    lastMessage: {
      text: 'Let me know when you\'re free to hang out!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: false,
      senderId: 'user3',
    },
    unreadCount: 1,
  },
  {
    id: '4',
    participant: {
      id: 'user4',
      name: 'David Thompson',
      username: 'dthompson',
      isOnline: false,
      category: 'friend',
    },
    lastMessage: {
      text: 'The concert was amazing!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      isRead: true,
      senderId: 'user4',
    },
    unreadCount: 0,
  },
  {
    id: '5',
    participant: {
      id: 'user5',
      name: 'Maria Garcia',
      username: 'mariag',
      isOnline: true,
      category: 'family',
    },
    lastMessage: {
      text: 'Can\'t wait to see you this weekend!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      isRead: true,
      senderId: 'user5',
    },
    unreadCount: 0,
  },
  {
    id: '6',
    participant: {
      id: 'user6',
      name: 'James Wilson',
      username: 'jwilson',
      isVerified: true,
      isOnline: false,
      category: 'friend',
    },
    lastMessage: {
      text: 'Check out this memory I just shared!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      isRead: true,
      senderId: 'user6',
    },
    unreadCount: 0,
  },
  {
    id: '7',
    participant: {
      id: 'user7',
      name: 'Jessica Martinez',
      username: 'jmartinez',
      isVerified: true,
      isOnline: true,
      category: 'friend',
    },
    lastMessage: {
      text: 'Are you free this weekend?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      isRead: false,
      senderId: 'user7',
    },
    unreadCount: 1,
  },
  {
    id: '8',
    participant: {
      id: 'user8',
      name: 'Robert Brown',
      username: 'rbrown',
      isOnline: false,
      category: 'friend',
    },
    lastMessage: {
      text: 'Thanks for the help with moving!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      isRead: true,
      senderId: 'user8',
    },
    unreadCount: 0,
  },
  {
    id: '9',
    participant: {
      id: 'user9',
      name: 'Lisa Anderson',
      username: 'landerson',
      isVerified: true,
      isOnline: true,
      category: 'family',
    },
    lastMessage: {
      text: 'Can\'t wait for the family dinner!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      isRead: true,
      senderId: 'user9',
    },
    unreadCount: 0,
  },
  {
    id: '10',
    participant: {
      id: 'user10',
      name: 'Chris Lee',
      username: 'clee',
      isOnline: true,
      category: 'friend',
    },
    lastMessage: {
      text: 'The concert tickets are ready!',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      isRead: false,
      senderId: 'user10',
    },
    unreadCount: 2,
  },
  {
    id: '11',
    participant: {
      id: 'user11',
      name: 'Patricia Williams',
      username: 'pwilliams',
      isOnline: false,
      category: 'family',
    },
    lastMessage: {
      text: 'Happy holidays from our family to yours!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      isRead: true,
      senderId: 'user11',
    },
    unreadCount: 0,
  },
  {
    id: '12',
    participant: {
      id: 'user12',
      name: 'Jennifer Taylor',
      username: 'jtaylor',
      isVerified: true,
      isOnline: false,
      category: 'friend',
    },
    lastMessage: {
      text: 'The photos from the trip are amazing!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10),
      isRead: true,
      senderId: 'user12',
    },
    unreadCount: 0,
  },
  {
    id: '13',
    participant: {
      id: 'user13',
      name: 'Mark Smith',
      username: 'msmith',
      isOnline: true,
      category: 'friend',
    },
    lastMessage: {
      text: 'Game night this Friday?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: false,
      senderId: 'user13',
    },
    unreadCount: 1,
  },
  {
    id: '14',
    participant: {
      id: 'user14',
      name: 'Rachel Davis',
      username: 'rdavis',
      isVerified: true,
      isOnline: false,
      category: 'family',
    },
    lastMessage: {
      text: 'See you at the reunion!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      isRead: true,
      senderId: 'user14',
    },
    unreadCount: 0,
  },
  {
    id: '15',
    participant: {
      id: 'user15',
      name: 'Thomas Moore',
      username: 'tmoore',
      isOnline: false,
      category: 'friend',
    },
    lastMessage: {
      text: 'Thanks for the recommendation!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      isRead: true,
      senderId: 'user15',
    },
    unreadCount: 0,
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      text: 'Hey! How are you doing?',
      senderId: 'user1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: 'read',
    },
    {
      id: 'm2',
      text: 'I\'m doing great, thanks! Just finished organizing some old family photos.',
      senderId: 'currentUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      status: 'read',
    },
    {
      id: 'm3',
      text: 'That sounds amazing! I\'ve been doing the same thing. So many memories!',
      senderId: 'user1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      status: 'read',
    },
    {
      id: 'm4',
      text: 'Did you see the photos from the reunion?',
      senderId: 'user1',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'delivered',
    },
  ],
  '2': [
    {
      id: 'm5',
      text: 'Happy Birthday! 🎉',
      senderId: 'currentUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'read',
    },
    {
      id: 'm6',
      text: 'Thanks for the birthday wishes! ❤️',
      senderId: 'user2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'read',
    },
  ],
  '3': [
    {
      id: 'm7',
      text: 'Hey! Are you free this weekend?',
      senderId: 'user3',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: 'read',
    },
    {
      id: 'm8',
      text: 'I should be! What did you have in mind?',
      senderId: 'currentUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      status: 'read',
    },
    {
      id: 'm9',
      text: 'Let me know when you\'re free to hang out!',
      senderId: 'user3',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: 'read',
    },
  ],
  '5': [
    {
      id: 'm10',
      text: 'Hey! Are you still coming this weekend?',
      senderId: 'user5',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      status: 'read',
    },
    {
      id: 'm11',
      text: 'Yes! Can\'t wait to see you!',
      senderId: 'currentUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'read',
    },
    {
      id: 'm12',
      text: 'Can\'t wait to see you this weekend!',
      senderId: 'user5',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      status: 'read',
    },
  ],
  '7': [
    {
      id: 'm13',
      text: 'Are you free this weekend?',
      senderId: 'user7',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      status: 'delivered',
    },
  ],
  '9': [
    {
      id: 'm14',
      text: 'Hi! Can you bring the dessert?',
      senderId: 'user9',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      status: 'read',
    },
    {
      id: 'm15',
      text: 'Of course! I\'ll bring my famous apple pie.',
      senderId: 'currentUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      status: 'read',
    },
    {
      id: 'm16',
      text: 'Perfect! Can\'t wait for the family dinner!',
      senderId: 'user9',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      status: 'read',
    },
  ],
  '10': [
    {
      id: 'm17',
      text: 'Hey! The concert tickets arrived!',
      senderId: 'user10',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'delivered',
    },
  ],
  '13': [
    {
      id: 'm18',
      text: 'Hey! Game night this Friday?',
      senderId: 'user13',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'delivered',
    },
  ],
};

export const MOCK_MEMORIES: Memory[] = [
  {
    id: 'm1',
    caption: 'Beautiful moments captured during our annual family gathering. Three generations together, creating memories that will last forever.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    timestamp: new Date('2024-07-15T14:00:00'),
    location: 'Lake Tahoe, CA',
    year: '2024',
    taggedPeople: ['emilyr', 'dthompson'],
    visibility: 'family',
    likes: 124,
    comments: 23,
    category: 'family',
    event: 'Family Reunion',
  },
  {
    id: 'm2',
    caption: 'My little one\'s first day of kindergarten. Time flies so fast, but these memories will be preserved forever.',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    timestamp: new Date('2024-09-01T08:00:00'),
    location: 'Austin, TX',
    year: '2024',
    taggedPeople: ['sarahj'],
    visibility: 'family',
    likes: 256,
    comments: 45,
    category: 'family',
    event: 'First Day of School',
    isPinned: true,
  },
  {
    id: 'm3',
    caption: '10 years together, and counting. I love you more every day.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    timestamp: new Date('2024-06-20T18:00:00'),
    location: 'Napa Valley, CA',
    year: '2024',
    taggedPeople: ['thompsons'],
    visibility: 'friends',
    likes: 312,
    comments: 67,
    category: 'friends',
    event: 'Anniversary',
  },
  {
    id: 'm4',
    caption: 'Four generations in one photo. This is what legacy looks like. Forever grateful for this moment.',
    imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800',
    timestamp: new Date('2024-12-25T12:00:00'),
    location: 'New York, NY',
    year: '2024',
    taggedPeople: ['sarahj', 'emilyr', 'mariag'],
    visibility: 'family',
    likes: 445,
    comments: 89,
    category: 'family',
    event: 'Christmas Gathering',
  },
  {
    id: 'm5',
    caption: 'College reunion after 5 years! Still the same amazing people.',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    timestamp: new Date('2024-05-10T15:00:00'),
    location: 'Boston, MA',
    year: '2024',
    taggedPeople: ['mchen', 'alexc'],
    visibility: 'friends',
    likes: 278,
    comments: 56,
    category: 'friends',
    event: 'College Reunion',
  },
  {
    id: 'm6',
    caption: 'Our family\'s first trip to the Grand Canyon. The kids were in awe, and so were we. Nature\'s beauty captured forever.',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    timestamp: new Date('2024-03-20T10:00:00'),
    location: 'Grand Canyon, AZ',
    year: '2024',
    taggedPeople: ['rbrown'],
    visibility: 'family',
    likes: 334,
    comments: 72,
    category: 'family',
    event: 'Family Trip',
  },
  {
    id: 'm7',
    caption: 'My grandmother\'s 90th birthday celebration. Three generations of strong women. These memories are our greatest treasure.',
    imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
    timestamp: new Date('2024-11-15T16:00:00'),
    location: 'Chicago, IL',
    year: '2024',
    taggedPeople: ['sarahj', 'emilyr'],
    visibility: 'family',
    likes: 521,
    comments: 134,
    category: 'family',
    event: '90th Birthday',
    isPinned: true,
  },
  {
    id: 'm8',
    caption: 'Celebrating 10 years of friendship! Through thick and thin, these amazing people have been my rock. Here\'s to many more years!',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    timestamp: new Date('2024-08-05T19:00:00'),
    location: 'Denver, CO',
    year: '2024',
    taggedPeople: ['mchen', 'dthompson', 'alexc'],
    visibility: 'friends',
    likes: 389,
    comments: 78,
    category: 'friends',
    event: 'Friendship Anniversary',
  },
  {
    id: 'm9',
    caption: 'Preserving generations of family recipes. These are the flavors of my childhood, now saved for my children.',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    timestamp: new Date('2023-12-10T14:00:00'),
    location: 'Family Kitchen',
    year: '2023',
    taggedPeople: ['mariag', 'pwilliams'],
    visibility: 'family',
    likes: 178,
    comments: 34,
    category: 'family',
    event: 'Recipe Sharing',
  },
  {
    id: 'm10',
    caption: 'Sun, sand, and unforgettable moments with the family. These are the days we\'ll remember forever.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    timestamp: new Date('2023-07-20T11:00:00'),
    location: 'Miami Beach, FL',
    year: '2023',
    taggedPeople: ['jwilson'],
    visibility: 'family',
    likes: 95,
    comments: 18,
    category: 'family',
    event: 'Summer Vacation',
  },
  {
    id: 'm11',
    caption: 'Celebrating another year of life, love, and laughter. Grateful for all the beautiful memories.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    timestamp: new Date('2023-05-15T18:00:00'),
    location: 'San Francisco, CA',
    year: '2023',
    taggedPeople: ['alexc'],
    visibility: 'friends',
    likes: 142,
    comments: 28,
    category: 'friends',
    event: 'Birthday',
  },
  {
    id: 'm12',
    caption: 'The end of one chapter and the beginning of another. High school graduation - a milestone I\'ll never forget.',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    timestamp: new Date('2022-06-15T16:00:00'),
    location: 'High School',
    year: '2022',
    taggedPeople: ['jwilson', 'jtaylor'],
    visibility: 'family',
    likes: 367,
    comments: 89,
    category: 'family',
    event: 'High School Graduation',
    isPinned: true,
  },
  {
    id: 'm13',
    caption: 'Three months exploring Europe with nothing but a backpack and a camera. An adventure that changed my perspective on life.',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    timestamp: new Date('2022-08-01T09:00:00'),
    location: 'Paris, France',
    year: '2022',
    taggedPeople: ['mchen', 'dthompson'],
    visibility: 'friends',
    likes: 423,
    comments: 112,
    category: 'friends',
    event: 'Europe Trip',
  },
  {
    id: 'm14',
    caption: 'The keys to my first home. A milestone worth celebrating!',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    timestamp: new Date('2021-03-20T10:00:00'),
    location: 'Seattle, WA',
    year: '2021',
    taggedPeople: ['sarahj', 'emilyr'],
    visibility: 'family',
    likes: 289,
    comments: 56,
    category: 'family',
    event: 'First Home',
  },
  {
    id: 'm15',
    caption: 'All the amazing adventures from summer 2020. Even during difficult times, we found moments of joy and connection.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    timestamp: new Date('2020-08-15T15:00:00'),
    location: 'Local Park',
    year: '2020',
    taggedPeople: ['alexc'],
    visibility: 'private',
    likes: 156,
    comments: 23,
    event: 'Summer 2020',
    fromCapsule: true,
    capsuleId: '3',
  },
];

export const MOCK_FAMILY_FEED_POSTS: FamilyFeedPostData[] = [
  {
    id: 'f1',
    type: 'memory',
    author: {
      name: 'Sarah Johnson',
      username: 'sarahj',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    caption: 'Beautiful moments captured during our annual family gathering. Three generations together, creating memories that will last forever.',
    likes: 124,
    comments: 23,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    location: 'Lake Tahoe, CA',
    year: '2024',
    taggedPeople: ['emilyr', 'dthompson'],
    visibility: 'family',
    event: 'Family Reunion',
  },
  {
    id: 'f2',
    type: 'memory',
    author: {
      name: 'Emily Rodriguez',
      username: 'emilyr',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    caption: 'My little one\'s first day of kindergarten. Time flies so fast, but these memories will be preserved forever.',
    likes: 256,
    comments: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    location: 'Austin, TX',
    year: '2024',
    taggedPeople: ['sarahj'],
    visibility: 'family',
    event: 'First Day of School',
  },
  {
    id: 'f3',
    type: 'memory',
    author: {
      name: 'James Wilson',
      username: 'jwilson',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800',
    caption: 'Four generations in one photo. This is what legacy looks like. Forever grateful for this moment.',
    likes: 445,
    comments: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    location: 'New York, NY',
    year: '2024',
    taggedPeople: ['sarahj', 'emilyr', 'mariag'],
    visibility: 'family',
    event: 'Christmas Gathering',
  },
  {
    id: 'f4',
    type: 'memory',
    author: {
      name: 'Lisa Anderson',
      username: 'landerson',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    caption: 'Our family\'s first trip to the Grand Canyon. The kids were in awe, and so were we. Nature\'s beauty captured forever.',
    likes: 334,
    comments: 72,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    location: 'Grand Canyon, AZ',
    year: '2024',
    taggedPeople: ['rbrown'],
    visibility: 'family',
    event: 'Family Trip',
  },
  {
    id: 'f5',
    type: 'memory',
    author: {
      name: 'Patricia Williams',
      username: 'pwilliams',
    },
    imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
    caption: 'My grandmother\'s 90th birthday celebration. Three generations of strong women. These memories are our greatest treasure.',
    likes: 521,
    comments: 134,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
    location: 'Chicago, IL',
    year: '2024',
    taggedPeople: ['sarahj', 'emilyr'],
    visibility: 'family',
    event: '90th Birthday',
  },
  {
    id: 'f6',
    type: 'moment',
    author: {
      name: 'Maria Garcia',
      username: 'mariag',
    },
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    caption: 'Sunday baking session with the kids! 🍪',
    likes: 89,
    comments: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    visibility: 'family',
  },
  {
    id: 'f7',
    type: 'memory',
    author: {
      name: 'Robert Brown',
      username: 'rbrown',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800',
    caption: 'Pizza night with the whole family! Making memories one slice at a time.',
    likes: 95,
    comments: 19,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    visibility: 'family',
    event: 'Family Dinner',
  },
  {
    id: 'f8',
    type: 'memory',
    author: {
      name: 'You',
      username: 'you',
    },
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    caption: 'Beautiful moments captured during our annual family gathering. Three generations together.',
    likes: 124,
    comments: 23,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    location: 'Lake Tahoe, CA',
    year: '2024',
    taggedPeople: ['emilyr', 'dthompson'],
    visibility: 'family',
    event: 'Family Reunion',
    fromCapsule: true,
    capsuleId: '5',
  },
  {
    id: 'f9',
    type: 'memory',
    author: {
      name: 'Emily Rodriguez',
      username: 'emilyr',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    caption: 'Preserving generations of family recipes. These are the flavors of my childhood, now saved for my children.',
    likes: 178,
    comments: 34,
    timestamp: new Date('2023-12-10T14:00:00'),
    location: 'Family Kitchen',
    year: '2023',
    taggedPeople: ['mariag', 'pwilliams'],
    visibility: 'family',
    event: 'Recipe Sharing',
  },
  {
    id: 'f10',
    type: 'memory',
    author: {
      name: 'Sarah Johnson',
      username: 'sarahj',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    caption: 'Sun, sand, and unforgettable moments with the family. These are the days we\'ll remember forever.',
    likes: 95,
    comments: 18,
    timestamp: new Date('2023-07-20T11:00:00'),
    location: 'Miami Beach, FL',
    year: '2023',
    taggedPeople: ['jwilson'],
    visibility: 'family',
    event: 'Summer Vacation',
  },
  {
    id: 'f11',
    type: 'memory',
    author: {
      name: 'Rachel Davis',
      username: 'rdavis',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    caption: 'Finding peace in the simple moments. Morning walk through the park with grandma. These conversations are gold.',
    likes: 128,
    comments: 25,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    location: 'Seattle, WA',
    visibility: 'family',
    event: 'Morning Walk',
  },
  {
    id: 'f12',
    type: 'moment',
    author: {
      name: 'Maria Garcia',
      username: 'mariag',
    },
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    caption: '10 years together, and counting. I love you more every day. ❤️',
    likes: 312,
    comments: 67,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    location: 'Napa Valley, CA',
    year: '2024',
    taggedPeople: ['thompsons'],
    visibility: 'both',
    event: 'Anniversary',
  },
  {
    id: 'f13',
    type: 'memory',
    author: {
      name: 'James Wilson',
      username: 'jwilson',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    caption: 'The end of one chapter and the beginning of another. High school graduation - a milestone I\'ll never forget.',
    likes: 367,
    comments: 89,
    timestamp: new Date('2022-06-15T16:00:00'),
    location: 'High School',
    year: '2022',
    taggedPeople: ['jtaylor'],
    visibility: 'family',
    event: 'High School Graduation',
  },
  {
    id: 'f14',
    type: 'memory',
    author: {
      name: 'You',
      username: 'you',
    },
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    caption: 'The keys to my first home. A milestone worth celebrating with family!',
    likes: 289,
    comments: 56,
    timestamp: new Date('2021-03-20T10:00:00'),
    location: 'Seattle, WA',
    year: '2021',
    taggedPeople: ['sarahj', 'emilyr'],
    visibility: 'family',
    event: 'First Home',
    fromCapsule: true,
    capsuleId: '14',
  },
  {
    id: 'f15',
    type: 'memory',
    author: {
      name: 'Patricia Williams',
      username: 'pwilliams',
    },
    imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800',
    caption: 'Celebrating 40 years of hard work and dedication. So proud of you, Dad!',
    likes: 421,
    comments: 98,
    timestamp: new Date('2024-11-30T16:00:00'),
    location: 'Chicago, IL',
    year: '2024',
    taggedPeople: ['sarahj', 'emilyr', 'mariag', 'landerson'],
    visibility: 'family',
    event: 'Dad\'s Retirement',
  },
];

export const MOCK_FRIENDS_FEED_POSTS: FriendsFeedPostData[] = [
  {
    id: 'fr1',
    type: 'memory',
    author: {
      name: 'Alex Chen',
      username: 'alexc',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    caption: 'Weekend road trip with the squad! These spontaneous adventures create the best memories.',
    likes: 234,
    comments: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
    location: 'Big Sur, CA',
    year: '2024',
    taggedPeople: ['you', 'mikej'],
    visibility: 'friends',
    event: 'Road Trip',
  },
  {
    id: 'fr2',
    type: 'moment',
    author: {
      name: 'Jessica Park',
      username: 'jessp',
    },
    imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800',
    caption: 'Coffee and catch-ups with my favorite people ☕️',
    likes: 89,
    comments: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    visibility: 'friends',
  },
  {
    id: 'fr3',
    type: 'memory',
    author: {
      name: 'Michael Johnson',
      username: 'mikej',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    caption: 'Graduation day! Four years of hard work finally paid off. Thanks to everyone who supported me along the way.',
    likes: 456,
    comments: 98,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    location: 'University',
    year: '2024',
    taggedPeople: ['you', 'alexc', 'jessp'],
    visibility: 'friends',
    event: 'Graduation',
  },
  {
    id: 'fr4',
    type: 'moment',
    author: {
      name: 'Sam Taylor',
      username: 'samt',
    },
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    caption: 'Sunset vibes 🌅',
    likes: 156,
    comments: 23,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    location: 'Malibu Beach',
    visibility: 'friends',
  },
  {
    id: 'fr5',
    type: 'memory',
    author: {
      name: 'You',
      username: 'you',
    },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    caption: 'Celebrating another year of friendship! So grateful for these amazing people in my life.',
    likes: 267,
    comments: 56,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    location: 'Downtown Restaurant',
    year: '2024',
    taggedPeople: ['alexc', 'jessp', 'mikej'],
    visibility: 'friends',
    event: 'Friendship Anniversary',
  },
  {
    id: 'fr6',
    type: 'moment',
    author: {
      name: 'Emma Wilson',
      username: 'emmaw',
    },
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    caption: 'Game night! Who\'s winning? 🎲',
    likes: 78,
    comments: 15,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10),
    visibility: 'friends',
  },
  {
    id: 'fr7',
    type: 'memory',
    author: {
      name: 'David Kim',
      username: 'davidk',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    caption: 'First concert together! The energy was incredible. Thanks for making this night unforgettable.',
    likes: 189,
    comments: 34,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    location: 'Concert Venue',
    year: '2024',
    taggedPeople: ['you'],
    visibility: 'friends',
    event: 'Concert',
    isTagged: true,
  },
  {
    id: 'fr8',
    type: 'moment',
    author: {
      name: 'Sarah Martinez',
      username: 'sarahm',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800',
    caption: 'Sunday brunch vibes 🥐',
    likes: 95,
    comments: 18,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15),
    visibility: 'friends',
  },
  {
    id: 'fr9',
    type: 'memory',
    author: {
      name: 'Chris Anderson',
      username: 'chrisa',
    },
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    caption: 'Moving into our new apartment! Excited for all the memories we\'ll create here.',
    likes: 312,
    comments: 67,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
    location: 'New Apartment',
    year: '2024',
    taggedPeople: ['emmaw'],
    visibility: 'friends',
    event: 'New Home',
  },
  {
    id: 'fr10',
    type: 'memory',
    author: {
      name: 'You',
      username: 'you',
    },
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    caption: 'Unlocked this time capsule from college! Can\'t believe it\'s been 5 years. So many memories preserved.',
    likes: 423,
    comments: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    location: 'College Campus',
    year: '2019',
    taggedPeople: ['alexc', 'mikej', 'jessp'],
    visibility: 'friends',
    event: 'College Memories',
    fromCapsule: true,
    capsuleId: '7',
  },
  {
    id: 'fr11',
    type: 'moment',
    author: {
      name: 'Jordan Lee',
      username: 'jordanl',
    },
    imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800',
    caption: 'Hiking trail views 🏔️',
    likes: 134,
    comments: 21,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    location: 'Mountain Trail',
    visibility: 'friends',
  },
  {
    id: 'fr12',
    type: 'memory',
    author: {
      name: 'Alex Chen',
      username: 'alexc',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    caption: 'Tagged in this amazing memory! Thanks for including me in this special moment.',
    likes: 198,
    comments: 43,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    location: 'Beach Party',
    year: '2024',
    taggedPeople: ['you'],
    visibility: 'both',
    event: 'Beach Party',
    isTagged: true,
  },
  {
    id: 'fr13',
    type: 'moment',
    author: {
      name: 'Jessica Park',
      username: 'jessp',
    },
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    caption: 'Food coma after that amazing dinner 🍝',
    likes: 67,
    comments: 9,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7),
    visibility: 'friends',
  },
  {
    id: 'fr14',
    type: 'memory',
    author: {
      name: 'Michael Johnson',
      username: 'mikej',
      isVerified: true,
    },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    caption: 'Reunion after years apart! Time flies but friendship stays strong.',
    likes: 289,
    comments: 76,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20),
    location: 'Coffee Shop',
    year: '2024',
    taggedPeople: ['you', 'samt'],
    visibility: 'friends',
    event: 'Friend Reunion',
  },
  {
    id: 'fr15',
    type: 'moment',
    author: {
      name: 'Sam Taylor',
      username: 'samt',
    },
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    caption: 'Weekend vibes ✨',
    likes: 112,
    comments: 19,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 11),
    visibility: 'friends',
  },
];

