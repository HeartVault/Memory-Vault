'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Users, Sparkles, Clock, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/lib/utils';

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

interface FriendsFeedPostProps {
  post: FriendsFeedPostData;
}

export function FriendsFeedPost({ post }: FriendsFeedPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}M AGO`;
    } else if (hours < 24) {
      return `${hours}H AGO`;
    } else if (days === 1) {
      return '1 DAY AGO';
    } else if (days < 7) {
      return `${days} DAYS AGO`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <article className="glass rounded-xl border border-white/10 mb-8 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                post.author.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-[#0a0a0a] bg-blue-500 flex items-center justify-center">
              <Users className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-semibold">{post.author.username}</span>
              {post.author.isVerified && (
                <span className="text-blue-400 text-xs">✓</span>
              )}
              {post.type === 'memory' && (
                <div className="bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-300 text-xs font-medium">Memory</span>
                  </div>
                </div>
              )}
              {post.fromCapsule && (
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-300 text-xs font-medium">From Capsule</span>
                  </div>
                </div>
              )}
              {post.isTagged && (
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300 text-xs font-medium">Tagged You</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-400 text-xs">{formatTimestamp(post.timestamp)}</span>
              {post.location && (
                <>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-400 text-xs">{post.location}</span>
                  </div>
                </>
              )}
              {post.year && (
                <>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-400 text-xs">{post.year}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="relative w-full aspect-square bg-black">
        {post.videoUrl ? (
          <video
            src={post.videoUrl}
            className="w-full h-full object-cover"
            controls
            loop
          />
        ) : (
          <img
            src={post.imageUrl}
            alt={post.caption}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="transition-transform hover:scale-110"
            >
              <Heart
                className={cn(
                  'w-7 h-7 transition-colors',
                  isLiked ? 'fill-blue-500 text-blue-500' : 'text-white hover:text-blue-500'
                )}
              />
            </button>
            <button className="transition-transform hover:scale-110">
              <MessageCircle className="w-7 h-7 text-white hover:text-blue-500" />
            </button>
            <button className="transition-transform hover:scale-110">
              <Share2 className="w-7 h-7 text-white hover:text-blue-500" />
            </button>
          </div>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <p className="text-white font-semibold">{likeCount.toLocaleString()} likes</p>
        </div>

        {/* Caption */}
        <div className="mb-3">
          <span className="text-white font-semibold mr-2">{post.author.username}</span>
          <span className="text-white">{post.caption}</span>
        </div>

        {/* Tags */}
        {post.taggedPeople && post.taggedPeople.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">
              Tagged: {post.taggedPeople.join(', ')}
            </span>
          </div>
        )}

        {post.event && (
          <div className="mb-2">
            <div className="bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
              <span className="text-blue-300 text-sm font-medium">{post.event}</span>
            </div>
          </div>
        )}

        {/* Comments */}
        {post.comments > 0 && (
          <button className="text-gray-400 text-sm mb-2 hover:text-gray-300">
            View all {post.comments} comments
          </button>
        )}

        {/* Add comment */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10 mt-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm"
          />
          <button className="text-blue-400 hover:text-blue-300 font-semibold text-sm">
            Post
          </button>
        </div>
      </div>
    </article>
  );
}

