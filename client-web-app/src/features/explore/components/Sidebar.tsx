'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Globe, Clock, Heart, User, Plus, Menu, Grid3x3, Video, Users } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

const navItems = [
  { href: '/explore', label: 'Explore', icon: Search },
  { href: '/explore/home', label: 'Home', icon: Home },
  { href: '/explore/memories', label: 'Memories', icon: Grid3x3 },
  { href: '/explore/family', label: 'Family', icon: Users },
  { href: '/explore/friends', label: 'Friends', icon: Users },
  { href: '/explore/capsules', label: 'Capsules', icon: Clock },
  { href: '/messages', label: 'Messages', icon: Heart, hasNotification: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="group fixed  left-0 top-0 h-screen glass border-r border-white/10 backdrop-blur-xl z-50 flex flex-col transition-all duration-300 sidebar-collapsible">
      {/* Logo */}
      <div className="p-4 group-hover:px-6 group-hover:py-5 transition-all duration-300 overflow-x-hidden">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-base">MV</span>
          </div>
          <span className="hidden group-hover:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 transition-opacity duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100">
            MemoryVault
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 group-hover:px-4 space-y-1 overflow-y-auto overflow-x-hidden transition-all duration-300">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== '/explore' && pathname?.startsWith(item.href));

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-4 rounded-lg px-3 py-3 ${isActive
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" />
                  {item.hasNotification && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </div>
                <span className="hidden group-hover:block text-base transition-opacity duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">{item.label}</span>
              </Button>
            </Link>
          );
        })}

        {/* Create */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-4 rounded-lg px-3 py-3 text-gray-300 hover:text-white hover:bg-white/5"
        >
          <Plus className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" />
          <span className="hidden group-hover:block text-base transition-opacity duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">Create</span>
        </Button>
      </nav>

      {/* Bottom Actions */}
      <div className="p-2 group-hover:p-4 space-y-1 border-t border-white/10 transition-all duration-300 overflow-x-hidden">
        <Link href="/account">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-4 rounded-lg px-3 py-3 ${pathname?.startsWith('/account')
              ? 'bg-white/10 text-white font-semibold'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
          >
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden group-hover:block text-base transition-opacity duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">Profile</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-4 rounded-lg px-3 py-3 text-gray-300 hover:text-white hover:bg-white/5"
        >
          <Menu className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" />
          <span className="hidden group-hover:block text-base transition-opacity duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">More</span>
        </Button>
      </div>
    </aside>
  );
}

