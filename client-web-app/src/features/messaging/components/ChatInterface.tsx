'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  Video,
  Smile,
  MoreVertical,
  Phone,
  Info,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { MessageBubble, type Message } from './MessageBubble';
import { Conversation } from './ConversationList';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  conversation: Conversation | null;
  currentUserId: string;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onSendMedia?: (file: File, type: 'image' | 'video') => void;
}

export function ChatInterface({
  conversation,
  currentUserId,
  messages,
  onSendMessage,
  onSendMedia,
}: ChatInterfaceProps) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSendMedia) {
      if (file.type.startsWith('image/')) {
        onSendMedia(file, 'image');
      } else if (file.type.startsWith('video/')) {
        onSendMedia(file, 'video');
      }
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Send className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-white text-xl font-semibold mb-2">Select a conversation</h3>
          <p className="text-gray-400 text-sm">Choose a friend or family member to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 glass">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm',
                conversation.participant.avatar
                  ? ''
                  : 'bg-gradient-to-br from-emerald-500 to-cyan-500'
              )}
            >
              {conversation.participant.avatar ? (
                <img
                  src={conversation.participant.avatar}
                  alt={conversation.participant.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                conversation.participant.name.charAt(0).toUpperCase()
              )}
            </div>
            {conversation.participant.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-white font-semibold">{conversation.participant.name}</h3>
              {conversation.participant.isVerified && (
                <span className="text-emerald-400 text-xs">✓</span>
              )}
              {conversation.participant.category === 'family' && (
                <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded uppercase">
                  Family
                </span>
              )}
            </div>
            {conversation.participant.isOnline ? (
              <p className="text-emerald-400 text-xs">Online</p>
            ) : (
              <p className="text-gray-400 text-xs">@{conversation.participant.username}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
        {messages.length > 0 ? (
          <>
            {messages.map((message, index) => {
              const isOwn = message.senderId === currentUserId;
              const prevMessage = messages[index - 1];
              const showAvatar =
                !isOwn &&
                (!prevMessage || prevMessage.senderId !== message.senderId || isNewDay(prevMessage.timestamp, message.timestamp));
              const showDateSeparator = index === 0 || isNewDay(prevMessage.timestamp, message.timestamp);

              return (
                <div key={message.id}>
                  {showDateSeparator && (
                    <div className="flex items-center justify-center my-4">
                      <div className="glass px-3 py-1 rounded-full">
                        <span className="text-gray-400 text-xs">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  )}
                  <MessageBubble
                    message={message}
                    isOwn={isOwn}
                    showAvatar={showAvatar}
                    showTimestamp={shouldShowTimestamp(messages, index)}
                    avatar={!isOwn ? conversation.participant.avatar : undefined}
                    senderName={!isOwn ? conversation.participant.name : undefined}
                  />
                </div>
              );
            })}
            {isTyping && (
              <div className="flex gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-xs">
                  {conversation.participant.name.charAt(0).toUpperCase()}
                </div>
                <div className="glass rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400 text-sm">No messages yet</p>
              <p className="text-gray-500 text-xs mt-1">Start the conversation!</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 glass">
        <div className="flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-400 hover:text-white flex-shrink-0"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                // Auto-resize textarea
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
              }}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none max-h-32 overflow-y-auto scrollbar-hide"
            />
            <button
              onClick={() => {
                // Emoji picker would go here
              }}
              className="absolute right-3 bottom-3 text-gray-400 hover:text-white transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function isNewDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() !== date2.getDate() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getFullYear() !== date2.getFullYear()
  );
}

function shouldShowTimestamp(messages: Message[], index: number): boolean {
  if (index === 0) return true;
  const current = messages[index];
  const previous = messages[index - 1];
  const timeDiff = current.timestamp.getTime() - previous.timestamp.getTime();
  return timeDiff > 5 * 60 * 1000 || isNewDay(previous.timestamp, current.timestamp);
}

function formatDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(date, today)) {
    return 'Today';
  } else if (isSameDay(date, yesterday)) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

