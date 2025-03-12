'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Steam,
  GamepadIcon,
  Trophy,
  Eye,
  EyeOff,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";
import Image from 'next/image';
import { Switch } from "@/components/ui/switch";
import { AddAchievementForm } from './add-achievement-form';
import { AchievementEntry } from './achievement-entry';

interface Achievement {
  id: string;
  name: string;
  description: string;
  image: string;
  unlockedAt: Date;
  rarity: number; // percentage of players who have this
}

interface GameProfile {
  platform: 'steam' | 'xbox' | 'playstation' | 'nintendo' | 'battlenet';
  username: string;
  isConnected: boolean;
  isVisible: boolean;
  avatarUrl?: string;
  achievements: Achievement[];
}

interface GamingProfilesProps {
  profiles: GameProfile[];
  onToggleVisibility: (platform: string) => void;
  onConnectPlatform: (platform: string) => void;
}

const platformIcons = {
  steam: Steam,
  xbox: () => (
    <Image src="/icons/xbox.svg" alt="Xbox" width={24} height={24} />
  ),
  playstation: () => (
    <Image src="/icons/playstation.svg" alt="PlayStation" width={24} height={24} />
  ),
  nintendo: () => (
    <Image src="/icons/nintendo.svg" alt="Nintendo" width={24} height={24} />
  ),
  battlenet: () => (
    <Image src="/icons/battlenet.svg" alt="Battle.net" width={24} height={24} />
  ),
};

const platformNames = {
  steam: 'Steam',
  xbox: 'Xbox',
  playstation: 'PlayStation',
  nintendo: 'Nintendo',
  battlenet: 'Battle.net',
};

export function GamingProfiles({ profiles, onToggleVisibility, onConnectPlatform }: GamingProfilesProps) {
  const [activeTab, setActiveTab] = useState(profiles[0]?.platform || 'steam');
  const activeProfile = profiles.find(p => p.platform === activeTab);

  const handleAddAchievement = (achievement: {
    name: string;
    description: string;
    image: string;
    game: string;
    rarity: number;
    unlockedAt: Date;
  }) => {
    // In a real app, this would update the backend
    console.log('Achievement added:', achievement);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gaming Profiles</h2>
        <div className="flex gap-2">
          <AchievementEntry 
            platform={activeTab}
            onAchievementAdd={handleAddAchievement}
          />
          <Button variant="outline" onClick={() => onConnectPlatform(activeTab)}>
            <LinkIcon className="w-4 h-4 mr-2" />
            Connect Platform
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5">
          {Object.entries(platformNames).map(([key, name]) => {
            const PlatformIcon = platformIcons[key as keyof typeof platformIcons];
            return (
              <TabsTrigger
                key={key}
                value={key}
                className="flex items-center gap-2"
              >
                {typeof PlatformIcon === 'function' ? <PlatformIcon className="w-4 h-4" /> : <PlatformIcon />}
                <span className="hidden sm:inline">{name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.keys(platformNames).map((platform) => (
          <TabsContent key={platform} value={platform}>
            <Card className="p-6">
              {activeProfile?.isConnected ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {activeProfile.avatarUrl && (
                        <Image
                          src={activeProfile.avatarUrl}
                          alt={`${activeProfile.username}'s avatar`}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{activeProfile.username}</h3>
                        <p className="text-sm text-muted-foreground">
                          {platformNames[platform as keyof typeof platformNames]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={activeProfile.isVisible}
                        onCheckedChange={() => onToggleVisibility(platform)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {activeProfile.isVisible ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      Recent Achievements
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeProfile.achievements.slice(0, 4).map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <Image
                            src={achievement.image}
                            alt={achievement.name}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium">{achievement.name}</h5>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <span>
                                {new Date(achievement.unlockedAt).toLocaleDateString()}
                              </span>
                              <span>•</span>
                              <span>{achievement.rarity}% of players</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {activeProfile.achievements.length > 4 && (
                      <Button variant="link" className="w-full">
                        View All Achievements <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <GamepadIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Connect Your {platformNames[platform as keyof typeof platformNames]} Account
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Link your account to display your achievements and gaming progress.
                  </p>
                  <Button onClick={() => onConnectPlatform(platform)}>
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Connect Account
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 