'use client';

import { useState } from 'react';
import { Heart, MoreVertical, MapPin, Users, Calendar, Clock, Edit2, Trash2, Share2, Pin, PinOff } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/lib/utils';
import type { Memory } from '@/src/constants/mocks';

interface MemoryTimelineCardProps {
  memory: Memory;
  onEdit?: (memory: Memory) => void;
  onDelete?: (memoryId: string) => void;
  onPin?: (memoryId: string) => void;
  onShare?: (memory: Memory) => void;
}

export function MemoryTimelineCard({
  memory,
  onEdit,
  onDelete,
  onPin,
  onShare,
}: MemoryTimelineCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(memory.likes);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <article className="glass rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 relative">
      {memory.isPinned && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Pin className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-semibold">Pinned</span>
          </div>
        </div>
      )}

      {/* Media */}
      <div className="relative w-full aspect-[4/3] bg-black">
        {memory.videoUrl ? (
          <video
            src={memory.videoUrl}
            className="w-full h-full object-cover"
            controls
            loop
          />
        ) : (
          <img
            src={memory.imageUrl}
            alt={memory.caption}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {memory.fromCapsule && (
            <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-semibold">From Capsule</span>
            </div>
          )}
          {memory.category && (
            <div
              className={cn(
                'backdrop-blur-sm px-3 py-1 rounded-full',
                memory.category === 'family' ? 'bg-purple-500/90' : 'bg-blue-500/90'
              )}
            >
              <span className="text-white text-xs font-semibold capitalize">{memory.category}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">{formatDate(memory.timestamp)}</span>
            </div>
            {memory.location && (
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">{memory.location}</span>
              </div>
            )}
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-white"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-10 glass rounded-lg border border-white/10 p-2 min-w-[180px] z-20">
                  <button
                    onClick={() => {
                      onPin?.(memory.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                  >
                    {memory.isPinned ? (
                      <>
                        <PinOff className="w-4 h-4" />
                        <span className="text-sm">Unpin</span>
                      </>
                    ) : (
                      <>
                        <Pin className="w-4 h-4" />
                        <span className="text-sm">Pin</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onEdit?.(memory);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      onShare?.(memory);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                  <div className="h-px bg-white/10 my-1" />
                  <button
                    onClick={() => {
                      onDelete?.(memory.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Caption */}
        <div className="mb-4">
          <p className="text-white text-base leading-relaxed">{memory.caption}</p>
        </div>

        {/* Tags and Metadata */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {memory.taggedPeople && memory.taggedPeople.length > 0 && (
            <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 text-sm">{memory.taggedPeople.length} people</span>
            </div>
          )}
          {memory.event && (
            <div className="bg-purple-500/20 border border-purple-500/30 px-3 py-1 rounded-full">
              <span className="text-purple-300 text-sm font-medium">{memory.event}</span>
            </div>
          )}
          {memory.visibility && (
            <div className="bg-white/5 px-3 py-1 rounded-full">
              <span className="text-gray-300 text-sm capitalize">{memory.visibility}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 transition-transform hover:scale-110"
          >
            <Heart
              className={cn(
                'w-6 h-6 transition-colors',
                isLiked ? 'fill-purple-500 text-purple-500' : 'text-gray-400 hover:text-purple-500'
              )}
            />
            <span className="text-gray-300 text-sm font-medium">{likeCount.toLocaleString()}</span>
          </button>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>{memory.comments} comments</span>
          </div>
        </div>
      </div>
    </article>
  );
}
