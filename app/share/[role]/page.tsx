import { Role } from '@/app/types/quiz';
import {
  ROLE_COLORS,
  ROLE_DESCRIPTIONS,
  ROLE_ICONS,
} from '@/app/constants/quiz';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { use } from 'react';

export default function SharePage({
  params,
}: {
  params: Promise<{ role: Role }>;
}) {
  // Validate the role parameter
  const validRoles = ['seeker', 'keeper', 'beater', 'chaser'];
  const { role: _role } = use(params);
  const role = _role.toLowerCase() as Role;

  if (!validRoles.includes(role)) {
    redirect('/');
  }

  return (
    <div
      className={`min-h-screen ${ROLE_COLORS[role]} flex flex-col items-center justify-center p-8 relative overflow-hidden`}
    >
      <div className='max-w-md text-center z-10'>
        <div className='text-6xl mb-8 flex justify-center'>
          {ROLE_ICONS[role]}
        </div>

        <h1 className='text-4xl text-amber-100 font-serif mb-6'>
          I got{' '}
          <span className='font-bold'>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
          !
        </h1>

        <p className='text-xl text-amber-200 font-serif mb-8'>
          {ROLE_DESCRIPTIONS[role]}
        </p>

        <p className='text-lg text-amber-200 font-serif mb-12'>
          What Quidditch position are you? Take the quiz to find out!
        </p>

        <Link
          href='/'
          className='inline-block border-2 border-amber-300 text-amber-100 px-8 py-3 hover:bg-amber-950/30 transition-colors font-serif uppercase text-lg tracking-wider'
        >
          Take the Quiz
        </Link>
      </div>

      {/* Background decoration - reuse the magical elements pattern */}
      <div className='absolute inset-0 opacity-20'>
        {Array.from({ length: 10 }).map((_, i) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const randomSize = Math.random() * 0.8 + 0.5;
          const randomSpeed = Math.random() * 10 + 10;
          const randomElement = ROLE_ICONS[role];

          return (
            <div
              key={i}
              className='absolute text-amber-100 animate-float'
              style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                fontSize: `${randomSize}em`,
                animationDuration: `${randomSpeed}s`,
              }}
            >
              {randomElement}
            </div>
          );
        })}
      </div>
    </div>
  );
}
