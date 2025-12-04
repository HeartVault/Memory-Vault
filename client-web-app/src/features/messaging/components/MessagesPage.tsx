'use client';

import { useState } from 'react';
import { ConversationList, type Conversation } from './ConversationList';
import { ChatInterface, type Message } from './ChatInterface';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '@/src/constants/mocks';

export function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'family' | 'friends'>('all');
  const currentUserId = 'currentUser';

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId) || null;

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversationId(conversation.id);
    // Load messages for this conversation
    const conversationMessages = MOCK_MESSAGES[conversation.id] || [];
    setMessages(conversationMessages);
    
    // Mark as read
    if (conversation.unreadCount > 0) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversation.id
            ? { ...c, unreadCount: 0, lastMessage: { ...c.lastMessage, isRead: true } }
            : c
        )
      );
    }
  };

  const handleSendMessage = (text: string) => {
    if (!selectedConversationId) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text,
      senderId: currentUserId,
      timestamp: new Date(),
      status: 'sending',
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate message sending
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg))
      );

      // Simulate delivery
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg))
        );

        // Update conversation list
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedConversationId
              ? {
                  ...c,
                  lastMessage: {
                    text,
                    timestamp: new Date(),
                    isRead: false,
                    senderId: currentUserId,
                  },
                }
              : c
          )
        );
      }, 500);
    }, 300);
  };

  const handleSendMedia = (file: File, type: 'image' | 'video') => {
    if (!selectedConversationId) return;

    const mediaUrl = URL.createObjectURL(file);

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: '',
      senderId: currentUserId,
      timestamp: new Date(),
      status: 'sending',
      type,
      mediaUrl,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate upload
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg))
      );
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      <ConversationList
        conversations={conversations}
        selectedConversationId={selectedConversationId || undefined}
        onSelectConversation={handleSelectConversation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />
      <ChatInterface
        conversation={selectedConversation}
        currentUserId={currentUserId}
        messages={messages}
        onSendMessage={handleSendMessage}
        onSendMedia={handleSendMedia}
      />
    </div>
  );
}

