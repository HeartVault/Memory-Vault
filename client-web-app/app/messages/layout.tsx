'use client';

import { Sidebar } from '@/src/features/explore/components/Sidebar';

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 ml-20 transition-all duration-300 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

