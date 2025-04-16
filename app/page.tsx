'use client';

import React, { useState, useEffect } from 'react';
import { RoleScores, Phase, Role } from './types/quiz';
import { MAGICAL_ELEMENTS } from './constants/quiz';
import { getTopRoles, getInitialScores, getQuestions } from './utils/quiz';
import WelcomeScreen from './components/WelcomeScreen';
import QuizQuestion from './components/QuizQuestion';
import ResultScreen from './components/ResultScreen';

interface FloatingElement {
  id: number;
  element: string;
  x: number;
  y: number;
  size: number;
  speed: number;
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<RoleScores>(getInitialScores());
  const [phase, setPhase] = useState<Phase>('start');
  const [tiebreakerStep, setTiebreakerStep] = useState(0);
  const [extraTiebreakerStep, setExtraTiebreakerStep] = useState(0);
  const [finalRoles, setFinalRoles] = useState<Role[]>([]);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>(
    []
  );
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

  if (phase === 'start') {
    return (
      <WelcomeScreen
        floatingElements={floatingElements}
        onStart={() => setPhase('base')}
      />
    );
  }

  if (phase !== 'result' && currentQuestion) {
    return (
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
    );
  }

  if (phase === 'result' && finalRoles.length > 0) {
    return (
      <ResultScreen
        role={finalRoles[0]}
        floatingElements={floatingElements}
        onRestart={restartQuiz}
      />
    );
  }

  return null;
}
