'use client';

import { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Video,
  Users,
  Globe,
  Lock,
  Clock,
  Calendar,
  MapPin,
  Tag,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/lib/utils';

interface MediaFile {
  id: string;
  file: File;
  type: 'photo' | 'video';
  preview: string;
}

interface CreatePostFormProps {
  postType: 'memory' | 'moment';
  onSubmit: (data: {
    type: 'memory' | 'moment';
    media: MediaFile[];
    caption: string;
    tags?: string[];
    year?: string;
    location?: string;
    visibility: string;
    expiration?: string;
    taggedPeople?: string[];
  }) => void;
}

export function CreatePostForm({ postType, onSubmit }: CreatePostFormProps) {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [caption, setCaption] = useState('');
  const [taggedPeople, setTaggedPeople] = useState<string[]>([]);
  const [peopleInput, setPeopleInput] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [visibility, setVisibility] = useState<string>(
    postType === 'memory' ? 'family' : 'friends'
  );
  const [expiration, setExpiration] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const mediaFile: MediaFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          type: file.type.startsWith('image/') ? 'photo' : 'video',
          preview: URL.createObjectURL(file),
        };
        setMedia((prev) => [...prev, mediaFile]);
      }
    });
  };

  const removeMedia = (id: string) => {
    setMedia((prev) => {
      const item = prev.find((m) => m.id === id);
      if (item?.preview) {
        URL.revokeObjectURL(item.preview);
      }
      return prev.filter((m) => m.id !== id);
    });
  };

  const handleAddTaggedPerson = () => {
    if (peopleInput.trim() && !taggedPeople.includes(peopleInput.trim())) {
      setTaggedPeople((prev) => [...prev, peopleInput.trim()]);
      setPeopleInput('');
    }
  };

  const removeTaggedPerson = (person: string) => {
    setTaggedPeople((prev) => prev.filter((p) => p !== person));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (media.length === 0) {
      alert('Please add at least one photo or video');
      return;
    }

    onSubmit({
      type: postType,
      media,
      caption,
      taggedPeople,
      year: postType === 'memory' ? year : undefined,
      location,
      visibility,
      expiration: postType === 'moment' && expiration ? expiration : undefined,
    });
  };

  const getVisibilityOptions = () => {
    if (postType === 'memory') {
      return [
        { value: 'family', label: 'Family', icon: Users },
        { value: 'friends', label: 'Friends', icon: Users },
        { value: 'both', label: 'Family & Friends', icon: Users },
      ];
    } else {
      return [
        { value: 'friends', label: 'Friends', icon: Users },
        { value: 'public', label: 'Public', icon: Globe },
        { value: 'private', label: 'Private', icon: Lock },
      ];
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Post Type Info */}
      <div className="glass rounded-xl p-4 border-l-4 border-emerald-500">
        {postType === 'memory' ? (
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-1">Memory Post</h3>
              <p className="text-gray-400 text-sm">
                Permanent post that will be added to your timeline. Perfect for meaningful moments
                shared with family and friends.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-1">Moment Post</h3>
              <p className="text-gray-400 text-sm">
                Casual post for everyday sharing. Can be public and optionally expire after a set
                time.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Media Upload */}
      <div className="glass rounded-xl p-6">
        <label className="block text-white text-sm font-medium mb-4">
          {postType === 'memory' ? 'Photos / Videos *' : 'Photos / Videos *'}
        </label>

        {media.length === 0 ? (
          <label className="cursor-pointer">
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/20 rounded-xl hover:border-emerald-500/50 transition-colors group">
              <Upload className="w-12 h-12 text-gray-400 group-hover:text-emerald-400 mb-3" />
              <span className="text-gray-400 text-sm group-hover:text-emerald-400">
                Click to upload photos or videos
              </span>
              <span className="text-gray-500 text-xs mt-1">
                Supports JPG, PNG, MP4, MOV
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {media.map((item) => (
                <div key={item.id} className="relative group">
                  {item.type === 'photo' ? (
                    <img
                      src={item.preview}
                      alt="Upload"
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={item.preview}
                      className="w-full aspect-square object-cover rounded-lg"
                      controls={false}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  {item.type === 'video' && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded">
                      <Video className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-emerald-500/50 hover:bg-emerald-500/10"
            >
              <Upload className="w-4 h-4 mr-2" />
              Add More
            </Button>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="glass rounded-xl p-6">
        <label className="block text-white text-sm font-medium mb-3">
          Caption {postType === 'moment' && '(Optional)'}
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={
            postType === 'memory'
              ? 'What makes this memory special?'
              : 'What\'s on your mind?'
          }
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
        />
      </div>

      {/* Memory-specific fields */}
      {postType === 'memory' && (
        <>
          {/* Tag People */}
          <div className="glass rounded-xl p-6">
            <label className="block text-white text-sm font-medium mb-3">
              <Users className="w-4 h-4 inline mr-1" />
              Tag People
            </label>
            <div className="flex gap-2 mb-3">
              <Input
                value={peopleInput}
                onChange={(e) => setPeopleInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTaggedPerson();
                  }
                }}
                placeholder="Type username and press Enter"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddTaggedPerson}
                variant="outline"
                className="border-emerald-500/50 hover:bg-emerald-500/10"
              >
                Add
              </Button>
            </div>
            {taggedPeople.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {taggedPeople.map((person) => (
                  <span
                    key={person}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm"
                  >
                    @{person}
                    <button
                      type="button"
                      onClick={() => removeTaggedPerson(person)}
                      className="hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Year / Event */}
          <div className="glass rounded-xl p-6">
            <label className="block text-white text-sm font-medium mb-3">
              <Calendar className="w-4 h-4 inline mr-1" />
              Year or Event
            </label>
            <Input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g., 2024 or 'Summer Vacation'"
              className="w-full"
            />
          </div>
        </>
      )}

      {/* Location (for both) */}
      <div className="glass rounded-xl p-6">
        <label className="block text-white text-sm font-medium mb-3">
          <MapPin className="w-4 h-4 inline mr-1" />
          Location (Optional)
        </label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where was this taken?"
          className="w-full"
        />
      </div>

      {/* Visibility */}
      <div className="glass rounded-xl p-6">
        <label className="block text-white text-sm font-medium mb-3">
          Visibility
        </label>
        <div className={cn('grid gap-3', postType === 'memory' ? 'grid-cols-3' : 'grid-cols-3')}>
          {getVisibilityOptions().map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setVisibility(option.value)}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all',
                  visibility === option.value
                    ? postType === 'memory'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-emerald-500 bg-emerald-500/10'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5',
                    visibility === option.value
                      ? postType === 'memory'
                        ? 'text-purple-400'
                        : 'text-emerald-400'
                      : 'text-gray-400'
                  )}
                />
                <span
                  className={cn(
                    'text-sm font-medium',
                    visibility === option.value ? 'text-white' : 'text-gray-400'
                  )}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expiration (Moment only) */}
      {postType === 'moment' && (
        <div className="glass rounded-xl p-6">
          <label className="flex items-center gap-2 text-white text-sm font-medium mb-3">
            <Clock className="w-4 h-4" />
            Expiration (Optional)
          </label>
          <select
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
          >
            <option value="">No expiration</option>
            <option value="24h">24 hours</option>
            <option value="7d">7 days</option>
            <option value="30d">30 days</option>
          </select>
        </div>
      )}

      {/* Submit Button */}
      <div className="sticky bottom-0 pb-6 pt-4 glass rounded-xl border-t border-white/10">
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-6 text-lg"
        >
          {postType === 'memory' ? 'Create Memory' : 'Share Moment'}
        </Button>
      </div>
    </form>
  );
}

