import { Leaf, WheatOff, Nut, MilkOff, Droplets, FishOff, EggOff, Shell, Ban, Carrot, Scale, HeartPulse } from 'lucide-react';

export const restrictionsList = [
  { id: 'vegan', label: 'Vegan', icon: Leaf },
  { id: 'gluten-free', label: 'Gluten-Free', icon: WheatOff },
  { id: 'nut-allergy', label: 'Nut-Allergy', icon: Nut },
  { id: 'lactose-free', label: 'Lactose-Free', icon: MilkOff },
  { id: 'diabetic-safe', label: 'Diabetic-Safe', icon: Droplets },
  { id: 'pescatarian', label: 'Pescatarian', icon: FishOff },
  { id: 'egg-free', label: 'Egg-Free', icon: EggOff },
  { id: 'soy-free', label: 'Soy-Free', icon: Ban },
  { id: 'shellfish-free', label: 'Shellfish-Free', icon: Shell },
  { id: 'low-carb', label: 'Low-Carb', icon: Carrot },
  { id: 'low-sodium', label: 'Low-Sodium', icon: Scale },
  { id: 'heart-healthy', label: 'Heart-Healthy', icon: HeartPulse },
];

export const modes = [
  { id: 'idea', label: 'Generate Recipe Idea', icon: 'lightbulb' },
  { id: 'ingredients', label: 'Generate Recipe Based on Ingredients', icon: 'chefhat' },
  { id: 'adapt', label: 'Adapt Existing Recipe', icon: 'star' },
];
