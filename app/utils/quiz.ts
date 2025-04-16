import { RoleScores, Role, Question, QuizData } from '../types/quiz';
import quizData from '../../data/full_quidditch_quiz.json';

export function getTopRoles(scores: RoleScores): Role[] {
  const max = Math.max(...Object.values(scores));
  return (Object.keys(scores) as Role[]).filter((role) => scores[role] === max);
}

export function getInitialScores(): RoleScores {
  return { seeker: 0, chaser: 0, beater: 0, keeper: 0 };
}

export function getQuestions(
  set: 'base' | 'tiebreaker' | 'extra_tiebreaker'
): Question[] {
  return (quizData as QuizData)[set];
}
