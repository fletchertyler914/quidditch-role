'use client';

import React, { useState, useEffect } from 'react';
import quizData from '../data/full_quidditch_quiz.json';

// Types for quiz data
interface RoleScores {
  seeker: number;
  chaser: number;
  beater: number;
  keeper: number;
}

interface Option {
  text: string;
  roles: RoleScores;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface QuizData {
  base: Question[];
  tiebreaker: Question[];
  extra_tiebreaker: Question[];
}

const ROLE_DESCRIPTIONS: Record<keyof RoleScores, string> = {
  seeker:
    'You are a Seeker! Quick, focused, and always chasing the goal. You thrive under pressure and love the thrill of the chase.',
  chaser:
    'You are a Chaser! Energetic, team-spirited, and always moving. You bring people together and keep the game exciting.',
  beater:
    'You are a Beater! Strong, protective, and always ready to defend your team. You stand up for others and keep danger at bay.',
  keeper:
    'You are a Keeper! Calm, strategic, and always watching the field. You make sure everything runs smoothly and safely.',
};

const ROLE_COLORS: Record<keyof RoleScores, string> = {
  seeker: 'bg-amber-800',
  chaser: 'bg-red-900',
  beater: 'bg-green-900',
  keeper: 'bg-blue-900',
};

const ROLE_ICONS: Record<keyof RoleScores, string> = {
  seeker: '🥇', // Represents the Golden Snitch
  chaser: '🥅', // Represents the goal hoops
  beater: '🏏', // Represents the Beater's bat
  keeper: '🧤', // Represents the Keeper's gloves
};

const MAGICAL_ELEMENTS = [
  '✨', // Sparkles
  '⚡', // Lightning bolt
  '🧹', // Broomstick
  '🔮', // Crystal ball
];

type Phase = 'start' | 'base' | 'tiebreaker' | 'extra_tiebreaker' | 'result';
type Role = keyof RoleScores;

// Adding answer background colors
const ANSWER_COLORS = [
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

function getTopRoles(scores: RoleScores): Role[] {
  const max = Math.max(...Object.values(scores));
  return (Object.keys(scores) as Role[]).filter((role) => scores[role] === max);
}

function getInitialScores(): RoleScores {
  return { seeker: 0, chaser: 0, beater: 0, keeper: 0 };
}

function getQuestions(
  set: 'base' | 'tiebreaker' | 'extra_tiebreaker'
): Question[] {
  return (quizData as QuizData)[set];
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<RoleScores>(getInitialScores());
  const [phase, setPhase] = useState<Phase>('start');
  const [tiebreakerStep, setTiebreakerStep] = useState(0);
  const [extraTiebreakerStep, setExtraTiebreakerStep] = useState(0);
  const [finalRoles, setFinalRoles] = useState<Role[]>([]);
  const [floatingElements, setFloatingElements] = useState<
    {
      id: number;
      element: string;
      x: number;
      y: number;
      size: number;
      speed: number;
    }[]
  >([]);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [colorAssignments, setColorAssignments] = useState<number[]>([]);

  // Create floating magical elements
  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 10; i++) {
      elements.push({
        id: i,
        element:
          MAGICAL_ELEMENTS[Math.floor(Math.random() * MAGICAL_ELEMENTS.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.8 + 0.5,
        speed: Math.random() * 10 + 10,
      });
    }
    setFloatingElements(elements);
  }, []);

  const questions =
    phase === 'base' || phase === 'tiebreaker' || phase === 'extra_tiebreaker'
      ? getQuestions(phase)
      : [];
  const currentQuestion =
    phase === 'base'
      ? questions[step]
      : phase === 'tiebreaker'
      ? questions[tiebreakerStep]
      : phase === 'extra_tiebreaker'
      ? questions[extraTiebreakerStep]
      : undefined;

  // Assign random colors when question changes
  useEffect(() => {
    if (currentQuestion) {
      const numOptions = currentQuestion.options.length;
      const availableColors = [...Array(ANSWER_COLORS.length).keys()];
      const shuffledColors = [...availableColors]
        .sort(() => Math.random() - 0.5)
        .slice(0, numOptions);
      setColorAssignments(shuffledColors);
    }
  }, [step, tiebreakerStep, extraTiebreakerStep, phase, currentQuestion]);

  function handleNextAnswer() {
    if (
      currentQuestion &&
      currentAnswerIndex < currentQuestion.options.length - 1
    ) {
      setCurrentAnswerIndex(currentAnswerIndex + 1);
    }
  }

  function handlePrevAnswer() {
    if (currentAnswerIndex > 0) {
      setCurrentAnswerIndex(currentAnswerIndex - 1);
    }
  }

  function handleAnswer(option: Option) {
    // Update scores
    const newScores: RoleScores = { ...scores };
    (Object.entries(option.roles) as [Role, number][]).forEach(
      ([role, value]) => {
        newScores[role] += value;
      }
    );
    setScores(newScores);

    // Next step logic
    if (phase === 'base') {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        // Check for tie
        const topRoles = getTopRoles(newScores);
        if (topRoles.length === 1) {
          setFinalRoles(topRoles);
          setPhase('result');
        } else {
          setPhase('tiebreaker');
          setTiebreakerStep(0);
        }
      }
    } else if (phase === 'tiebreaker') {
      if (tiebreakerStep < questions.length - 1) {
        setTiebreakerStep(tiebreakerStep + 1);
      } else {
        // Check for tie again
        const topRoles = getTopRoles(newScores);
        if (topRoles.length === 1) {
          setFinalRoles(topRoles);
          setPhase('result');
        } else {
          setPhase('extra_tiebreaker');
          setExtraTiebreakerStep(0);
        }
      }
    } else if (phase === 'extra_tiebreaker') {
      if (extraTiebreakerStep < questions.length - 1) {
        setExtraTiebreakerStep(extraTiebreakerStep + 1);
      } else {
        // Final tie-break
        const topRoles = getTopRoles(newScores);
        setFinalRoles(topRoles);
        setPhase('result');
      }
    }

    // Reset answer index for next question
    setCurrentAnswerIndex(0);
  }

