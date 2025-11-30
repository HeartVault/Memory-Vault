'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, Play, Pause } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

interface ReelCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  likes: number;
  comments: number;
  shares: number;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

export function ReelCard({
  id,
  title,
  description,
  imageUrl,
  videoUrl,
  author,
  likes,
  comments,
  shares,
  isPlaying = false,
  onPlay,
  onPause,
}: ReelCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
        onPause?.();
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
        onPlay?.();
      }
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black snap-start">
      {/* Media */}
      <div className="absolute inset-0">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8 flex items-end pb-20">
        <div className="flex-1">
          {/* Author */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold border-2 border-white/20">
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
              <p className="text-white font-semibold">{author.name}</p>
              <p className="text-gray-300 text-sm">@{author.username}</p>
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
          {description && (
            <p className="text-gray-200 text-sm mb-4 line-clamp-3">{description}</p>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex flex-col items-center gap-6 ml-6">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-2"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isLiked ? 'bg-red-500/20' : 'bg-white/10 hover:bg-white/20'
            }`}>
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </div>
            <span className="text-white text-xs font-semibold">{likeCount}</span>
          </button>

          {/* Comment */}
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs font-semibold">{comments}</span>
          </button>

          {/* Share */}
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs font-semibold">{shares}</span>
          </button>

          {/* More */}
          <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
            <MoreVertical className="w-6 h-6 text-white" />
          </button>

          {/* Play/Pause for videos */}
          {videoUrl && (
            <button
              onClick={handlePlayPause}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              {isVideoPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

