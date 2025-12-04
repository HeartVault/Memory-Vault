'use client';

import { useState } from 'react';
import { TimeCapsuleStoriesBar } from './TimeCapsuleStoriesBar';
import { TimeCapsuleCard, type TimeCapsule } from './TimeCapsuleCard';
import { CreateTimeCapsuleForm } from './CreateTimeCapsuleForm';
import { TimeCapsuleDetailModal } from './TimeCapsuleDetailModal';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data - in production, this would come from an API
const mockTimeCapsules: TimeCapsule[] = [
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
];

export function TimeCapsulesPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState<TimeCapsule | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'locked' | 'unlocked'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCapsules = mockTimeCapsules.filter((capsule) => {
    if (filter === 'locked') return !capsule.isUnlocked;
    if (filter === 'unlocked') return capsule.isUnlocked;
    return true;
  });

  const handleCapsuleClick = (capsule: TimeCapsule) => {
    setSelectedCapsule(capsule);
    setShowDetailModal(true);
  };

  const handleCreateCapsule = (data: {
    title: string;
    description: string;
    unlockDate: Date;
    media: any[];
    sharedWith: string[];
  }) => {
    console.log('Creating capsule:', data);
    // In production, this would call an API
    setShowCreateForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto pt-6 pb-8 px-4">
        {/* Header */}
        <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Time Capsules</h1>
            <p className="text-gray-400">
              Preserve your memories and unlock them in the future
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
          >
            Create Capsule
          </button>
        </div>

        {/* Stories Bar */}
        <TimeCapsuleStoriesBar
          capsules={mockTimeCapsules.slice(0, 8)}
          onCreateNew={() => setShowCreateForm(true)}
        />
      </div>

      {/* Filters and View Mode */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              filter === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              filter === 'locked'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            )}
          >
            Locked
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              filter === 'unlocked'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            )}
          >
            Unlocked
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-2 rounded-lg transition-colors',
              viewMode === 'grid'
                ? 'bg-white/10 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-2 rounded-lg transition-colors',
              viewMode === 'list'
                ? 'bg-white/10 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Capsules Grid/List */}
      {filteredCapsules.length > 0 ? (
        <div
          className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          )}
        >
          {filteredCapsules.map((capsule) => (
            <TimeCapsuleCard
              key={capsule.id}
              capsule={capsule}
              variant={viewMode}
              onClick={() => handleCapsuleClick(capsule)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-400">No time capsules found</p>
        </div>
      )}

      {/* Modals */}
      {showCreateForm && (
        <CreateTimeCapsuleForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateCapsule}
        />
      )}

      {showDetailModal && selectedCapsule && (
        <TimeCapsuleDetailModal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedCapsule(null);
          }}
          capsule={selectedCapsule}
        />
      )}
    </div>
  );
}

