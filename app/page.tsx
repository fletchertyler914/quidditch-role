'use client';

import React, { useState, useEffect } from 'react';
import { RoleScores, Phase, Role } from './types/quiz';
import { getTopRoles, getInitialScores, getQuestions } from './utils/quiz';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizQuestion } from './components/QuizQuestion';
import { useRouter } from 'next/navigation';
import { FloatingBackground } from './components/FloatingBackground';

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<RoleScores>(getInitialScores());
  const [phase, setPhase] = useState<Phase>('start');
  const [tiebreakerStep, setTiebreakerStep] = useState(0);
  const [extraTiebreakerStep, setExtraTiebreakerStep] = useState(0);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [colorAssignments, setColorAssignments] = useState<number[]>([]);

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
      const availableColors = [...Array(15).keys()]; // Using 15 as that's the number of colors we have
      const shuffledColors = [...availableColors]
        .sort(() => Math.random() - 0.5)
        .slice(0, numOptions);
      setColorAssignments(shuffledColors);
    }
  }, [step, tiebreakerStep, extraTiebreakerStep, phase, currentQuestion]);

  function handleAnswer(option: { roles: RoleScores }) {
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
          router.push(`/results/${topRoles[0].toLowerCase()}`);
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
          router.push(`/results/${topRoles[0].toLowerCase()}`);
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
        router.push(`/results/${topRoles[0].toLowerCase()}`);
      }
    }

    // Reset answer index for next question
    setCurrentAnswerIndex(0);
  }

  if (phase === 'start') {
    return (
      <div className='relative min-h-screen overflow-hidden'>
        <WelcomeScreen onStart={() => setPhase('base')} />
        <FloatingBackground />
      </div>
    );
  }

  if (phase !== 'result' && currentQuestion) {
    return (
      <div className='relative min-h-screen overflow-hidden'>
        <QuizQuestion
          question={currentQuestion}
          currentAnswerIndex={currentAnswerIndex}
          setCurrentAnswerIndex={setCurrentAnswerIndex}
          handleAnswer={handleAnswer}
          questionNumber={
            phase === 'base'
              ? step + 1
              : phase === 'tiebreaker'
              ? tiebreakerStep + 1
              : extraTiebreakerStep + 1
          }
          totalQuestions={questions.length}
          isTiebreaker={phase !== 'base'}
          colorAssignments={colorAssignments}
        />
      </div>
    );
  }

  return null;
}
