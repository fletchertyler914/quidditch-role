export interface RoleScores {
  seeker: number;
  chaser: number;
  beater: number;
  keeper: number;
}

export interface Option {
  text: string;
  roles: RoleScores;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface QuizData {
  base: Question[];
  tiebreaker: Question[];
  extra_tiebreaker: Question[];
}

export type Phase =
  | 'start'
  | 'base'
  | 'tiebreaker'
  | 'extra_tiebreaker'
  | 'result';
export type Role = keyof RoleScores;
