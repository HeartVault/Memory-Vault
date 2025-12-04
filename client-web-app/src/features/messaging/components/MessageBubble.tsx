'use client';

import { Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'video';
  mediaUrl?: string;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  avatar?: string;
  senderName?: string;
}

export function MessageBubble({
  message,
  isOwn,
  showAvatar = false,
  showTimestamp = true,
  avatar,
  senderName,
}: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-emerald-400" />;
      default:
        return null;
    }
  };

  if (message.type === 'image' || message.type === 'video') {
    return (
      <div className={cn('flex gap-2 mb-4', isOwn && 'flex-row-reverse')}>
        {showAvatar && !isOwn && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
            {avatar ? (
              <img src={avatar} alt={senderName} className="w-full h-full rounded-full object-cover" />
            ) : (
              senderName?.charAt(0).toUpperCase() || '?'
            )}
          </div>
        )}
        {!showAvatar && !isOwn && <div className="w-8" />}

        <div className={cn('flex flex-col max-w-[70%]', isOwn && 'items-end')}>
          {!isOwn && senderName && (
            <span className="text-xs text-gray-400 mb-1 px-1">{senderName}</span>
          )}
          <div
            className={cn(
              'rounded-2xl overflow-hidden',
              isOwn
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                : 'glass border border-white/10'
            )}
          >
            {message.type === 'image' && message.mediaUrl && (
              <img
                src={message.mediaUrl}
                alt="Shared image"
                className="max-w-full h-auto max-h-96 object-cover"
              />
            )}
            {message.type === 'video' && message.mediaUrl && (
              <video
                src={message.mediaUrl}
                controls
                className="max-w-full h-auto max-h-96"
              />
            )}
            {message.text && (
              <div className={cn('px-4 py-2', isOwn ? 'text-white' : 'text-white')}>
                <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
              </div>
            )}
          </div>
          {showTimestamp && (
            <div
              className={cn(
                'flex items-center gap-1 mt-1 text-xs',
                isOwn ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <span className="text-gray-500">{formatTime(message.timestamp)}</span>
              {isOwn && getStatusIcon()}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex gap-2 mb-4', isOwn && 'flex-row-reverse')}>
      {showAvatar && !isOwn && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
          {avatar ? (
            <img src={avatar} alt={senderName} className="w-full h-full rounded-full object-cover" />
          ) : (
            senderName?.charAt(0).toUpperCase() || '?'
          )}
        </div>
      )}
      {!showAvatar && !isOwn && <div className="w-8" />}

      <div className={cn('flex flex-col max-w-[70%]', isOwn && 'items-end')}>
        {!isOwn && senderName && (
          <span className="text-xs text-gray-400 mb-1 px-1">{senderName}</span>
        )}
        <div
          className={cn(
            'rounded-2xl px-4 py-2',
            isOwn
              ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
              : 'glass border border-white/10 text-white'
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        {showTimestamp && (
          <div
            className={cn(
              'flex items-center gap-1 mt-1 text-xs',
              isOwn ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <span className="text-gray-500">{formatTime(message.timestamp)}</span>
            {isOwn && getStatusIcon()}
          </div>
        )}
      </div>
    </div>
  );
}

