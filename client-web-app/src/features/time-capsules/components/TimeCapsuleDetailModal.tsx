'use client';

import { useState } from 'react';
import { X, Lock, Unlock, Share2, Image as ImageIcon, Video, Music, FileText, Play } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { TimeCapsule } from './TimeCapsuleCard';
import { ShareModal } from './ShareModal';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeCapsuleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  capsule: TimeCapsule | null;
  onShare?: () => void;
}

export function TimeCapsuleDetailModal({
  isOpen,
  onClose,
  capsule,
  onShare,
}: TimeCapsuleDetailModalProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  if (!isOpen || !capsule) return null;

  const allMedia = [
    ...Array(capsule.mediaCount.photos).fill({ type: 'photo' }),
    ...Array(capsule.mediaCount.videos).fill({ type: 'video' }),
    ...Array(capsule.mediaCount.audio).fill({ type: 'audio' }),
    ...Array(capsule.mediaCount.letters).fill({ type: 'letter' }),
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
        <div className="glass rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              {capsule.isUnlocked ? (
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg">
                  <Unlock className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Lock className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-white text-xl font-bold">{capsule.title}</h2>
                <p className="text-gray-400 text-sm">
                  Created {new Date(capsule.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {!capsule.isUnlocked ? (
              <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center">
                    <Lock className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white text-2xl font-bold">This Capsule is Locked</h3>
                  <p className="text-gray-400 text-lg">
                    The time capsule will unlock on{' '}
                    <span className="text-emerald-400 font-semibold">
                      {new Date(capsule.unlockDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </p>
                </div>
                <div className="pt-4">
                  <p className="text-gray-400 text-sm mb-4">Unlocks in:</p>
                  <CountdownTimer unlockDate={capsule.unlockDate} size="lg" />
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {capsule.description && (
                  <div className="glass rounded-xl p-4">
                    <p className="text-white">{capsule.description}</p>
                  </div>
                )}

                {/* Media Gallery */}
                {allMedia.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Contents</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {allMedia.map((media, index) => (
                        <div
                          key={index}
                          className={cn(
                            'aspect-square rounded-lg overflow-hidden glass cursor-pointer hover:scale-105 transition-transform',
                            selectedMediaIndex === index && 'ring-2 ring-emerald-500'
                          )}
                          onClick={() => setSelectedMediaIndex(index)}
                        >
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
                            {media.type === 'photo' && <ImageIcon className="w-8 h-8 text-white" />}
                            {media.type === 'video' && <Video className="w-8 h-8 text-white" />}
                            {media.type === 'audio' && <Music className="w-8 h-8 text-white" />}
                            {media.type === 'letter' && <FileText className="w-8 h-8 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shared With */}
                {capsule.sharedWith.length > 0 && (
                  <div className="glass rounded-xl p-4">
                    <h3 className="text-white font-semibold mb-3">Shared With</h3>
                    <div className="flex flex-wrap gap-2">
                      {capsule.sharedWith.map((username) => (
                        <div
                          key={username}
                          className="px-3 py-1.5 bg-white/5 rounded-full"
                        >
                          <span className="text-white text-sm">{username}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          capsuleId={capsule.id}
          capsuleTitle={capsule.title}
          currentSharedWith={capsule.sharedWith}
          onShare={(usernames) => {
            console.log('Share with:', usernames);
            setShowShareModal(false);
          }}
        />
      )}
    </>
  );
}

