'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy, ImagePlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AchievementEntryProps {
  platform: string;
  onAchievementAdd: (achievement: {
    name: string;
    description: string;
    image: string;
    game: string;
    rarity: number;
    unlockedAt: Date;
  }) => void;
}

// Popular games for each platform
const platformGames = {
  steam: ['Counter-Strike 2', 'Dota 2', 'PUBG', 'Apex Legends', 'Other'],
  xbox: ['Halo Infinite', 'Forza Horizon 5', 'Sea of Thieves', 'Other'],
  playstation: ['God of War Ragnarök', 'Spider-Man 2', 'Horizon Forbidden West', 'Other'],
  nintendo: ['The Legend of Zelda: TOTK', 'Super Mario Wonder', 'Pokemon Scarlet/Violet', 'Other'],
  battlenet: ['World of Warcraft', 'Overwatch 2', 'Diablo IV', 'Other'],
};

export function AchievementEntry({ platform, onAchievementAdd }: AchievementEntryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [game, setGame] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rarity, setRarity] = useState('');
  const [unlockedDate, setUnlockedDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!game || !name || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const rarityNum = parseFloat(rarity);
    if (isNaN(rarityNum) || rarityNum < 0 || rarityNum > 100) {
      toast({
        title: "Invalid Rarity",
        description: "Rarity must be a number between 0 and 100.",
        variant: "destructive",
      });
      return;
    }

    onAchievementAdd({
      name,
      description,
      image: imageUrl || '/achievements/default.png', // Fallback to default image
      game,
      rarity: rarityNum,
      unlockedAt: unlockedDate ? new Date(unlockedDate) : new Date(),
    });

    setIsOpen(false);
    resetForm();
    
    toast({
      title: "Achievement Added",
      description: "Your achievement has been added successfully.",
    });
  };

  const resetForm = () => {
    setGame('');
    setName('');
    setDescription('');
    setImageUrl('');
    setRarity('');
    setUnlockedDate('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Trophy className="w-4 h-4" />
          Add Achievement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Achievement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Game</label>
            <Select value={game} onValueChange={setGame}>
              <SelectTrigger>
                <SelectValue placeholder="Select a game" />
              </SelectTrigger>
              <SelectContent>
                {platformGames[platform as keyof typeof platformGames]?.map((game) => (
                  <SelectItem key={game} value={game}>
                    {game}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Achievement Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Master Explorer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe how to earn this achievement..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL (optional)</label>
            <div className="flex gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={() => {
                  // Could add image upload functionality here
                  toast({
                    title: "Coming Soon",
                    description: "Image upload will be available soon!",
                  });
                }}
              >
                <ImagePlus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rarity (%)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={rarity}
                onChange={(e) => setRarity(e.target.value)}
                placeholder="e.g., 15.5"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Unlock Date</label>
              <Input
                type="date"
                value={unlockedDate}
                onChange={(e) => setUnlockedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Achievement</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 