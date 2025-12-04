'use client';

import { useState } from 'react';
import { X, Upload, Image as ImageIcon, Video, Music, FileText, Calendar, Users, Sparkles } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/lib/utils';

interface MediaFile {
  id: string;
  file: File;
  type: 'photo' | 'video' | 'audio' | 'letter';
  preview?: string;
  content?: string; // For letters
}

interface CreateTimeCapsuleFormProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    unlockDate: Date;
    media: MediaFile[];
    sharedWith: string[];
  }) => void;
}

export function CreateTimeCapsuleForm({ onClose, onSubmit }: CreateTimeCapsuleFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [unlockTime, setUnlockTime] = useState('');
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [sharedWith, setSharedWith] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'audio' | 'letters'>('photos');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: MediaFile['type']) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach((file) => {
      const mediaFile: MediaFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        type,
      };

      if (type === 'photo' || type === 'video') {
        mediaFile.preview = URL.createObjectURL(file);
      }

      setMedia((prev) => [...prev, mediaFile]);
    });
  };

  const handleLetterAdd = () => {
    const letter: MediaFile = {
      id: Math.random().toString(36).substr(2, 9),
      file: new File([''], 'letter.txt'),
      type: 'letter',
      content: '',
    };
    setMedia((prev) => [...prev, letter]);
  };

  const handleLetterContentChange = (id: string, content: string) => {
    setMedia((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content } : item))
    );
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !unlockDate || !unlockTime) {
      return;
    }

    const dateTime = new Date(`${unlockDate}T${unlockTime}`);
    const sharedList = sharedWith.split(',').map((s) => s.trim()).filter(Boolean);

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      unlockDate: dateTime,
      media,
      sharedWith: sharedList,
    });

    // Cleanup
    media.forEach((item) => {
      if (item.preview) {
        URL.revokeObjectURL(item.preview);
      }
    });
  };

  const getMediaByType = (type: MediaFile['type']) => {
    return media.filter((m) => m.type === type);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">Create Time Capsule</h2>
              <p className="text-gray-400 text-sm">Preserve moments for the future</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Capsule Title *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., My 25th Birthday Time Capsule"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this capsule about?"
                  className="flex h-24 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
                  rows={3}
                />
              </div>

              {/* Unlock Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Unlock Date *
                  </label>
                  <Input
                    type="date"
                    value={unlockDate}
                    onChange={(e) => setUnlockDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Unlock Time *
                  </label>
                  <Input
                    type="time"
                    value={unlockTime}
                    onChange={(e) => setUnlockTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Media Tabs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-white text-sm font-medium">
                  Add Memories
                </label>
                <div className="flex gap-2">
                  {(['photos', 'videos', 'audio', 'letters'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        activeTab === tab
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      )}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {getMediaByType(tab.slice(0, -1) as MediaFile['type']).length > 0 && (
                        <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded text-xs">
                          {getMediaByType(tab.slice(0, -1) as MediaFile['type']).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Media Content */}
              <div className="glass rounded-xl p-4 min-h-[300px]">
                {activeTab === 'photos' && (
                  <PhotoUploadSection
                    photos={getMediaByType('photo')}
                    onUpload={(e) => handleFileUpload(e, 'photo')}
                    onRemove={removeMedia}
                  />
                )}
                {activeTab === 'videos' && (
                  <VideoUploadSection
                    videos={getMediaByType('video')}
                    onUpload={(e) => handleFileUpload(e, 'video')}
                    onRemove={removeMedia}
                  />
                )}
                {activeTab === 'audio' && (
                  <AudioUploadSection
                    audio={getMediaByType('audio')}
                    onUpload={(e) => handleFileUpload(e, 'audio')}
                    onRemove={removeMedia}
                  />
                )}
                {activeTab === 'letters' && (
                  <LetterSection
                    letters={getMediaByType('letter')}
                    onAdd={handleLetterAdd}
                    onChange={handleLetterContentChange}
                    onRemove={removeMedia}
                  />
                )}
              </div>
            </div>

            {/* Share Section */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Share With (comma-separated usernames)
              </label>
              <Input
                value={sharedWith}
                onChange={(e) => setSharedWith(e.target.value)}
                placeholder="username1, username2, ..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Create Time Capsule
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Photo Upload Section
function PhotoUploadSection({
  photos,
  onUpload,
  onRemove,
}: {
  photos: MediaFile[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <label className="cursor-pointer">
        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500/50 transition-colors group">
          <Upload className="w-8 h-8 text-gray-400 group-hover:text-purple-400 mb-2" />
          <span className="text-gray-400 text-sm group-hover:text-purple-400">
            Click to upload photos
          </span>
          <span className="text-gray-500 text-xs mt-1">or drag and drop</span>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onUpload}
          className="hidden"
        />
      </label>

      {photos.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <img
                src={photo.preview}
                alt="Upload"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onRemove(photo.id)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Video Upload Section
function VideoUploadSection({
  videos,
  onUpload,
  onRemove,
}: {
  videos: MediaFile[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <label className="cursor-pointer">
        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500/50 transition-colors group">
          <Video className="w-8 h-8 text-gray-400 group-hover:text-purple-400 mb-2" />
          <span className="text-gray-400 text-sm group-hover:text-purple-400">
            Click to upload videos
          </span>
          <span className="text-gray-500 text-xs mt-1">MP4, MOV, AVI up to 100MB</span>
        </div>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={onUpload}
          className="hidden"
        />
      </label>

      {videos.length > 0 && (
        <div className="space-y-2">
          {videos.map((video) => (
            <div key={video.id} className="relative group">
              {video.preview && (
                <video
                  src={video.preview}
                  className="w-full rounded-lg"
                  controls={false}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="w-12 h-12 text-white opacity-50" />
              </div>
              <button
                type="button"
                onClick={() => onRemove(video.id)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Audio Upload Section
function AudioUploadSection({
  audio,
  onUpload,
  onRemove,
}: {
  audio: MediaFile[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <label className="cursor-pointer">
        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500/50 transition-colors group">
          <Music className="w-8 h-8 text-gray-400 group-hover:text-purple-400 mb-2" />
          <span className="text-gray-400 text-sm group-hover:text-purple-400">
            Click to upload audio
          </span>
          <span className="text-gray-500 text-xs mt-1">MP3, WAV, M4A up to 50MB</span>
        </div>
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={onUpload}
          className="hidden"
        />
      </label>

      {audio.length > 0 && (
        <div className="space-y-2">
          {audio.map((audioFile) => (
            <div
              key={audioFile.id}
              className="flex items-center justify-between p-3 glass rounded-lg group"
            >
              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-purple-400" />
                <span className="text-white text-sm">{audioFile.file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(audioFile.id)}
                className="p-1 hover:bg-white/10 rounded transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Letter Section
function LetterSection({
  letters,
  onAdd,
  onChange,
  onRemove,
}: {
  letters: MediaFile[];
  onAdd: () => void;
  onChange: (id: string, content: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={onAdd}
        variant="outline"
        className="w-full border-purple-500/50 hover:bg-purple-500/10"
      >
        <FileText className="w-4 h-4 mr-2" />
        Add Letter
      </Button>

      {letters.map((letter) => (
        <div key={letter.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-medium">Letter {letters.indexOf(letter) + 1}</span>
            <button
              type="button"
              onClick={() => onRemove(letter.id)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <textarea
            value={letter.content || ''}
            onChange={(e) => onChange(letter.id, e.target.value)}
            placeholder="Write your letter here..."
            className="flex h-32 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
            rows={5}
          />
        </div>
      ))}
    </div>
  );
}

