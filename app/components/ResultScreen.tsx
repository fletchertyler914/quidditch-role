import { Role } from '../types/quiz';
import { ROLE_COLORS, ROLE_DESCRIPTIONS, ROLE_ICONS } from '../constants/quiz';

interface FloatingElement {
  id: number;
  element: string;
  x: number;
  y: number;
  size: number;
  speed: number;
}

interface ResultScreenProps {
  role: Role;
  floatingElements: FloatingElement[];
  onRestart: () => void;
}

export default function ResultScreen({
  role,
  floatingElements,
  onRestart,
}: ResultScreenProps) {
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
            onClick={onRestart}
            className='border border-amber-300 text-amber-100 px-6 py-2 hover:bg-amber-950/30 transition-colors font-serif uppercase text-sm tracking-wider'
          >
            Try Another One
          </button>
          <button
            onClick={onRestart}
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
