'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

interface FeedPostProps {
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

export function FeedPost({
  id,
  author,
  imageUrl,
  videoUrl,
  caption,
  likes,
  comments,
  timestamp,
  location,
}: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <article className="glass rounded-lg border border-white/10 mb-8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
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
          <div>
            <div className="flex items-center gap-1">
              <span className="text-white font-semibold text-sm">{author.username}</span>
              {author.isVerified && (
                <span className="text-emerald-400 text-xs">✓</span>
              )}
            </div>
            {location && (
              <span className="text-gray-400 text-xs">{location}</span>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-white">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Media */}
      <div className="relative w-full aspect-square bg-black">
        {videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            controls
            loop
          />
        ) : (
          <img
            src={imageUrl}
            alt={caption}
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
              <Send className="w-6 h-6 text-white" />
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
        <div className="mb-2">
          <p className="text-white font-semibold text-sm">{likeCount.toLocaleString()} likes</p>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="text-white font-semibold text-sm mr-2">{author.username}</span>
          <span className="text-white text-sm">{caption}</span>
        </div>

        {/* Comments */}
        {comments > 0 && (
          <button className="text-gray-400 text-sm mb-2 hover:text-gray-300">
            View all {comments} comments
          </button>
        )}

        {/* Timestamp */}
        <p className="text-gray-400 text-xs uppercase">{timestamp}</p>
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

