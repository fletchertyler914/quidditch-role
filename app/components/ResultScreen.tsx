import { Role } from '../types/quiz';
import { ROLE_COLORS, ROLE_DESCRIPTIONS, ROLE_ICONS } from '../constants/quiz';
import { useState } from 'react';

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
  const [showCopied, setShowCopied] = useState(false);
  const [shareError, setShareError] = useState('');

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/share/${role.toLowerCase()}`
      : '';

  const getRoleEmoji = (role: Role) => {
    switch (role.toLowerCase()) {
      case 'seeker':
        return '🦅'; // Fast, eagle-like
      case 'chaser':
        return '🏃'; // Fast, agile player
      case 'beater':
        return '🏏'; // Bat/club
      case 'keeper':
        return '🧤'; // Goalkeeper glove
      default:
        return '🧙';
    }
  };

  const shareText = `${getRoleEmoji(
    role
  )} I got ${role} in the Quidditch Position Quiz! Play to find out your role!\n${shareUrl}`;
  const encodedShareText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      setShareError('');
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      setShareError('Could not copy to clipboard');
    }
  };

  const handleWebShare = async () => {
    if (!navigator.share) {
      setShareError('Web Share not supported on this device');
      return;
    }

    try {
      await navigator.share({
        title: `I'm a ${role}!`,
        text: `${getRoleEmoji(
          role
        )} I got ${role} in the Quidditch Position Quiz! Play to find out your role!`,
        url: shareUrl,
      });
      setShareError('');
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Error sharing:', err);
        setShareError('Failed to share');
      }
    }
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedUrl}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

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

        <div className='text-xl text-amber-200 font-serif mb-12'>
          <p className='mb-4'>
            You are a {role.charAt(0).toUpperCase() + role.slice(1)}!
          </p>
          <p>{ROLE_DESCRIPTIONS[role]}</p>
        </div>

        <div className='flex flex-col items-center gap-4 mb-12'>
          <div className='text-amber-200 font-serif text-xl mb-2'>
            Share your result
          </div>
          <div className='flex justify-center gap-6'>
            <button
              onClick={handleWebShare}
              className='text-amber-300 hover:text-amber-100 transition-colors'
              title='Share'
            >
              <svg className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
                <path d='M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z' />
              </svg>
            </button>
            <button
              onClick={handleCopyLink}
              className='text-amber-300 hover:text-amber-100 transition-colors'
              title={showCopied ? 'Copied!' : 'Copy Link'}
            >
              {showCopied ? (
                <svg
                  className='h-6 w-6'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  className='h-6 w-6'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </button>
            <button
              onClick={handleTwitterShare}
              className='text-amber-300 hover:text-amber-100 transition-colors'
              title='Share on X'
            >
              <svg className='h-6 w-6' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
              </svg>
            </button>
          </div>
          {shareError && (
            <div className='text-red-300 text-sm mt-2'>{shareError}</div>
          )}
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
