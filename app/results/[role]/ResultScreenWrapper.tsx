'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MAGICAL_ELEMENTS } from '@/app/constants/quiz';
import ResultScreen from '@/app/components/ResultScreen';
import { Role } from '@/app/types/quiz';

interface FloatingElement {
  id: number;
  element: string;
  x: number;
  y: number;
  size: number;
  speed: number;
}

export default function ResultScreenWrapper({ role }: { role: Role }) {
  const router = useRouter();
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>(
    []
  );

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

  const handleRestart = () => {
    router.push('/');
  };

  return (
    <ResultScreen
      role={role}
      floatingElements={floatingElements}
      onRestart={handleRestart}
    />
  );
}
