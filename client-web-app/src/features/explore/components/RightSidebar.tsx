'use client';

import { Button } from '@/src/components/ui/button';
import { User, MoreHorizontal } from 'lucide-react';
import { MOCK_SUGGESTED_USERS } from '@/src/constants/mocks';
import UserCard from './UserCard';

export function RightSidebar() {


  return (
    <aside className="hidden lg:block w-70 fixed right-0 top-0 h-screen overflow-y-auto scrollbar-hide pt-4 px-4">
 
   <UserCard />
      {/* Suggested for you */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-semibold">Suggested for you</h3>
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300 text-xs font-semibold p-0 h-auto"
          >
            See All
          </Button>
        </div>

        <div className="space-y-4">
          {MOCK_SUGGESTED_USERS.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-white font-semibold text-sm truncate">
                      {user.username}
                    </p>
                    {user.isVerified && (
                      <span className="text-emerald-400 text-xs">✓</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs truncate">{user.name}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold p-0 h-auto"
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 pb-8">
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-gray-500 mb-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">Press</a>
          <a href="#" className="hover:underline">API</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Locations</a>
          <a href="#" className="hover:underline">Language</a>
          <a href="#" className="hover:underline">Meta Verified</a>
        </div>
        <p className="text-gray-500 text-xs">© 2025 MemoryVault</p>
      </div>
    </aside>
  );
}

