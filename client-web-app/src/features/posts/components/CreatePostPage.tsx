'use client';

import { useState } from 'react';
import { CreatePostForm } from './CreatePostForm';
import { X, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import axios from 'axios';

export function CreatePostPage() {
  const router = useRouter();
  const [postType, setPostType] = useState<'memory' | 'moment'>('moment');
  

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (data: any) => {
    console.log('Creating post:', { ...data, type: postType });
    // In production, this would call an API



    const response = await  axios.post('/api/post',{
  "user_id": "db2315f3-543b-43bc-bc2e-d47a10911c4e",
  "caption": "First day back on the grind 🚀",
  "type": "moment",
  "media_url": ["https://example.com/media/photo-1.jpg"],
  "visibility": "friends",
  "year": 2026,
  "event": "Back to School",
  "location": "Lagos, Nigeria"
}
);

console.log(response);

    // router.back();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="sticky top-0 z-10 glass border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">Create Post</h1>
          </div>
        </div>
      </div>

      {/* Post Type Selector */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="glass rounded-xl p-1 mb-6 flex gap-2">
          <button
            onClick={() => setPostType('moment')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              postType === 'moment'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Moment
          </button>
          <button
            onClick={() => setPostType('memory')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              postType === 'memory'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Memory
          </button>
        </div>

        <CreatePostForm postType={postType} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

