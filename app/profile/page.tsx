'use client';

import { useState } from 'react';
import { GamingProfiles } from '@/components/gaming-profiles';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

// Mock data - replace with real data from your backend
const mockProfiles = [
  {
    platform: 'steam',
    username: 'PlayerOne',
    isConnected: true,
    isVisible: true,
    avatarUrl: 'https://avatars.steamstatic.com/mock.jpg',
    achievements: [
      {
        id: '1',
        name: 'First Victory',
        description: 'Win your first match',
        image: '/achievements/first-victory.png',
        unlockedAt: new Date('2024-01-15'),
        rarity: 75.5
      },
      // Add more achievements...
    ]
  },
  {
    platform: 'xbox',
    username: 'XboxPlayer',
    isConnected: true,
    isVisible: false,
    avatarUrl: '/avatars/xbox-avatar.png',
    achievements: [
      {
        id: '2',
        name: 'Master Explorer',
        description: 'Discover all hidden areas',
        image: '/achievements/master-explorer.png',
        unlockedAt: new Date('2024-02-20'),
        rarity: 15.2
      },
      // Add more achievements...
    ]
  },
  // Add more platform profiles...
] as const;

export default function ProfilePage() {
  const [profiles, setProfiles] = useState(mockProfiles);

  const handleToggleVisibility = (platform: string) => {
    setProfiles(prev =>
      prev.map(profile =>
        profile.platform === platform
          ? { ...profile, isVisible: !profile.isVisible }
          : profile
      )
    );

    toast({
      title: "Visibility Updated",
      description: "Your profile visibility has been updated.",
    });
  };

  const handleConnectPlatform = async (platform: string) => {
    // In a real app, this would open OAuth flow or similar
    toast({
      title: "Connecting Platform",
      description: `Opening connection flow for ${platform}...`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          
          <GamingProfiles
            profiles={profiles}
            onToggleVisibility={handleToggleVisibility}
            onConnectPlatform={handleConnectPlatform}
          />
        </Card>
      </div>
    </div>
  )
} 