  function restartQuiz() {
    setStep(0);
    setScores(getInitialScores());
    setPhase('start');
    setTiebreakerStep(0);
    setExtraTiebreakerStep(0);
    setFinalRoles([]);
  }

  function startQuiz() {
    setPhase('base');
  }

  // Welcome/Start screen
  if (phase === 'start') {
    return (
      <div className='min-h-screen flex flex-col md:flex-row'>
        {/* Left panel */}
        <div className='flex-1 bg-amber-900 flex items-center justify-center p-8 relative overflow-hidden'>
          <div className='relative z-10 text-center'>
            <h1 className='text-4xl md:text-5xl text-amber-100 font-serif mb-2'>
              Hogwarts School of
            </h1>
            <h1 className='text-4xl md:text-5xl text-amber-100 font-serif mb-8'>
              Witchcraft and Wizardry
            </h1>
            <p className='text-amber-200 font-serif'>By Quidditch Captain</p>
          </div>

          {/* Floating elements */}
          {floatingElements.slice(0, 5).map((el) => (
            <div
              key={el.id}
              className='absolute opacity-40 animate-float text-amber-200'
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                fontSize: `${el.size}em`,
                animationDuration: `${el.speed}s`,
              }}
            >
              {el.element}
            </div>
          ))}
        </div>

        {/* Right panel */}
        <div className='flex-1 bg-amber-900 flex flex-col items-center justify-center p-8 relative overflow-hidden'>
          <div className='relative z-10 text-center'>
            <h2 className='text-4xl md:text-5xl text-amber-100 font-serif mb-4'>
              The Quidditch Sorting
            </h2>
            <p className='text-xl text-amber-200 font-serif mb-12'>
              Which position matches your magical abilities?
            </p>

            <button
              onClick={startQuiz}
              className='border-2 border-amber-300 text-amber-100 px-6 py-3 hover:bg-amber-950 transition-colors font-serif tracking-wider'
            >
              BEGIN THE EXPERIENCE
            </button>
          </div>

          {/* Dividing line */}
          <div className='hidden md:block absolute left-0 top-0 bottom-0 w-px bg-amber-600'></div>

