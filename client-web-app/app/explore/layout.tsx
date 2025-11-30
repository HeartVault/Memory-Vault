'use client';

import { Sidebar } from '@/src/features/explore/components/Sidebar';
import { RightSidebar } from '@/src/features/explore/components/RightSidebar';

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-20 mr-0 lg:mr-80 transition-all duration-300 overflow-x-hidden">
        {children}
      </main>

      <RightSidebar />
    </div>
  );
}
