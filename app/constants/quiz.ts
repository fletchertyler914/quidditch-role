import { RoleScores } from '../types/quiz';

export const ROLE_DESCRIPTIONS: Record<keyof RoleScores, string> = {
  seeker:
    'Quick, focused, and always chasing the goal. Thrives under pressure and loves the thrill of the chase.',
  chaser:
    'Energetic, team-spirited, and always moving. Brings people together and keeps the game exciting.',
  beater:
    'Strong, protective, and always ready to defend the team. Stands up for others and keeps danger at bay.',
  keeper:
    'Calm, strategic, and always watching the field. Makes sure everything runs smoothly and safely.',
};

export const ROLE_COLORS: Record<keyof RoleScores, string> = {
  seeker: 'bg-amber-800',
  chaser: 'bg-red-900',
  beater: 'bg-green-900',
  keeper: 'bg-blue-900',
};

export const ROLE_ICONS: Record<keyof RoleScores, string> = {
  seeker: '⚡', // Lightning bolt for Harry Potter's scar + speed
  chaser: '🏈', // Football shape similar to Quaffle
  beater: '🏏', // Cricket bat similar to Beater's bat
  keeper: '🛡️', // Shield to represent defensive role
};

export const MAGICAL_ELEMENTS = [
  '✨', // Sparkles
  '⚡', // Lightning bolt
  '🧹', // Broomstick
  '🔮', // Crystal ball
  '🌟', // Star
  '🪄', // Magic wand
  '🦉', // Owl
  '📜', // Scroll
];

export const ANSWER_COLORS = [
  'bg-amber-800', // Golden brown
  'bg-red-900', // Deep red
  'bg-green-900', // Forest green
  'bg-blue-900', // Deep blue
  'bg-purple-900', // Deep purple
  'bg-teal-900', // Deep teal
  'bg-pink-800', // Deep pink
  'bg-indigo-900', // Deep indigo
  'bg-rose-900', // Deep rose
  'bg-violet-900', // Deep violet
  'bg-cyan-900', // Deep cyan
  'bg-emerald-900', // Deep emerald
  'bg-fuchsia-900', // Deep fuchsia
  'bg-sky-900', // Deep sky blue
  'bg-orange-900', // Deep orange
];
