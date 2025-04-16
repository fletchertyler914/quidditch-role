'use client';

import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  element: string;
  x: number;
  y: number;
  size: number;
  speed: number;
}

export function FloatingBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const elements = ['⚡', '✨', '🌟', '💫', '⭐'];
    const floatingElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      element: elements[Math.floor(Math.random() * elements.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 10 + 10,
    }));
    setElements(floatingElements);
  }, []);

  return (
    <>
      {elements.map((el) => (
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
    </>
  );
}
