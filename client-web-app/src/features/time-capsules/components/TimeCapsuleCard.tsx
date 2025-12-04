'use client';

import { useState } from 'react';
import { Clock, Users, Image as ImageIcon, Video, Music, FileText, Lock, Unlock } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { cn } from '@/lib/utils';

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

interface TimeCapsuleCardProps {
  capsule: TimeCapsule;
  onClick?: () => void;
  variant?: 'story' | 'grid' | 'list';
}

export function TimeCapsuleCard({ capsule, onClick, variant = 'grid' }: TimeCapsuleCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (variant === 'story') {
    return (
      <div
        onClick={onClick}
        className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
      >
        <div
          className={cn(
            'w-20 h-20 rounded-full p-0.5 transition-all duration-300 group-hover:scale-110',
            capsule.isUnlocked
              ? 'bg-gradient-to-tr from-emerald-500 via-cyan-500 to-blue-500'
              : 'bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 animate-pulse'
          )}
        >
          <div className="w-full h-full rounded-full bg-black p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              {capsule.coverImage ? (
                <img
                  src={capsule.coverImage}
                  alt={capsule.title}
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              )}
              {!capsule.isUnlocked && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-white mx-auto mb-1" />
                    <div className="text-[10px] text-white font-semibold">Unlocks</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <span className="text-white text-xs max-w-[80px] truncate text-center">
          {capsule.title}
        </span>
        {!capsule.isUnlocked && (
          <div className="text-[10px] text-emerald-400 font-medium">
            <CountdownTimer unlockDate={capsule.unlockDate} size="sm" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'glass rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300',
        variant === 'list' ? 'flex gap-4 p-4' : 'flex flex-col'
      )}
    >
      {/* Cover Image */}
      <div
        className={cn(
          'relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600',
          variant === 'list' ? 'w-32 h-32 rounded-xl flex-shrink-0' : 'w-full aspect-[4/3]'
        )}
      >
        {capsule.coverImage ? (
          <>
            <img
              src={capsule.coverImage}
              alt={capsule.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Lock className={cn('text-white', variant === 'list' ? 'w-8 h-8' : 'w-12 h-12')} />
          </div>
        )}

        {/* Unlock Status Badge */}
        <div className="absolute top-3 right-3">
          {capsule.isUnlocked ? (
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full">
              <Unlock className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">Unlocked</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-purple-500/50">
              <Lock className="w-3 h-3 text-purple-300" />
              <span className="text-purple-300 text-xs font-medium">Locked</span>
            </div>
          )}
        </div>

        {/* Media Count Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2">
          {capsule.mediaCount.photos > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
              <ImageIcon className="w-3 h-3 text-white" />
              <span className="text-white text-xs">{capsule.mediaCount.photos}</span>
            </div>
          )}
          {capsule.mediaCount.videos > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
              <Video className="w-3 h-3 text-white" />
              <span className="text-white text-xs">{capsule.mediaCount.videos}</span>
            </div>
          )}
          {capsule.mediaCount.audio > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
              <Music className="w-3 h-3 text-white" />
              <span className="text-white text-xs">{capsule.mediaCount.audio}</span>
            </div>
          )}
          {capsule.mediaCount.letters > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
              <FileText className="w-3 h-3 text-white" />
              <span className="text-white text-xs">{capsule.mediaCount.letters}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={cn('p-4', variant === 'list' && 'flex-1')}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-semibold text-lg line-clamp-1">{capsule.title}</h3>
        </div>

        {capsule.description && (
          <p className="text-gray-400 text-sm line-clamp-2 mb-3">{capsule.description}</p>
        )}

        {!capsule.isUnlocked && (
          <div className="mb-3">
            <div className="flex items-center gap-2 text-purple-300 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">Unlocks in:</span>
            </div>
            <CountdownTimer unlockDate={capsule.unlockDate} size="sm" />
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-xs">
              {capsule.sharedWith.length} {capsule.sharedWith.length === 1 ? 'person' : 'people'}
            </span>
          </div>
          <span className="text-gray-500 text-xs">
            {new Date(capsule.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

