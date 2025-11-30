'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Clock, User, MapPin } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

interface MemoryCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  location?: string;
  date: string;
  likes: number;
  comments: number;
  type: 'memory' | 'capsule';
  tags?: string[];
}

export function MemoryCard({
  id,
  title,
  description,
  imageUrl,
  author,
  location,
  date,
  likes,
  comments,
  type,
  tags,
}: MemoryCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Link href={`/explore/${type === 'capsule' ? 'capsules' : 'memories'}/${id}`}>
      <div className="group glass rounded-2xl border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Image */}
        {imageUrl && (
          <div className="relative w-full h-64 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Type badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                type === 'capsule'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
              }`}>
                {type === 'capsule' ? 'Time Capsule' : 'Memory'}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Author */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                author.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{author.name}</p>
              <p className="text-xs text-gray-400">@{author.username}</p>
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {date}
            </div>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full text-xs bg-white/5 text-gray-400 border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likeCount}</span>
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MessageCircle className="w-5 h-5" />
                <span>{comments}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