          {/* Floating elements */}
          {floatingElements.slice(5, 10).map((el) => (
            <div
              key={el.id}
              className='absolute opacity-40 animate-float text-amber-200'
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                fontSize: `${el.size}em`,
                animationDuration: `${el.speed}s`,
              }}
            >
              {el.element}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Quiz in progress
  if (phase !== 'result' && currentQuestion) {
    return (
      <div className='min-h-screen flex flex-col md:flex-row'>
        {/* Left panel - Question */}
        <div className='flex-1 bg-neutral-900 flex items-center justify-center p-8'>
          <div className='max-w-md'>
            <h2 className='text-2xl md:text-3xl text-white font-serif mb-8'>
              {currentQuestion.text}
            </h2>

            <div className='text-sm text-gray-400 mt-12'>
              Question{' '}
              {phase === 'base'
                ? step + 1
                : phase === 'tiebreaker'
                ? tiebreakerStep + 1
                : extraTiebreakerStep + 1}{' '}
              of {questions.length}
              {phase !== 'base' && (
                <span className='italic ml-2'>(Tiebreaker)</span>
              )}
            </div>
          </div>
        </div>

        {/* Right panel - Only showing current option */}
        <div
          className={`flex-1 ${
            ANSWER_COLORS[colorAssignments[currentAnswerIndex] || 0]
          } flex flex-col items-center justify-center relative`}
        >
          {/* Main content container */}
          <div className='w-full max-w-md px-8 flex flex-col items-center justify-center h-full relative'>
            {/* Question text in the middle with left and right arrows */}
            <div className='flex w-full items-center justify-center py-32 md:py-0'>
              {/* Left arrow on mobile */}
              <button
                onClick={handlePrevAnswer}
                disabled={currentAnswerIndex === 0}
                className={`md:hidden absolute left-6 ${
                  currentAnswerIndex === 0
                    ? 'opacity-20 cursor-not-allowed'
                    : 'opacity-70 hover:opacity-100 cursor-pointer'
                } transition-opacity`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white'
                >
                  <polyline points='15 18 9 12 15 6'></polyline>
                </svg>
              </button>

              {/* Up arrow on desktop */}
              <button
                onClick={handlePrevAnswer}
                disabled={currentAnswerIndex === 0}
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 left-6 ${
                  currentAnswerIndex === 0
                    ? 'opacity-20 cursor-not-allowed'
                    : 'opacity-70 hover:opacity-100 cursor-pointer'
                } transition-opacity`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white'
                >
                  <polyline points='15 18 9 12 15 6'></polyline>
                </svg>
              </button>

              <div className='w-full text-center text-xl text-white font-serif px-12 md:px-16'>
                {currentQuestion.options[currentAnswerIndex].text}
              </div>

              {/* Right arrow on mobile */}
              <button
                onClick={handleNextAnswer}
                disabled={
                  currentAnswerIndex >= currentQuestion.options.length - 1
                }
                className={`md:hidden absolute right-6 ${
                  currentAnswerIndex >= currentQuestion.options.length - 1
                    ? 'opacity-20 cursor-not-allowed'
                    : 'opacity-70 hover:opacity-100 cursor-pointer'
                } transition-opacity`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white'
                >
                  <polyline points='9 18 15 12 9 6'></polyline>
                </svg>
              </button>

              {/* Down arrow on desktop */}
              <button
                onClick={handleNextAnswer}
                disabled={
                  currentAnswerIndex >= currentQuestion.options.length - 1
                }
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 right-6 ${
                  currentAnswerIndex >= currentQuestion.options.length - 1
                    ? 'opacity-20 cursor-not-allowed'
                    : 'opacity-70 hover:opacity-100 cursor-pointer'
                } transition-opacity`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white'
                >
                  <polyline points='9 18 15 12 9 6'></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Position indicators - Horizontal on mobile, vertical on desktop */}
          <div className='absolute md:right-8 md:top-1/2 bottom-24 left-1/2 md:left-auto transform md:-translate-y-1/2 -translate-x-1/2 md:translate-x-0 flex md:flex-col flex-row gap-3'>
            {currentQuestion.options.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentAnswerIndex ? 'bg-white' : 'bg-white/40'
                }`}
                onClick={() => setCurrentAnswerIndex(idx)}
                style={{ cursor: 'pointer' }}
              ></div>
            ))}
          </div>

          {/* SELECT button at the bottom */}
          <button
            onClick={() =>
              handleAnswer(currentQuestion.options[currentAnswerIndex])
            }
            className='absolute bottom-12 border border-white text-white text-sm px-8 py-2 uppercase tracking-wider hover:bg-white/10 transition-colors'
          >
            SELECT
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (phase === 'result') {
    const role = finalRoles[0];
    return (
      <div
        className={`min-h-screen ${ROLE_COLORS[role]} flex flex-col items-center justify-center p-8 relative overflow-hidden`}
      >
        <div className='max-w-md text-center z-10'>
          {/* Emblem/icon */}
          <div className='text-6xl mb-8 flex justify-center'>
            {ROLE_ICONS[role]}
          </div>

          <h2 className='text-5xl text-amber-100 font-serif mb-6'>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </h2>

          <p className='text-xl text-amber-200 font-serif mb-12'>
            {ROLE_DESCRIPTIONS[role]}
          </p>

          <div className='text-amber-200 font-serif mb-16'>
            Share your position
          </div>

          <div className='flex gap-4 justify-center'>
            <button
              onClick={restartQuiz}
              className='border border-amber-300 text-amber-100 px-6 py-2 hover:bg-amber-950/30 transition-colors font-serif uppercase text-sm tracking-wider'
            >
              Try Another One
            </button>
            <button
              onClick={restartQuiz}
              className='border border-amber-300 text-amber-100 px-6 py-2 hover:bg-amber-950/30 transition-colors font-serif uppercase text-sm tracking-wider'
            >
              Home
            </button>
          </div>
        </div>

        {/* Floating elements */}
        {floatingElements.map((el) => (
          <div
            key={el.id}
            className='absolute opacity-20 animate-float text-amber-100'
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              fontSize: `${el.size}em`,
              animationDuration: `${el.speed}s`,
            }}
          >
            {el.element}
          </div>
        ))}
      </div>
    );
  }

  return null;
}
