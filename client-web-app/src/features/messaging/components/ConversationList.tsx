'use client';

import { useState } from 'react';
import { Search, Users, User } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/lib/utils';

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    isVerified?: boolean;
    isOnline?: boolean;
    category: 'family' | 'friend';
  };
  lastMessage: {
    text: string;
    timestamp: Date;
    isRead: boolean;
    senderId: string;
  };
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: 'all' | 'family' | 'friends';
  onCategoryFilterChange: (category: 'all' | 'family' | 'friends') => void;
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
}: ConversationListProps) {
  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || conv.participant.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="w-full md:w-96 flex flex-col h-full bg-[#0a0a0a] border-r border-white/10">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Messages</h2>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Users className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => onCategoryFilterChange('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              categoryFilter === 'all'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            )}
          >
            All
          </button>
          <button
            onClick={() => onCategoryFilterChange('family')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              categoryFilter === 'family'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            )}
          >
            Family
          </button>
          <button
            onClick={() => onCategoryFilterChange('friends')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              categoryFilter === 'friends'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            )}
          >
            Friends
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filteredConversations.length > 0 ? (
          <div className="divide-y divide-white/5">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={cn(
                  'w-full p-4 hover:bg-white/5 transition-colors text-left',
                  selectedConversationId === conversation.id && 'bg-white/10'
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm',
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

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-semibold text-sm truncate">
                          {conversation.participant.name}
                        </span>
                        {conversation.participant.isVerified && (
                          <span className="text-emerald-400 text-xs">✓</span>
                        )}
                        {conversation.participant.category === 'family' && (
                          <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded uppercase">
                            Family
                          </span>
                        )}
                      </div>
                      <span
                        className={cn(
                          'text-xs flex-shrink-0 ml-2',
                          conversation.lastMessage.isRead
                            ? 'text-gray-500'
                            : 'text-emerald-400 font-semibold'
                        )}
                      >
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          'text-sm truncate',
                          conversation.lastMessage.isRead
                            ? 'text-gray-400'
                            : 'text-white font-medium'
                        )}
                      >
                        {conversation.lastMessage.text}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="flex-shrink-0 px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold rounded-full">
                          {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
}

