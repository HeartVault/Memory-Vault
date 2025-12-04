'use client';

import { useState } from 'react';
import { X, Copy, Check, Mail, Share2, Users } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/lib/utils';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  capsuleId: string;
  capsuleTitle: string;
  currentSharedWith: string[];
  onShare: (usernames: string[]) => void;
}

export function ShareModal({
  isOpen,
  onClose,
  capsuleId,
  capsuleTitle,
  currentSharedWith,
  onShare,
}: ShareModalProps) {
  const [usernames, setUsernames] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/explore/capsules/${capsuleId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareByUsername = () => {
    const usernameList = usernames
      .split(',')
      .map((u) => u.trim())
      .filter(Boolean);
    
    if (usernameList.length > 0) {
      onShare(usernameList);
      setUsernames('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass rounded-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white text-lg font-bold">Share Time Capsule</h2>
              <p className="text-gray-400 text-xs">{capsuleTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Share Link */}
          <div className="space-y-3">
            <label className="block text-white text-sm font-medium">Share via Link</label>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1 bg-white/5 text-gray-400"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Share with Usernames */}
          <div className="space-y-3">
            <label className="block text-white text-sm font-medium">
              <Users className="w-4 h-4 inline mr-1" />
              Share with Friends
            </label>
            <div className="flex gap-2">
              <Input
                value={usernames}
                onChange={(e) => setUsernames(e.target.value)}
                placeholder="username1, username2, ..."
                className="flex-1"
              />
              <Button
                onClick={handleShareByUsername}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>

          {/* Currently Shared With */}
          {currentSharedWith.length > 0 && (
            <div className="space-y-2">
              <label className="block text-white text-sm font-medium">
                Shared With ({currentSharedWith.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {currentSharedWith.map((username) => (
                  <div
                    key={username}
                    className="px-3 py-1.5 bg-white/5 rounded-full flex items-center gap-2"
                  >
                    <span className="text-white text-sm">{username}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

