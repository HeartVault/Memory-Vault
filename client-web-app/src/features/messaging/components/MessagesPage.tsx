'use client';

import { useState } from 'react';
import { ConversationList, type Conversation } from './ConversationList';
import { ChatInterface, type Message } from './ChatInterface';

// Mock data - in production, this would come from an API
const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: {
      id: 'user1',
      name: 'Sarah Johnson',
      username: 'sarahj',
      isVerified: true,
      isOnline: true,
      category: 'family',
    },
    lastMessage: {
      text: 'Hey! Did you see the photos from the reunion?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isRead: false,
      senderId: 'user1',
    },
    unreadCount: 2,
  },
  {
    id: '2',
    participant: {
      id: 'user2',
      name: 'Emily Rodriguez',
      username: 'emilyr',
      isVerified: true,
      isOnline: false,
      category: 'family',
    },
    lastMessage: {
      text: 'Thanks for the birthday wishes! ❤️',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: true,
      senderId: 'user2',
    },
    unreadCount: 0,
  },
  {
    id: '3',
    participant: {
      id: 'user3',
      name: 'Michael Chen',
      username: 'mchen',
      isOnline: true,
      category: 'friend',
    },
    lastMessage: {
      text: 'Let me know when you\'re free to hang out!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: false,
      senderId: 'user3',
    },
    unreadCount: 1,
  },
  {
    id: '4',
    participant: {
      id: 'user4',
      name: 'David Thompson',
      username: 'dthompson',
      isOnline: false,
      category: 'friend',
    },
    lastMessage: {
      text: 'The concert was amazing!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      isRead: true,
      senderId: 'user4',
    },
    unreadCount: 0,
  },
  {
    id: '5',
    participant: {
      id: 'user5',
      name: 'Maria Garcia',
      username: 'mariag',
      isOnline: true,
      category: 'family',
    },
    lastMessage: {
      text: 'Can\'t wait to see you this weekend!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      isRead: true,
      senderId: 'user5',
    },
    unreadCount: 0,
  },
  {
    id: '6',
    participant: {
      id: 'user6',
      name: 'James Wilson',
      username: 'jwilson',
      isVerified: true,
      isOnline: false,
      category: 'friend',
    },
    lastMessage: {
      text: 'Check out this memory I just shared!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      isRead: true,
      senderId: 'user6',
    },
    unreadCount: 0,
  },
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      text: 'Hey! How are you doing?',
      senderId: 'user1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: 'read',
    },
    {
      id: 'm2',
      text: 'I\'m doing great, thanks! Just finished organizing some old family photos.',
      senderId: 'currentUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      status: 'read',
    },
    {
      id: 'm3',
      text: 'That sounds amazing! I\'ve been doing the same thing. So many memories!',
      senderId: 'user1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      status: 'read',
    },
    {
      id: 'm4',
      text: 'Did you see the photos from the reunion?',
      senderId: 'user1',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'delivered',
    },
  ],
  '2': [
    {
      id: 'm5',
      text: 'Happy Birthday! 🎉',
      senderId: 'currentUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'read',
    },
    {
      id: 'm6',
      text: 'Thanks for the birthday wishes! ❤️',
      senderId: 'user2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'read',
    },
  ],
};

export function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'family' | 'friends'>('all');
  const currentUserId = 'currentUser';

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId) || null;

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversationId(conversation.id);
    // Load messages for this conversation
    const conversationMessages = mockMessages[conversation.id] || [];
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

