'use client';

import { useState, useMemo } from 'react';
import { Search, Calendar, Plus, Sparkles } from 'lucide-react';
import { MemoryTimelineCard } from './MemoryTimelineCard';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { MOCK_MEMORIES, type Memory } from '@/src/constants/mocks';
import { useRouter } from 'next/navigation';

export function MemoriesPage() {
  const router = useRouter();
  const [memories] = useState<Memory[]>(MOCK_MEMORIES);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  // Get unique years from memories
  const availableYears = useMemo(() => {
    const years = new Set(memories.map((m) => m.year));
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [memories]);

  // Filter memories by year and search
  const filteredMemories = useMemo(() => {
    let filtered = memories;

    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter((m) => m.year === selectedYear);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.caption.toLowerCase().includes(query) ||
          m.location?.toLowerCase().includes(query) ||
          m.event?.toLowerCase().includes(query) ||
          m.taggedPeople?.some((person) => person.toLowerCase().includes(query))
      );
    }

    // Sort by date (newest first), but pinned first
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [memories, selectedYear, searchQuery]);

  // Group memories by year and month
  const groupedMemories = useMemo(() => {
    const grouped: Record<string, Record<string, Memory[]>> = {};

    filteredMemories.forEach((memory) => {
      const year = memory.year;
      const date = new Date(memory.timestamp);
      const month = date.toLocaleDateString('en-US', { month: 'long' });

      if (!grouped[year]) {
        grouped[year] = {};
      }
      if (!grouped[year][month]) {
        grouped[year][month] = [];
      }
      grouped[year][month].push(memory);
    });

    return grouped;
  }, [filteredMemories]);

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  const handleCreateMemory = () => {
    router.push('/explore/create-post?type=memory');
  };

  const handleEdit = (memory: Memory) => {
    console.log('Edit memory:', memory);
    // In production, this would open an edit modal or navigate to edit page
  };

  const handleDelete = (memoryId: string) => {
    console.log('Delete memory:', memoryId);
    // In production, this would show a confirmation dialog and delete
  };

  const handlePin = (memoryId: string) => {
    console.log('Pin/unpin memory:', memoryId);
    // In production, this would toggle pin status
  };

  const handleShare = (memory: Memory) => {
    console.log('Share memory:', memory);
    // In production, this would open a share modal
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto pt-6 pb-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Memories</h1>
              <p className="text-gray-400 text-sm">
                Your personal timeline of meaningful moments
              </p>
            </div>
          </div>
          <Button
            onClick={handleCreateMemory}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Memory
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="glass rounded-lg border border-white/10 px-4 py-2 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by people, place, event, or caption..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass border-white/10 pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      {filteredMemories.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-block p-6 bg-white/5 rounded-full mb-6">
            <Sparkles className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-white text-xl font-semibold mb-2">
            {searchQuery || selectedYear !== 'all'
              ? 'No memories found'
              : 'Your story begins here'}
          </h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            {searchQuery || selectedYear !== 'all'
              ? 'Try adjusting your filters or search terms'
              : 'Add your first memory and start preserving your life'}
          </p>
          {!searchQuery && selectedYear === 'all' && (
            <Button
              onClick={handleCreateMemory}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add a Memory
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedMemories)
            .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
            .map(([year, months]) => (
              <div key={year} className="relative">
                {/* Year Header */}
                <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm py-4 mb-6">
                  <button
                    onClick={() => toggleYear(year)}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-px h-8 bg-gradient-to-b from-purple-500 to-pink-500" />
                    <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {year}
                    </h2>
                    <span className="text-gray-400 text-sm">
                      ({Object.values(months).flat().length} {Object.values(months).flat().length === 1 ? 'memory' : 'memories'})
                    </span>
                  </button>
                </div>

                {/* Months */}
                {Object.entries(months)
                  .sort(([monthA], [monthB]) => {
                    const monthsOrder = [
                      'January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'
                    ];
                    return monthsOrder.indexOf(monthB) - monthsOrder.indexOf(monthA);
                  })
                  .map(([month, monthMemories]) => (
                    <div key={month} className="mb-8">
                      {/* Month Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                        <h3 className="text-lg font-semibold text-gray-300">{month}</h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                      </div>

                      {/* Memory Cards */}
                      <div className="space-y-6">
                        {monthMemories.map((memory) => (
                          <MemoryTimelineCard
                            key={memory.id}
                            memory={memory}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onPin={handlePin}
                            onShare={handleShare}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

