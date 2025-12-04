'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send, Users, Sparkles, Clock, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/lib/utils';

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

interface HomeFeedPostProps {
  post: HomeFeedPostData;
}

export function HomeFeedPost({ post }: HomeFeedPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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
    <article className="glass rounded-lg border border-white/10 mb-8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
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
            {/* Category Badge */}
            {post.category !== 'own' && (
              <div
                className={cn(
                  'absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center',
                  post.category === 'family'
                    ? 'bg-purple-500'
                    : 'bg-blue-500'
                )}
              >
                <Users className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-semibold text-sm">{post.author.username}</span>
              {post.author.isVerified && (
                <span className="text-emerald-400 text-xs">✓</span>
              )}
              {/* Post Type Badge */}
              {post.type === 'memory' ? (
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-semibold rounded-full uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Memory
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold rounded-full uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Moment
                </span>
              )}
              {/* Year tag for Memories */}
              {post.type === 'memory' && post.year && (
                <span className="px-2 py-0.5 bg-white/10 text-gray-300 text-[10px] rounded-full flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.year}
                </span>
              )}
            </div>
            {post.location && (
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-gray-400 text-xs">{post.location}</span>
              </div>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-white">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
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

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className="transition-transform hover:scale-110">
              <Heart
                className={`w-6 h-6 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                }`}
              />
            </button>
            <button className="transition-transform hover:scale-110">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <button className="transition-transform hover:scale-110">
              <Share2 className="w-6 h-6 text-white" />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="transition-transform hover:scale-110"
          >
            <Bookmark
              className={`w-6 h-6 ${
                isSaved ? 'fill-white text-white' : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Likes */}
        {likeCount > 0 && (
          <div className="mb-2">
            <p className="text-white font-semibold text-sm">{likeCount.toLocaleString()} likes</p>
          </div>
        )}

        {/* Caption */}
        <div className="mb-2">
          <span className="text-white font-semibold text-sm mr-2">{post.author.username}</span>
          <span className="text-white text-sm">{post.caption}</span>
        </div>

        {/* Tagged People */}
        {post.taggedPeople && post.taggedPeople.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {post.taggedPeople.map((person, index) => (
              <span
                key={index}
                className="text-emerald-400 text-sm font-medium hover:underline cursor-pointer"
              >
                @{person}
              </span>
            ))}
          </div>
        )}

        {/* Comments */}
        {post.comments > 0 && (
          <button className="text-gray-400 text-sm mb-2 hover:text-gray-300">
            View all {post.comments} comments
          </button>
        )}

        {/* Expiration for Moments */}
        {post.type === 'moment' && post.expiration && (
          <div className="flex items-center gap-1 mb-2 text-gray-400 text-xs">
            <Clock className="w-3 h-3" />
            <span>Expires in {post.expiration}</span>
          </div>
        )}

        {/* Timestamp */}
        <p className="text-gray-400 text-xs uppercase">{formatTimestamp(post.timestamp)}</p>
      </div>

      {/* Comment Input */}
      <div className="px-4 pb-4 border-t border-white/10 pt-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-xs">
            <span>Y</span>
          </div>
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
          />
          <Button
            variant="ghost"
            className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold p-0 h-auto"
          >
            Post
          </Button>
        </div>
      </div>
    </article>
  );
}

