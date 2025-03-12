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
import { Trophy, Plus } from "lucide-react";

interface AddAchievementFormProps {
  onAddAchievement: (achievement: {
    name: string;
    description: string;
    platform: string;
    game: string;
    unlockedAt: Date;
    rarity?: number;
    image?: string;
  }) => void;
}

export function AddAchievementForm({ onAddAchievement }: AddAchievementFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    platform: '',
    game: '',
    unlockedAt: new Date().toISOString().split('T')[0],
    rarity: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAchievement({
      ...formData,
      rarity: formData.rarity ? parseFloat(formData.rarity) : undefined,
      unlockedAt: new Date(formData.unlockedAt),
    });
    setIsOpen(false);
    setFormData({
      name: '',
      description: '',
      platform: '',
      game: '',
      unlockedAt: new Date().toISOString().split('T')[0],
      rarity: '',
      image: '',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Achievement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Add New Achievement
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform</label>
            <Select
              value={formData.platform}
              onValueChange={(value) => setFormData({ ...formData, platform: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="steam">Steam</SelectItem>
                <SelectItem value="xbox">Xbox</SelectItem>
                <SelectItem value="playstation">PlayStation</SelectItem>
                <SelectItem value="nintendo">Nintendo</SelectItem>
                <SelectItem value="battlenet">Battle.net</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Game Name</label>
            <Input
              value={formData.game}
              onChange={(e) => setFormData({ ...formData, game: e.target.value })}
              placeholder="Enter game name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Achievement Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter achievement name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter achievement description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Unlocked</label>
              <Input
                type="date"
                value={formData.unlockedAt}
                onChange={(e) => setFormData({ ...formData, unlockedAt: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rarity (%)</label>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.rarity}
                onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Achievement Image URL</label>
            <Input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="Optional: Enter image URL"
            />
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