import { RoleScores } from '../types/quiz';

export const ROLE_DESCRIPTIONS: Record<keyof RoleScores, string> = {
  seeker:
    'You are a Seeker! Quick, focused, and always chasing the goal. You thrive under pressure and love the thrill of the chase.',
  chaser:
    'You are a Chaser! Energetic, team-spirited, and always moving. You bring people together and keep the game exciting.',
  beater:
    'You are a Beater! Strong, protective, and always ready to defend your team. You stand up for others and keep danger at bay.',
  keeper:
    'You are a Keeper! Calm, strategic, and always watching the field. You make sure everything runs smoothly and safely.',
};

export const ROLE_COLORS: Record<keyof RoleScores, string> = {
  seeker: 'bg-amber-800',
  chaser: 'bg-red-900',
  beater: 'bg-green-900',
  keeper: 'bg-blue-900',
};

export const ROLE_ICONS: Record<keyof RoleScores, string> = {
  seeker: '🥇', // Represents the Golden Snitch
  chaser: '🥅', // Represents the goal hoops
  beater: '🏏', // Represents the Beater's bat
  keeper: '🧤', // Represents the Keeper's gloves
};

export const MAGICAL_ELEMENTS = [
  '✨', // Sparkles
  '⚡', // Lightning bolt
  '🧹', // Broomstick
  '🔮', // Crystal ball
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
