'use client';

import { MOCK_STORIES } from '@/src/constants/mocks';

export function StoriesBar() {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 mb-6 px-4">
      {MOCK_STORIES.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0">
          <div
            className={`w-16 h-16 rounded-full p-0.5 ${
              story.isViewed
                ? 'bg-gray-600'
                : 'bg-gradient-to-tr from-emerald-500 via-cyan-500 to-blue-500'
            }`}
          >
            <div className="w-full h-full rounded-full bg-black p-0.5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                {story.username.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          <span className="text-white text-xs max-w-[66px] truncate">{story.username}</span>
        </div>
      ))}
    </div>
  );
}

