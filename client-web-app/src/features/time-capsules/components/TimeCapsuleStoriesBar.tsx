'use client';

import { TimeCapsule, TimeCapsuleCard } from './TimeCapsuleCard';

interface TimeCapsuleStoriesBarProps {
  capsules: TimeCapsule[];
  onCreateNew?: () => void;
}

export function TimeCapsuleStoriesBar({ capsules, onCreateNew }: TimeCapsuleStoriesBarProps) {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 mb-6 px-4">
      {/* Create New Capsule Story */}
      {onCreateNew && (
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div
            onClick={onCreateNew}
            className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-emerald-500 via-cyan-500 to-blue-500 cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-emerald-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </div>
          <span className="text-white text-xs max-w-[80px] truncate text-center">Create</span>
        </div>
      )}

      {/* Time Capsule Stories */}
      {capsules.map((capsule) => (
        <TimeCapsuleCard
          key={capsule.id}
          capsule={capsule}
          variant="story"
          onClick={() => {
            // Handle story click
            console.log('Open capsule:', capsule.id);
          }}
        />
      ))}
    </div>
  );
}

